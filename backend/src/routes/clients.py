from typing import List
from fastapi import APIRouter, Depends

from src.services.clients import ClientService
from src.schemas.clients import ClientCreateSchema, ClientUpdateSchema, ClientSchema, ClientFilter
from src.dependencies import UOWdep

router = APIRouter()

@router.post('/', status_code=201, response_model=ClientSchema)
async def create_client(data: ClientCreateSchema, uow: UOWdep):
    return await ClientService.create(data, uow)

@router.get('/', status_code=200, response_model=List[ClientSchema])
async def get_clients(uow: UOWdep, filters: ClientFilter = Depends()):
    return await ClientService.get_all_filter_by(uow, filters)

@router.get('/{client_id}', status_code=200, response_model=ClientSchema)
async def get_client(client_id: int, uow: UOWdep):
    return await ClientService.get_one_filter_by(uow, client_id)

@router.put('/{client_id}', status_code=200, response_model=ClientSchema)
async def update_client(client_id: int, data: ClientUpdateSchema, uow: UOWdep):
    return await ClientService.update(client_id, data, uow)

@router.delete('/{client_id}', status_code=204)
async def delete_client(client_id: int, uow: UOWdep):
    await ClientService.delete(client_id, uow)