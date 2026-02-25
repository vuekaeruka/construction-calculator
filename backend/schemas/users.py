from typing import Optional
from pydantic import BaseModel

class UserSchema(BaseModel):
    id: int
    last_name: str
    first_name: str
    role: str
    login: str
    password: str

class UserLoginSchema(BaseModel):
    login: str
    password: str

class UserResponseSchema(BaseModel):
    id: int
    last_name: str
    first_name: str
    role: str

class UserCreateSchema(BaseModel):
    last_name: str
    first_name: str
    role: Optional[str] = None
    login: str
    password: str

class UserUpdateSchema(BaseModel):
    last_name: Optional[str] = None
    first_name: Optional[str] = None
    role: Optional[str] = None
    login: Optional[str] = None
    password: Optional[str] = None