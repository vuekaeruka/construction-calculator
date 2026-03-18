from datetime import datetime
from fastapi import HTTPException, Depends
from fastapi.responses import JSONResponse
from jwt import PyJWT

from src.schemas.users import UserCreateSchema, UserLoginSchema
from src.utils.unit_of_work import IUnitOfWork
from src.utils.enums import TokenType
from src.config import pwd_context, SecurityConfig, oauth2_scheme

class AuthService:

    async def registration(self, data: UserCreateSchema, uow: IUnitOfWork):
        data.password = pwd_context.hash(data.password)
        async with uow:
            try:
                new_user = await uow.users.create(data)
                await uow.commit()
                
                tokens = self._generate_user_tokens(new_user.id)
                return tokens
            except Exception as e:
                raise HTTPException(status_code=400, detail=str(e))
    
    async def login(self, login: str, password: str, uow: IUnitOfWork) -> dict:
        async with uow:
            user = await uow.users.get_one_filter_by(login=login)
            if not user or not pwd_context.verify(password, user.password):
                raise HTTPException(status_code=401, detail="Invalid credentials")
            tokens = self._generate_user_tokens(user.id)
            return tokens
             
    async def get_current_user(self, token: str = Depends(oauth2_scheme)):
        payload = self._decode_jwt(token)
        if payload['type'] != TokenType.ACCESS:
            raise HTTPException(status_code=401)
        user_id = payload.get('sub')
        if not user_id:
            raise HTTPException(status_code=401)
        return user_id
    
    def refresh_token(self, refresh_token: str) -> dict:
        payload = self._decode_jwt(refresh_token)
        if payload['type'] != TokenType.REFRESH:
            raise HTTPException(status_code=401)
        
        user_id = payload.get('sub')
        if not user_id:
            raise HTTPException(status_code=401)
        
        tokens = self._generate_user_tokens(user_id)
        return tokens
    

    def _generate_user_tokens(self, user_id: int) -> dict:
        access = self._generate_token(user_id, TokenType.ACCESS)
        refresh = self._generate_token(user_id, TokenType.REFRESH)
        return {
                "access_token": access, 
                "refresh_token": refresh, 
                "token_type": "bearer"
            }

    def _generate_token(self, user_id: int, token_type: TokenType) -> str:
        expires = (
            SecurityConfig.expires 
            if token_type == TokenType.ACCESS
            else SecurityConfig.expires_refresh
        )
        expires_time = self._generate_expires_time(expires)
        payload = self._generate_payload(user_id, expires_time, token_type)
        token = self._encode_jwt(payload, SecurityConfig.secret_key)
        return token
    
    def _generate_expires_time(self, expires: int) -> datetime:
        expires_time = datetime.now() + expires
        return expires_time

    def _generate_payload(self, user_id: int, expires_time: datetime, token_type: TokenType) -> dict:
        payload = {
            "sub": user_id,
            "type": token_type,
            "exp": expires_time,          
        }
        return payload
    
    def _encode_jwt(self, payload: dict, secret_key: str) -> str:
        token = PyJWT().encode(payload=payload, key=secret_key, algorithm=SecurityConfig.algorithm)
        return token
    
    def _decode_jwt(self, token: str) -> dict:
        try:
            data = PyJWT().decode(token, key=SecurityConfig.secret_key, algorithms=[SecurityConfig.algorithm])
            if not data:
                raise HTTPException(status_code=401)
            return data
        except Exception as e:
            raise HTTPException(status_code=401, detail=e)