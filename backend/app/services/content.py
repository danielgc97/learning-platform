from app.services.supabase_client import get_supabase

# Del spec del ejercicio, solo lo que el navegador necesita para ejecutar y validar.
# La rúbrica (la usa solo la IA en el backend) y las pistas no se envían.
PUBLIC_SPEC_KEYS = ("setup_sql", "dataset", "expected", "tests", "options", "correct", "explanation")

COURSE_TREE = "slug,title,description,position,modules(slug,title,position,lessons(id,slug,title,position,exercises(slug)))"


def by_position(rows: list[dict]) -> list[dict]:
    return sorted(rows, key=lambda r: r["position"])


def completed_slugs(user_id: str) -> set[str]:
    rows = get_supabase().table("progress").select("exercises(slug)").eq("user_id", user_id).execute().data
    return {r["exercises"]["slug"] for r in rows}


def _shape_course(course: dict, done: set[str]) -> dict:
    """Ordena módulos y lecciones y agrega conteos de ejercicios y progreso."""
    modules = []
    for m in by_position(course["modules"]):
        lessons = []
        for les in by_position(m["lessons"]):
            slugs = [e["slug"] for e in les["exercises"]]
            lessons.append({
                "id": les["id"], "slug": les["slug"], "title": les["title"],
                "exercise_count": len(slugs), "completed_count": sum(s in done for s in slugs),
            })
        modules.append({"slug": m["slug"], "title": m["title"], "lessons": lessons})
    all_lessons = [les for m in modules for les in m["lessons"]]
    return {
        "slug": course["slug"], "title": course["title"], "description": course["description"],
        "lesson_count": len(all_lessons),
        "exercise_count": sum(les["exercise_count"] for les in all_lessons),
        "completed_count": sum(les["completed_count"] for les in all_lessons),
        "modules": modules,
    }


def list_courses(user_id: str) -> list[dict]:
    courses = get_supabase().table("courses").select(COURSE_TREE).order("position").execute().data
    done = completed_slugs(user_id)
    return [_shape_course(c, done) for c in courses]


def get_course(slug: str, user_id: str) -> dict | None:
    result = get_supabase().table("courses").select(COURSE_TREE).eq("slug", slug).execute()
    if not result.data:
        return None
    return _shape_course(result.data[0], completed_slugs(user_id))


def get_lesson(lesson_id: str) -> dict | None:
    result = (
        get_supabase()
        .table("lessons")
        .select(
            "id,title,content_md,modules(title,courses(slug,title)),"
            "exercises(slug,type,statement,starter_code,spec,position)"
        )
        .eq("id", lesson_id)
        .execute()
    )
    if not result.data:
        return None
    row = result.data[0]
    course = row["modules"]["courses"]

    tree = get_supabase().table("courses").select(COURSE_TREE).eq("slug", course["slug"]).execute().data[0]
    ordered = [les for m in _shape_course(tree, set())["modules"] for les in m["lessons"]]
    index = next(i for i, les in enumerate(ordered) if les["id"] == row["id"])
    nav = lambda les: {"id": les["id"], "title": les["title"]}  # noqa: E731

    exercises = by_position(row["exercises"])
    for exercise in exercises:
        exercise["spec"] = {k: v for k, v in exercise["spec"].items() if k in PUBLIC_SPEC_KEYS}

    return {
        "id": row["id"],
        "title": row["title"],
        "content_md": row["content_md"],
        "course_slug": course["slug"],
        "course_title": course["title"],
        "module_title": row["modules"]["title"],
        # Posición dentro del curso, para que el alumno sepa cuánto le falta.
        "position": index + 1,
        "lesson_count": len(ordered),
        "prev": nav(ordered[index - 1]) if index > 0 else None,
        "next": nav(ordered[index + 1]) if index < len(ordered) - 1 else None,
        "exercises": exercises,
    }
