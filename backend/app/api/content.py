from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.api.deps import get_current_user_id
from app.schemas.content import CourseDetail, CourseOut, LessonDetail
from app.services import content

router = APIRouter(dependencies=[Depends(get_current_user_id)])


@router.get("/courses", response_model=list[CourseOut])
def courses():
    return content.list_courses()


@router.get("/courses/{slug}", response_model=CourseDetail)
def course(slug: str):
    found = content.get_course(slug)
    if found is None:
        raise HTTPException(status_code=404, detail="Curso no encontrado.")
    return found


@router.get("/lessons/{lesson_id}", response_model=LessonDetail)
def lesson(lesson_id: UUID):
    found = content.get_lesson(str(lesson_id))
    if found is None:
        raise HTTPException(status_code=404, detail="Lección no encontrada.")
    return found
