from src.utils.base_repository import SQLAlchemyRepository
from src.models.materials import *

class MaterialRepository(SQLAlchemyRepository):
    entity = Material

class MaterialSubRepository(SQLAlchemyRepository):
    entity = MaterialCategory