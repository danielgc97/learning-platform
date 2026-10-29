from collections import defaultdict
from datetime import datetime, timedelta

from app.services.supabase_client import get_supabase
from app.services.usage import LIMA

# Las cuentas se hacen en Python: alcanza de sobra con pocos usuarios. Si algún día
# estas tablas llegan a decenas de miles de filas, toca moverlas a una vista en la base.
ROW_LIMIT = 2000
HARDEST_LIMIT = 8
DAYS_SHOWN = 14


def _moment(value) -> datetime | None:
    """Acepta lo que devuelva Supabase: texto ISO o datetime ya convertido."""
    if value is None:
        return None
    if isinstance(value, datetime):
        return value
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except ValueError:
        return None


def _day(value) -> str | None:
    moment = _moment(value)
    return moment.astimezone(LIMA).date().isoformat() if moment else None


def _users() -> list:
    result = get_supabase().auth.admin.list_users()
    # Según la versión del cliente, llega la lista directa o un objeto que la contiene.
    return getattr(result, "users", result) or []


def overview() -> dict:
    db = get_supabase()
    submissions = (
        db.table("submissions").select("user_id,exercise_id,passed,created_at").limit(ROW_LIMIT).execute().data
    )
    progress_rows = db.table("progress").select("user_id").limit(ROW_LIMIT).execute().data
    events = db.table("feedback_events").select("user_id,cost_usd,created_at").limit(ROW_LIMIT).execute().data
    slug_by_id = {e["id"]: e["slug"] for e in db.table("exercises").select("id,slug").execute().data}

    week_ago = datetime.now(LIMA) - timedelta(days=7)

    attempts, completed = defaultdict(int), defaultdict(int)
    last_attempt: dict[str, datetime] = {}
    failed_by_exercise, attempts_by_exercise = defaultdict(int), defaultdict(int)
    passed_total, active_7d = 0, set()

    for s in submissions:
        user_id = s["user_id"]
        attempts[user_id] += 1
        passed_total += bool(s["passed"])
        moment = _moment(s["created_at"])
        if moment:
            if user_id not in last_attempt or moment > last_attempt[user_id]:
                last_attempt[user_id] = moment
            if moment >= week_ago:
                active_7d.add(user_id)
        slug = slug_by_id.get(s["exercise_id"])
        if slug:
            attempts_by_exercise[slug] += 1
            if not s["passed"]:
                failed_by_exercise[slug] += 1

    for p in progress_rows:
        completed[p["user_id"]] += 1

    cost_by_user, cost_total, cost_7d = defaultdict(float), 0.0, 0.0
    by_day: dict[str, dict] = {}
    for e in events:
        cost = float(e["cost_usd"])
        cost_by_user[e["user_id"]] += cost
        cost_total += cost
        moment = _moment(e["created_at"])
        if moment and moment >= week_ago:
            cost_7d += cost
        day = _day(e["created_at"])
        if day:
            entry = by_day.setdefault(day, {"day": day, "calls": 0, "cost_usd": 0.0})
            entry["calls"] += 1
            entry["cost_usd"] += cost

    users = sorted(
        (
            {
                "email": getattr(u, "email", None) or "(sin correo)",
                "signed_up": _day(getattr(u, "created_at", None)),
                "last_attempt": _day(last_attempt.get(u.id)),
                "completed": completed.get(u.id, 0),
                "attempts": attempts.get(u.id, 0),
                "ai_cost_usd": round(cost_by_user.get(u.id, 0.0), 4),
            }
            for u in _users()
        ),
        key=lambda r: (r["last_attempt"] or "", r["signed_up"] or ""),
        reverse=True,
    )

    hardest = sorted(
        (
            {"slug": slug, "failed": failed, "attempts": attempts_by_exercise[slug]}
            for slug, failed in failed_by_exercise.items()
        ),
        key=lambda r: r["failed"],
        reverse=True,
    )[:HARDEST_LIMIT]

    return {
        "totals": {
            "users": len(users),
            "active_7d": len(active_7d),
            "attempts": len(submissions),
            "passed_pct": round(100 * passed_total / len(submissions)) if submissions else 0,
            "ai_calls": len(events),
            "ai_cost_usd": round(cost_total, 4),
            "ai_cost_7d_usd": round(cost_7d, 4),
        },
        "users": users,
        "hardest": hardest,
        "cost_by_day": sorted(by_day.values(), key=lambda r: r["day"], reverse=True)[:DAYS_SHOWN],
    }
