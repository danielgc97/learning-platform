from typing import Literal
from uuid import UUID

from pydantic import BaseModel, Field


class FeedbackRequest(BaseModel):
    exercise_type: Literal["sql", "python"]
    statement: str = Field(max_length=2000)
    student_code: str = Field(max_length=5000)
    test_result: str = Field(max_length=1000)
    submission_id: UUID | None = None


class FeedbackResponse(BaseModel):
    feedback: str
