from fastapi import APIRouter
from routers.users import router as user_router
from routers.auth import router as auth_router
from routers.clients import router as client_router

routers = APIRouter(prefix='/api')
routers.include_router(auth_router, prefix='/auth', tags=['auth'])
routers.include_router(user_router, prefix='/users', tags=['users'])
routers.include_router(client_router, prefix='/clients', tags=['clients'])