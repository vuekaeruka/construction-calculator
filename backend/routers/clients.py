from fastapi import APIRouter, Depends, HTTPException, Query
from dependencies import (ClientService, get_client_service, get_current_user)
from schemas.clients import *
from utils.enums import Roles, Status

router = APIRouter()

@router.get('/', response_model=list[ClientSchema])
async def get_clients(client_service: ClientService = Depends(get_client_service),
                      last_name: str | None = Query(None),
                      first_name: str | None = Query(None),
                      patronymic: str | None = Query(None),
                      email: str | None = Query(None),
                      phone_number: str | None = Query(None),
                      address: str | None = Query(None)):
    filter = {k: v for k, v in locals().items() if v is not None and k not in {'client_service'}}
    clients = client_service.get_all_clients_filter_by(**filter)
    if not clients:
        raise HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    return clients

@router.get('/{id}', response_model=ClientSchema)
async def get_client_by_id(id: int,
                           client_service: ClientService = Depends(get_client_service)):
    client = client_service.get_client_filter_by(id=id)
    if not client:
        raise HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    return client

@router.post('/', response_model=ClientSchema)
async def create_client(data: ClientCreateSchema,
                        client_service: ClientService = Depends(get_client_service)):
    client = client_service.create_client(data)
    return client

@router.put('/{id}', response_model=ClientSchema)
async def update_client(id: int,
                        data: ClientUpdateSchema,
                        client_service: ClientService = Depends(get_client_service)):
    client = client_service.get_client_filter_by(id=id)
    if not client:
        raise HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    updated_client = client_service.update_client(id, data)
    return updated_client

@router.delete('/{id}')
async def delete_client(id: int,
                        client_service: ClientService = Depends(get_client_service)):
    client = client_service.get_client_filter_by(id=id)
    if not client:
        raise HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    client_service.delete_client(id)
    return {'status': Status.SUCCESS.value}