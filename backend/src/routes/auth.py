from typing import List
from fastapi import APIRouter, Form, Response, Cookie, Depends

from src.services.auth import AuthService
from src.schemas.users import UserCreateSchema, UserSchema, UserLoginSchema
from src.dependencies import UOWdep, UserDep

router = APIRouter(prefix='/auth', tags=['Auth'])

@router.post('/register', status_code=201)
async def register(uow: UOWdep, data: UserCreateSchema):
    return await AuthService().registration(uow, data)

@router.post('/login', status_code= 200)
async def login(uow: UOWdep, username: str = Form(...), password: str = Form(...)):
    return await AuthService().login(uow, username, password)

@router.post('/refresh', status_code=200)
async def refresh(uow: UOWdep,refresh_token: str = Cookie(None)):
    return await AuthService().refresh_token(uow, refresh_token)