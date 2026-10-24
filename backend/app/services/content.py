from app.services.supabase_client import get_supabase

# Del spec del ejercicio, solo lo que el navegador necesita para ejecutar y validar.
# La rúbrica (la usa solo la IA en el backend) y las pistas no se envían.
PUBLIC_SPEC_KEYS = ("setup_sql", "dataset", "expected", "tests")


def by_position(rows: list[dict]) -> list[dict]:
    return sorted(rows, key=lambda r: r["position"])


def list_courses() -> list[dict]:
    result = (
        get_supabase().table("courses").select("slug,title,description,position").order("position").execute()
    )
    return result.data


def get_course(slug: str) -> dict | None:
    result = (
        get_supabase()
        .table("courses")
        .select("slug,title,description,modules(slug,title,position,lessons(id,slug,title,position))")
        .eq("slug", slug)
        .execute()
    )
    if not result.data:
        return None
    course = result.data[0]
    course["modules"] = by_position(course["modules"])
    for module in course["modules"]:
        module["lessons"] = by_position(module["lessons"])
    return course


def get_lesson(lesson_id: str) -> dict | None:
    result = (
        get_supabase()
        .table("lessons")
        .select("id,title,content_md,exercises(slug,type,statement,starter_code,spec,position)")
        .eq("id", lesson_id)
        .execute()
    )
    if not result.data:
        return None
    lesson = result.data[0]
    lesson["exercises"] = by_position(lesson["exercises"])
    for exercise in lesson["exercises"]:
        exercise["spec"] = {k: v for k, v in exercise["spec"].items() if k in PUBLIC_SPEC_KEYS}
    return lesson
