from typing import Any

from pydantic import BaseModel


class CourseOut(BaseModel):
    slug: str
    title: str
    description: str | None = None


class LessonSummary(BaseModel):
    id: str
    slug: str
    title: str


class ModuleOut(BaseModel):
    slug: str
    title: str
    lessons: list[LessonSummary]


class CourseDetail(CourseOut):
    modules: list[ModuleOut]


class ExerciseOut(BaseModel):
    slug: str
    type: str
    statement: str
    starter_code: str
    spec: dict[str, Any]


class LessonDetail(BaseModel):
    id: str
    title: str
    content_md: str
    exercises: list[ExerciseOut]
