from app.services.supabase_client import get_supabase
from app.services.usage import start_of_today_iso

DAILY_SUBMISSION_LIMIT = 200


def get_exercise_id(slug: str) -> str | None:
    result = get_supabase().table("exercises").select("id").eq("slug", slug).execute()
    return result.data[0]["id"] if result.data else None


def count_submissions_today(user_id: str) -> int:
    result = (
        get_supabase()
        .table("submissions")
        .select("id", count="exact")
        .eq("user_id", user_id)
        .gte("created_at", start_of_today_iso())
        .execute()
    )
    return result.count or 0


def insert_submission(user_id: str, exercise_id: str, code: str, passed: bool) -> str:
    result = (
        get_supabase()
        .table("submissions")
        .insert({"user_id": user_id, "exercise_id": exercise_id, "code": code, "passed": passed})
        .execute()
    )
    return result.data[0]["id"]


def mark_completed(user_id: str, exercise_id: str) -> None:
    # ignore_duplicates conserva la fecha de la primera vez que se completó.
    get_supabase().table("progress").upsert(
        {"user_id": user_id, "exercise_id": exercise_id},
        on_conflict="user_id,exercise_id",
        ignore_duplicates=True,
    ).execute()


def list_progress(user_id: str) -> list[dict]:
    result = (
        get_supabase()
        .table("progress")
        .select("completed_at,exercises(slug)")
        .eq("user_id", user_id)
        .order("completed_at")
        .execute()
    )
    return [{"exercise_slug": row["exercises"]["slug"], "completed_at": row["completed_at"]} for row in result.data]


def submission_belongs_to(user_id: str, submission_id: str) -> bool:
    result = (
        get_supabase()
        .table("submissions")
        .select("id")
        .eq("id", submission_id)
        .eq("user_id", user_id)
        .execute()
    )
    return bool(result.data)
