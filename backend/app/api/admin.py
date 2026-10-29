import asyncio

from fastapi import APIRouter, Depends

from app.api.deps import require_admin
from app.schemas.admin import AdminOverview
from app.services import admin

# Todo el router queda detrás de require_admin: sin un id autorizado, nada responde.
router = APIRouter(prefix="/admin", dependencies=[Depends(require_admin)])


@router.get("/overview", response_model=AdminOverview)
async def overview():
    return await asyncio.to_thread(admin.overview)
