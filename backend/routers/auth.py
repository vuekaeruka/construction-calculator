from fastapi import APIRouter, Depends, HTTPException, Cookie, Request, Form
from fastapi.responses import JSONResponse
from dependencies import get_auth_service, AuthService, get_current_user
from schemas.users import *
from utils.enums import Status
from datetime import timedelta
from pydantic import EmailStr

router = APIRouter()

@router.post('/register', status_code=201)
async def signup(new_user: UserCreateSchema, auth_service: AuthService = Depends(get_auth_service)):
    user_login = new_user.login
    user_password = new_user.password
    user = auth_service.create_user(new_user)
    if not user:
        raise HTTPException(status_code=400, detail={'status': Status.FAILED.value})
    token, update_token = auth_service.login(UserLoginSchema(login=user_login, password=user_password))
    response = JSONResponse(content=token)
    response.set_cookie(key='update_token', value=update_token, httponly=True, max_age=60*60*24*7)
    return response

@router.post('/login', status_code=200)
async def login(login: str = Form(...), password = Form(...), auth_service: AuthService = Depends(get_auth_service)):
    token, update_token = auth_service.login(UserLoginSchema(login=login, password=password))
    response = JSONResponse(content=token)
    response.set_cookie(key='update_token', value=update_token, httponly=True, max_age=60*60*24*7)
    return response

@router.get('/refresh', status_code=200)
async def refresh(request: Request, auth_service: AuthService = Depends(get_auth_service)):
    token = request.cookies.get('update_token')
    if not token:
        raise HTTPException(status_code=401, detail={'status': Status.UNAUTHORIZED.value})
    new_token, update_token = auth_service.refresh_token(token)
    response = JSONResponse(content=new_token)
    response.set_cookie(key='update_token', value=update_token, httponly=True, max_age=timedelta(days=60).total_seconds())
    return response

@router.get('/logout', status_code=200)
async def logout(user = Depends(get_current_user)):
    if not user:
        raise HTTPException(status_code=401, detail={'status': Status.UNAUTHORIZED.value})
    response = JSONResponse(content={'status': Status.SUCCESS.value})
    response.delete_cookie(key='update_token')
    return response