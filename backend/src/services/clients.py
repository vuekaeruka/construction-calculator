from fastapi import HTTPException

from src.utils.unit_of_work import IUnitOfWork
from src.schemas.clients import ClientCreateSchema, ClientUpdateSchema, ClientSchema
from src.repositories.clients import ClientRepository
from src.utils.clean_dict import clean_dict

class ClientService:
    
    @staticmethod
    async def create(data: ClientCreateSchema, uow: IUnitOfWork) -> ClientSchema:
        async with uow:
            new_client = await uow.clients.create(data)
            await uow.commit()
            return new_client
