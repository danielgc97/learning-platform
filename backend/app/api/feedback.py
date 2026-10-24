from anthropic import APIError
from fastapi import APIRouter, Depends, HTTPException

from app.api.deps import get_current_user_id
from app.schemas.feedback import FeedbackRequest, FeedbackResponse
from app.services.feedback import get_feedback
from app.services.usage import DAILY_FEEDBACK_LIMIT, feedback_used_today, record_feedback_event

router = APIRouter()


@router.post("/feedback", response_model=FeedbackResponse)
async def feedback(req: FeedbackRequest, user_id: str = Depends(get_current_user_id)):
    if await feedback_used_today(user_id) >= DAILY_FEEDBACK_LIMIT:
        raise HTTPException(
            status_code=429,
            detail=f"Alcanzaste el límite de {DAILY_FEEDBACK_LIMIT} ayudas por hoy. Vuelve mañana.",
        )
    try:
        result = await get_feedback(req)
    except APIError:
        raise HTTPException(status_code=502, detail="No se pudo obtener feedback de la IA.")
    await record_feedback_event(
        user_id, result.model, result.input_tokens, result.output_tokens, result.cost_usd, result.latency_ms
    )
    return FeedbackResponse(feedback=result.text)
