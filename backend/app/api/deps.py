import asyncio

from fastapi import Header, HTTPException

from app.services.supabase_client import get_supabase


async def get_current_user_id(authorization: str | None = Header(default=None)) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Inicia sesión para continuar.")
    token = authorization.removeprefix("Bearer ").strip()
    try:
        response = await asyncio.to_thread(get_supabase().auth.get_user, token)
    except Exception:
        raise HTTPException(status_code=401, detail="Tu sesión no es válida o expiró.")
    if response is None or response.user is None:
        raise HTTPException(status_code=401, detail="Tu sesión no es válida o expiró.")
    return response.user.id
