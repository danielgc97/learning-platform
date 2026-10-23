from typing import Literal

from pydantic import BaseModel, Field


class FeedbackRequest(BaseModel):
    exercise_type: Literal["sql", "python"]
    statement: str = Field(max_length=2000)
    student_code: str = Field(max_length=5000)
    test_result: str = Field(max_length=1000)


class FeedbackResponse(BaseModel):
    feedback: str
