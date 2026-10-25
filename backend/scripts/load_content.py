"""Carga el contenido de /content (Markdown + YAML) a las tablas de Supabase.

Uso (desde backend/, con el venv activo):
    python scripts/load_content.py --dry-run   # solo valida y muestra un resumen
    python scripts/load_content.py             # carga a la base de datos

Es idempotente: volver a ejecutarlo actualiza lo existente (por slug). No borra
lo que elimines de /content.
"""

import argparse
import re
import sys
from pathlib import Path

import yaml
from dotenv import load_dotenv

BACKEND = Path(__file__).resolve().parents[1]
CONTENT = BACKEND.parent / "content"
EXERCISE_TYPES = {"sql", "python", "agent", "quiz"}
SPEC_KEYS = ("setup_sql", "dataset", "expected", "tests", "rubric", "hints", "options", "correct", "explanation")
PREFIX = re.compile(r"^(\d+)-(.+)$")


def split_name(name: str) -> tuple[int, str]:
    match = PREFIX.match(name)
    return (int(match[1]), match[2]) if match else (0, name)


def read_yaml(path: Path) -> dict:
    if not path.exists():
        sys.exit(f"Falta el archivo: {path}")
    return yaml.safe_load(path.read_text(encoding="utf-8")) or {}


def read_lesson(path: Path) -> tuple[dict, str]:
    if not path.exists():
        sys.exit(f"Falta el archivo: {path}")
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        sys.exit(f"{path} debe empezar con un bloque '---' que incluya title")
    _, front, body = text.split("---", 2)
    return yaml.safe_load(front) or {}, body.strip()


def subdirs(path: Path) -> list[Path]:
    return sorted(d for d in path.iterdir() if d.is_dir())


def collect() -> list[dict]:
    courses, seen_exercises = [], set()
    for cdir in subdirs(CONTENT):
        cmeta = read_yaml(cdir / "course.yaml")
        course = {"slug": cdir.name, "title": cmeta["title"], "description": cmeta.get("description"),
                  "position": cmeta.get("position", 0), "modules": []}
        for mdir in subdirs(cdir):
            mpos, mslug = split_name(mdir.name)
            module = {"slug": mslug, "title": read_yaml(mdir / "module.yaml")["title"], "position": mpos, "lessons": []}
            for ldir in subdirs(mdir):
                lpos, lslug = split_name(ldir.name)
                lmeta, body = read_lesson(ldir / "lesson.md")
                lesson = {"slug": lslug, "title": lmeta["title"], "content_md": body, "position": lpos, "exercises": []}
                for i, path in enumerate(sorted(ldir.glob("*.yaml"))):
                    data = read_yaml(path)
                    for key in ("id", "type", "statement"):
                        if key not in data:
                            sys.exit(f"{path}: falta el campo '{key}'")
                    if data["type"] not in EXERCISE_TYPES:
                        sys.exit(f"{path}: type debe ser uno de {sorted(EXERCISE_TYPES)}")
                    if data["type"] == "quiz":
                        options, correct = data.get("options"), data.get("correct")
                        if not isinstance(options, list) or len(options) < 2:
                            sys.exit(f"{path}: un quiz necesita 'options' con al menos 2 opciones")
                        if not isinstance(correct, int) or not 0 <= correct < len(options):
                            sys.exit(f"{path}: 'correct' debe ser el número de la opción correcta (empezando en 0)")
                    if data["id"] in seen_exercises:
                        sys.exit(f"{path}: el id '{data['id']}' está repetido")
                    seen_exercises.add(data["id"])
                    lesson["exercises"].append({
                        "slug": data["id"], "type": data["type"], "statement": data["statement"],
                        "starter_code": data.get("starter_code", ""),
                        "spec": {k: data[k] for k in SPEC_KEYS if k in data}, "position": i,
                    })
                module["lessons"].append(lesson)
            course["modules"].append(module)
        courses.append(course)
    return courses


def upsert(table: str, row: dict, conflict: str) -> str:
    from app.services.supabase_client import get_supabase

    result = get_supabase().table(table).upsert(row, on_conflict=conflict).execute()
    return result.data[0]["id"]


def load(courses: list[dict]) -> None:
    for c in courses:
        course_id = upsert("courses", {k: c[k] for k in ("slug", "title", "description", "position")}, "slug")
        for m in c["modules"]:
            module_id = upsert("modules", {"course_id": course_id, "slug": m["slug"], "title": m["title"], "position": m["position"]}, "course_id,slug")
            for les in m["lessons"]:
                lesson_id = upsert("lessons", {"module_id": module_id, "slug": les["slug"], "title": les["title"], "content_md": les["content_md"], "position": les["position"]}, "module_id,slug")
                for ex in les["exercises"]:
                    upsert("exercises", {"lesson_id": lesson_id, **ex}, "slug")


def prune(courses: list[dict], confirm: bool) -> None:
    """Lista (y con --yes borra) lo que está en la base pero ya no existe en /content."""
    from app.services.supabase_client import get_supabase

    keep_courses = {c["slug"] for c in courses}
    keep_modules = {(c["slug"], m["slug"]) for c in courses for m in c["modules"]}
    keep_lessons = {(c["slug"], m["slug"], les["slug"]) for c in courses for m in c["modules"] for les in m["lessons"]}
    keep_exercises = {e["slug"] for c in courses for m in c["modules"] for les in m["lessons"] for e in les["exercises"]}

    rows = (
        get_supabase()
        .table("courses")
        .select("id,slug,modules(id,slug,lessons(id,slug,exercises(id,slug)))")
        .execute()
        .data
    )

    def live_exercises(table: str, node: dict) -> list[str]:
        if table == "courses":
            lessons = [les for m in node["modules"] for les in m["lessons"]]
        elif table == "modules":
            lessons = node["lessons"]
        else:
            lessons = [node]
        return [e["slug"] for les in lessons for e in les["exercises"] if e["slug"] in keep_exercises]

    to_delete: list[tuple[str, str, str, dict]] = []
    for c in rows:
        if c["slug"] not in keep_courses:
            to_delete.append(("courses", c["id"], f"curso {c['slug']}", c))
            continue
        for m in c["modules"]:
            if (c["slug"], m["slug"]) not in keep_modules:
                to_delete.append(("modules", m["id"], f"modulo {c['slug']}/{m['slug']}", m))
                continue
            for les in m["lessons"]:
                key = (c["slug"], m["slug"], les["slug"])
                if key not in keep_lessons:
                    to_delete.append(("lessons", les["id"], f"leccion {'/'.join(key)}", les))
                    continue
                for e in les["exercises"]:
                    if e["slug"] not in keep_exercises:
                        to_delete.append(("exercises", e["id"], f"ejercicio {e['slug']}", e))

    if not to_delete:
        print("Nada que borrar: la base coincide con /content.")
        return

    print("Sobra en la base (ya no esta en /content):")
    for _, _, label, _ in to_delete:
        print(f"  - {label}")

    blocked = [(label, live_exercises(table, node)) for table, _, label, node in to_delete if table != "exercises" and live_exercises(table, node)]
    if blocked:
        for label, slugs in blocked:
            print(f"ABORTADO: {label} aun contiene ejercicios vigentes {slugs}. Ejecuta primero la carga normal.")
        sys.exit(1)

    if not confirm:
        print("Solo vista previa. Para borrar de verdad, ejecuta de nuevo con --yes.")
        return

    db = get_supabase()
    for table, row_id, _, _ in to_delete:
        db.table(table).delete().eq("id", row_id).execute()
    print(f"Borrados {len(to_delete)} elementos.")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="solo valida y muestra el resumen")
    parser.add_argument("--prune", action="store_true", help="lista lo que sobra en la base (no carga contenido)")
    parser.add_argument("--yes", action="store_true", help="con --prune, borra de verdad lo que sobra")
    args = parser.parse_args()

    courses = collect()
    n_mod = sum(len(c["modules"]) for c in courses)
    n_les = sum(len(m["lessons"]) for c in courses for m in c["modules"])
    n_ex = sum(len(les["exercises"]) for c in courses for m in c["modules"] for les in m["lessons"])
    print(f"Contenido valido: {len(courses)} cursos, {n_mod} modulos, {n_les} lecciones, {n_ex} ejercicios")

    if args.dry_run:
        print("--dry-run: no se escribio nada en la base de datos.")
        return

    load_dotenv(BACKEND / ".env")
    sys.path.insert(0, str(BACKEND))
    if args.prune:
        prune(courses, args.yes)
        return
    load(courses)
    print("Carga completada.")


if __name__ == "__main__":
    main()
