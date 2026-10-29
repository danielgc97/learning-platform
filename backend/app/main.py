import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

from fastapi import FastAPI  # noqa: E402
from fastapi.middleware.cors import CORSMiddleware  # noqa: E402

from app.api.admin import router as admin_router  # noqa: E402
from app.api.content import router as content_router  # noqa: E402
from app.api.feedback import router as feedback_router  # noqa: E402
from app.api.submissions import router as submissions_router  # noqa: E402

app = FastAPI(title="Learning Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in os.environ.get("CORS_ORIGINS", "http://localhost:5173").split(",") if o.strip()],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(feedback_router)
app.include_router(content_router)
app.include_router(submissions_router)
app.include_router(admin_router)


@app.get("/health")
def health():
    return {"status": "ok"}
