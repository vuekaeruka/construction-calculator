from typing import List
from fastapi import APIRouter, Depends

from src.services.clients import ClientService
from src.schemas.clients import ClientCreateSchema, ClientUpdateSchema, ClientSchema, ClientFilter
from src.dependencies import UOWdep

router = APIRouter(prefix='/clients', tags=['Clients'])

@router.post('/', status_code=201, response_model=ClientSchema)
async def create_client(uow: UOWdep, data: ClientCreateSchema):
    return await ClientService.create_client(uow, data)

@router.get('/', status_code=200, response_model=List[ClientSchema])
async def get_clients(uow: UOWdep, filters: ClientFilter = Depends()):
    return await ClientService.get_clients_filter_by(uow, filters)

@router.get('/{client_id}', status_code=200, response_model=ClientSchema)
async def get_client(uow: UOWdep, client_id: int):
    return await ClientService.get_client_filter_by(uow, client_id)

@router.put('/{client_id}', status_code=200, response_model=ClientSchema)
async def update_client(uow: UOWdep, client_id: int, data: ClientUpdateSchema):
    return await ClientService.update_client(uow, client_id, data)

@router.delete('/{client_id}', status_code=204)
async def delete_client(uow: UOWdep, client_id: int):
    await ClientService.delete_client(uow, client_id)