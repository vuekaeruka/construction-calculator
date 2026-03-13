from typing import Optional
from pydantic import Field

from src.schemas.base_schema import BaseSchema

class UserSchema(BaseSchema):
    id: int
    last_name: str
    first_name: str
    login: str
    password: str

class UserLoginSchema(BaseSchema):
    login: str
    password: str

class UserResponseSchema(BaseSchema):
    id: int
    last_name: str
    first_name: str

class UserCreateSchema(BaseSchema):
    last_name: str = Field(max_length=255)
    first_name: str = Field(max_length=255)
    login: str = Field(max_length=50)
    password: str = Field(max_length=50)

class UserUpdateSchema(BaseSchema):
    last_name: Optional[str] = Field(default=None, max_length=255)
    first_name: Optional[str] = Field(default=None, max_length=255)
    login: Optional[str] = Field(default=None, max_length=50)
    password: Optional[str] = Field(default=None, max_length=50)