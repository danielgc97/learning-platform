from datetime import datetime

from pydantic import BaseModel, Field


class SubmissionRequest(BaseModel):
    code: str = Field(max_length=5000)
    passed: bool


class SubmissionResponse(BaseModel):
    submission_id: str
    passed: bool
    completed: bool


class ProgressItem(BaseModel):
    exercise_slug: str
    completed_at: datetime
