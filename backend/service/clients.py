from utils.enums import Roles, AuthStatus
from fastapi import HTTPException
from passlib.hash import pbkdf2_sha256
from schemas.users import *
from schemas.clients import *
from crud.clients import ClientRepository

class ClientService:
    def __init__(self, client_repository: ClientRepository):
        self.client_repository=client_repository

    def get_all_clients_filter_by(self, **filter):
        clients = self.client_repository.get_all_filter_by(**filter)
        return clients

    def get_client_filter_by(self, **filter):
        client = self.client_repository.get_one_filter_by(**filter)
        return client
    
    def create_client(self, data: ClientCreateSchema):
        entity = data.model_dump()
        client = self.client_repository.add(entity)
        return client

    def update_client(self, client_id: int, data: ClientUpdateSchema):
        entity = data.model_dump()
        entity['id'] = client_id
        entity['updated_at'] = datetime.now()
        self.client_repository.update(entity)
        updated_client = self.client_repository.get_one_filter_by(id=client_id)
        return updated_client

    def delete_client(self, id: int):
        return self.client_repository.delete(id=id)