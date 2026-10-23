from anthropic import APIError
from fastapi import APIRouter, HTTPException

from app.schemas.feedback import FeedbackRequest, FeedbackResponse
from app.services.feedback import get_feedback

router = APIRouter()


@router.post("/feedback", response_model=FeedbackResponse)
async def feedback(req: FeedbackRequest):
    try:
        text = await get_feedback(req)
    except APIError:
        raise HTTPException(status_code=502, detail="No se pudo obtener feedback de la IA.")
    return FeedbackResponse(feedback=text)
