from fastapi import APIRouter

from src.dependencies import UOWdep
from src.services.email import EmailService

router = APIRouter(prefix='/email', tags=['Email'])

@router.post('/send/{calculation_id}', status_code=200)
async def send_email(uow: UOWdep, calculation_id: int):
    return await EmailService.send_email(uow, calculation_id)
    