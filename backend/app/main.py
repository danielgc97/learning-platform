from fastapi import FastAPI

app = FastAPI(title="Learning Platform API")


@app.get("/health")
def health():
    return {"status": "ok"}
