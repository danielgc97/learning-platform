from fastapi import APIRouter, Depends, HTTPException

from app.api.deps import get_current_user_id
from app.schemas.submissions import ProgressItem, SubmissionRequest, SubmissionResponse
from app.services import progress

router = APIRouter()


@router.post("/exercises/{slug}/submissions", response_model=SubmissionResponse)
def create_submission(slug: str, req: SubmissionRequest, user_id: str = Depends(get_current_user_id)):
    exercise_id = progress.get_exercise_id(slug)
    if exercise_id is None:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado.")
    if progress.count_submissions_today(user_id) >= progress.DAILY_SUBMISSION_LIMIT:
        raise HTTPException(
            status_code=429,
            detail=f"Alcanzaste el límite de {progress.DAILY_SUBMISSION_LIMIT} intentos por hoy. Vuelve mañana.",
        )
    submission_id = progress.insert_submission(user_id, exercise_id, req.code, req.passed)
    if req.passed:
        progress.mark_completed(user_id, exercise_id)
    return SubmissionResponse(submission_id=submission_id, passed=req.passed, completed=req.passed)


@router.get("/progress", response_model=list[ProgressItem])
def my_progress(user_id: str = Depends(get_current_user_id)):
    return progress.list_progress(user_id)
