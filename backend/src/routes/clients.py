from typing import List
from fastapi import APIRouter

from src.services.clients import ClientService
from src.schemas.clients import ClientCreateSchema, ClientUpdateSchema, ClientSchema
from src.dependencies import UOWdep

router = APIRouter()

@router.post('/', response_model=ClientSchema)
async def create_client(data: ClientCreateSchema, uow: UOWdep):
    return await ClientService.create(data, uow)