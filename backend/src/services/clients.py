from fastapi import HTTPException

from src.utils.unit_of_work import IUnitOfWork
from src.schemas.clients import ClientCreateSchema, ClientUpdateSchema, ClientFilter

class ClientService:
    
    @staticmethod
    async def create_client(data: ClientCreateSchema, uow: IUnitOfWork):
        async with uow:
            new_client = await uow.clients.create(data)
            await uow.commit()
            return new_client
        
    @staticmethod
    async def get_clients_filter_by(uow: IUnitOfWork, filters: ClientFilter):
        async with uow:
            clients = await uow.clients.get_all_filter_by(**filters.clean_dict())
            return clients or []

    @staticmethod
    async def get_client_filter_by(uow: IUnitOfWork, client_id: int):
        async with uow:
            client = await uow.clients.get_one_filter_by(id=client_id)
            if not client:
                raise HTTPException(status_code=404, detail='Client not found')
            return client
        
    @staticmethod
    async def update_client(client_id: int, data: ClientUpdateSchema, uow: IUnitOfWork):
        async with uow:
            upd_client = await uow.clients.update(entity_id=client_id, **data.clean_dict())
            if not upd_client:
                raise HTTPException(status_code=404, detail='Client not found')
            await uow.commit()
            return upd_client
        
    @staticmethod
    async def delete_client(client_id: int, uow: IUnitOfWork):
        async with uow:
            del_client = await uow.clients.delete(client_id)
            if not del_client:
                raise HTTPException(status_code=404, detail='Client not found')
            await uow.commit()