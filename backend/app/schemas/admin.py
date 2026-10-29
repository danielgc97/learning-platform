from pydantic import BaseModel


class Totals(BaseModel):
    users: int
    active_7d: int
    attempts: int
    passed_pct: int
    ai_calls: int
    ai_cost_usd: float
    ai_cost_7d_usd: float


class AdminUser(BaseModel):
    email: str
    signed_up: str | None = None
    last_attempt: str | None = None
    completed: int
    attempts: int
    ai_cost_usd: float


class HardestExercise(BaseModel):
    slug: str
    failed: int
    attempts: int


class CostDay(BaseModel):
    day: str
    calls: int
    cost_usd: float


class AdminOverview(BaseModel):
    totals: Totals
    users: list[AdminUser]
    hardest: list[HardestExercise]
    cost_by_day: list[CostDay]
