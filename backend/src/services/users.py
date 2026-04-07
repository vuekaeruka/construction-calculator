from fastapi import HTTPException

from src.schemas.users import UserFilter, UserUpdateSchema, UserCreateSchema
from src.utils.unit_of_work import IUnitOfWork
from src.config import pwd_context

class UserService:
    
    @staticmethod
    async def create_user(uow: IUnitOfWork, data: UserCreateSchema):
        async with uow:
            data.password = pwd_context.hash(data.password)
            new_user = await uow.users.create(data)
            return new_user

    @staticmethod
    async def get_users_filter_by(uow: IUnitOfWork, filters: UserFilter):
        async with uow:
            users = await uow.users.get_all_filter_by(**filters.clean_dict())
            return users or []

    @staticmethod
    async def get_user_filter_by(uow: IUnitOfWork, user_id: int):
        async with uow:
            user = await uow.users.get_one_filter_by(id=user_id)
            if not user:
                raise HTTPException(status_code=404, detail='User not found')
            return user
        
    @staticmethod
    async def update_user(uow: IUnitOfWork, user_id: int, data: UserUpdateSchema):
        async with uow:
            if data.password:
                data.password = pwd_context.hash(data.password)
            
            if data.login:
                existing_user = await uow.users.get_one_filter_by(login=data.login)
                if existing_user:
                    raise HTTPException(status_code=400, detail="User with this login already exists")
            
            upd_user = await uow.users.update(entity_id=user_id, **data.clean_dict())
            if not upd_user:
                raise HTTPException(status_code=404, detail='User not found')
            await uow.commit()
            return upd_user
        
    @staticmethod 
    async def delete_user(uow: IUnitOfWork, user_id: int):
        async with uow:
            del_user = await uow.users.delete(user_id)
            if not del_user:
                raise HTTPException(status_code=404, detail='User not found')
            await uow.commit()