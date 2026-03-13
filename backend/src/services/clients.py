from fastapi import HTTPException

from src.utils.unit_of_work import IUnitOfWork
from src.schemas.clients import ClientCreateSchema, ClientUpdateSchema, ClientSchema, ClientFilter

class ClientService:
    
    @staticmethod
    async def create(data: ClientCreateSchema, uow: IUnitOfWork) -> ClientSchema:
        async with uow:
            new_client = await uow.clients.create(data)
            await uow.commit()
            return new_client
        
    @staticmethod
    async def get_all_filter_by(uow: IUnitOfWork, filters: ClientFilter) -> list[ClientSchema]:
        async with uow:
            clients = await uow.clients.get_all_filter_by(**filters.clean_dict())
            return clients or []

    @staticmethod
    async def get_one_filter_by(uow: IUnitOfWork, client_id: int) -> ClientSchema:
        async with uow:
            client = await uow.clients.get_one_filter_by(id=client_id)
            if not client:
                raise HTTPException(status_code=404, detail='Client not found')
            return client
        
    @staticmethod
    async def update(client_id: int, data: ClientUpdateSchema, uow: IUnitOfWork) -> ClientSchema:
        async with uow:
            upd_client = await uow.clients.update(entity_id=client_id, **data.clean_dict())
            if not upd_client:
                raise HTTPException(status_code=404, detail='Client not found')
            await uow.commit()
            return upd_client
        
    @staticmethod
    async def delete(client_id: int, uow: IUnitOfWork) -> None:
        async with uow:
            del_client = await uow.clients.delete(client_id)
            if not del_client:
                raise HTTPException(status_code=404, detail='Client not found')
            await uow.commit()