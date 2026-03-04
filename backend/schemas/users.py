from typing import Optional
from pydantic import BaseModel, Field

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
    last_name: str = Field(max_length=255)
    first_name: str = Field(max_length=255)
    role: Optional[str] = Field(default=None, max_length=50)
    login: str = Field(max_length=50)
    password: str = Field(max_length=50)

class UserUpdateSchema(BaseModel):
    last_name: Optional[str] = Field(default=None, max_length=255)
    first_name: Optional[str] = Field(default=None, max_length=255)
    role: Optional[str] = Field(default=None, max_length=50)
    login: Optional[str] = Field(default=None, max_length=50)
    password: Optional[str] = Field(default=None, max_length=50)