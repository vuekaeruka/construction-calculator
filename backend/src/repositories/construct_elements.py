from src.utils.base_repository import SQLAlchemyRepository
from src.models.construct_elements import *

class ConstructElementRepository(SQLAlchemyRepository):
    entity = ConstructElement

class ConstructSubElementRepository(SQLAlchemyRepository):
    entity = ConstructSubElement