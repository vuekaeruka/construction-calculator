from src.models.clients import Client
from src.utils.base_repository import SQLAlchemyRepository

class ClientRepository(SQLAlchemyRepository):
    entity = Client