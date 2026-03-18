from typing import List
from fastapi import APIRouter, Depends, Form

from src.services.auth import AuthService
from src.schemas.users import UserCreateSchema, UserSchema, UserLoginSchema
from src.dependencies import UOWdep, UserDep

router = APIRouter(prefix='/auth', tags=['Auth'])

@router.post('/register', status_code=201)
async def register(data: UserCreateSchema, uow: UOWdep):
    return await AuthService().registration(data, uow)

@router.post('/login', status_code= 200)
async def login(uow: UOWdep, username: str = Form(...), password: str = Form(...)):
    return await AuthService().login(username, password, uow)

@router.post('/refresh', status_code=200)
async def refresh(uow: UOWdep):...