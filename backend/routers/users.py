from fastapi import APIRouter, Depends, HTTPException, Query
from dependencies import (UserService, get_user_service, 
                          get_current_user)
from schemas.users import *
from utils.enums import AuthStatus, Roles, Status

router = APIRouter()

@router.get('/me')
async def get_me(user_service: UserService = Depends(get_user_service), 
                 user = Depends(get_current_user)):
    user = user_service.get_user_filter_by(id=user.id)
    if not user:
        raise HTTPException(status_code=404, detail={'status': AuthStatus.USER_NOT_FOUND.value})
    return user

@router.get('/', response_model=list[UserResponseSchema])
async def get_users(user_service: UserService = Depends(get_user_service),
                    last_name: str | None = Query(None),
                    first_name: str | None = Query(None),
                    role: Roles | None = Query(None)):
    filter = {k: v for k, v in locals().items() if v is not None and k not in {'user_service'}}
    users = user_service.get_all_users_filter_by(**filter)
    if not users:
        raise HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    return users

@router.get('/{id}', response_model=UserResponseSchema)
async def get_user_by_id(id: int,
                         user_service: UserService = Depends(get_user_service)):
    user = user_service.get_user_filter_by(id=id)
    if not user:
        raise HTTPException(status_code=404, detail={'status': AuthStatus.USER_NOT_FOUND.value})
    return user

@router.put('/{id}', response_model=UserResponseSchema)
async def update_user(id: int, data: UserUpdateSchema,
                      user_service: UserService = Depends(get_user_service)):
    user = user_service.get_user_filter_by(id=id)
    if not user:
        raise HTTPException(status_code=404, detail={'status': AuthStatus.USER_NOT_FOUND.value})
    updated_user = user_service.update(id, data)
    return updated_user

@router.delete('/{id}')
async def delete_user(id: int,
                      user_service: UserService = Depends(get_user_service)):
    user = user_service.get_user_filter_by(id=id)
    if not user:
        raise HTTPException(status_code=404, detail={'status': AuthStatus.USER_NOT_FOUND.value})
    user_service.delete_user(id=id)
    return {'status': Status.SUCCESS.value}