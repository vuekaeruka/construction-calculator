from src.models.users import User
from src.utils.base_repository import SQLAlchemyRepository

class UserRepository(SQLAlchemyRepository):
    entity = User