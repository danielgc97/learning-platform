import asyncio
import os

from fastapi import Depends, Header, HTTPException

from app.services.supabase_client import get_supabase

# Administradores, por id de usuario y separados por comas. Si la variable falta o
# está vacía no lo es nadie: preferimos cerrar el panel a abrirlo por un descuido.
ADMIN_USER_IDS = frozenset(i.strip() for i in os.environ.get("ADMIN_USER_IDS", "").split(",") if i.strip())


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


async def require_admin(user_id: str = Depends(get_current_user_id)) -> str:
    """Token válido y, además, estar en la lista de administradores."""
    if user_id not in ADMIN_USER_IDS:
        raise HTTPException(status_code=403, detail="No tienes acceso a esta sección.")
    return user_id
