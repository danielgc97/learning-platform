from typing import Any

from pydantic import BaseModel


class CourseOut(BaseModel):
    slug: str
    title: str
    description: str | None = None
    lesson_count: int
    exercise_count: int
    completed_count: int


class LessonSummary(BaseModel):
    id: str
    slug: str
    title: str
    exercise_count: int
    completed_count: int


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


class LessonNav(BaseModel):
    id: str
    title: str


class LessonDetail(BaseModel):
    id: str
    title: str
    content_md: str
    course_slug: str
    course_title: str
    module_title: str
    prev: LessonNav | None = None
    next: LessonNav | None = None
    exercises: list[ExerciseOut]
