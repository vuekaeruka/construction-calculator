from utils.enums import Roles, AuthStatus
from fastapi import HTTPException
from passlib.hash import pbkdf2_sha256
from schemas.users import *
from crud.users import UserRepository

class UserService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository=user_repository
 

    def get_all_users_filter_by(self, **filter):
        users = self.user_repository.get_all_filter_by(**filter)
        return users

    def get_user_filter_by(self, **filter):
        user = self.user_repository.get_one_filter_by(**filter)
        return user

    def update(self, user_id: int, data: UserUpdateSchema):
        entity = data.model_dump()
        entity.update({'id': user_id})
        if data.password:
            entity['password'] = pbkdf2_sha256.hash(data.password)
        self.user_repository.update(entity)
        updated_user = self.user_repository.get_one_filter_by(id=user_id)
        return updated_user

    def delete_user(self, id: int):
        return self.user_repository.delete(id=id)
    
