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


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="solo valida y muestra el resumen")
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
    load(courses)
    print("Carga completada.")


if __name__ == "__main__":
    main()
