import asyncio
from datetime import datetime, timedelta, timezone

from app.services.supabase_client import get_supabase

DAILY_FEEDBACK_LIMIT = 30

# Perú no usa horario de verano: UTC-5 fijo.
LIMA = timezone(timedelta(hours=-5))


def start_of_today_iso() -> str:
    now = datetime.now(LIMA)
    return now.replace(hour=0, minute=0, second=0, microsecond=0).isoformat()


def _count_today(user_id: str) -> int:
    result = (
        get_supabase()
        .table("feedback_events")
        .select("id", count="exact")
        .eq("user_id", user_id)
        .gte("created_at", start_of_today_iso())
        .execute()
    )
    return result.count or 0


async def feedback_used_today(user_id: str) -> int:
    return await asyncio.to_thread(_count_today, user_id)


def _insert_event(
    user_id: str,
    submission_id: str | None,
    model: str,
    input_tokens: int,
    output_tokens: int,
    cost_usd: float,
    latency_ms: int,
) -> None:
    get_supabase().table("feedback_events").insert(
        {
            "user_id": user_id,
            "submission_id": submission_id,
            "model": model,
            "input_tokens": input_tokens,
            "output_tokens": output_tokens,
            "cost_usd": round(cost_usd, 6),
            "latency_ms": latency_ms,
        }
    ).execute()


async def record_feedback_event(
    user_id: str,
    submission_id: str | None,
    model: str,
    input_tokens: int,
    output_tokens: int,
    cost_usd: float,
    latency_ms: int,
) -> None:
    await asyncio.to_thread(
        _insert_event, user_id, submission_id, model, input_tokens, output_tokens, cost_usd, latency_ms
    )
