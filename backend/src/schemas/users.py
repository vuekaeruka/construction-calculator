from typing import Optional
from pydantic import Field

from src.schemas.base_schema import BaseSchema
from datetime import datetime

class UserLoginSchema(BaseSchema):
    login: str
    password: str

class UserSchema(BaseSchema):
    id: int
    last_name: str
    first_name: str
    login: str

class UserFilter(BaseSchema):
    last_name: Optional[str] = Field(default=None, max_length=255)
    first_name: Optional[str] = Field(default=None, max_length=255)
    login: Optional[str] = Field(default=None, max_length=50)
    created_at: Optional[datetime] = Field(default=None)
    updated_at: Optional[datetime] = Field(default=None)
    
class UserCreateSchema(BaseSchema):
    last_name: str = Field(max_length=255)
    first_name: str = Field(max_length=255)
    login: str = Field(max_length=50)
    password: str = Field(max_length=255)

class UserUpdateSchema(BaseSchema):
    last_name: Optional[str] = Field(default=None, max_length=255)
    first_name: Optional[str] = Field(default=None, max_length=255)
    login: Optional[str] = Field(default=None, max_length=50)
    password: Optional[str] = Field(default=None, max_length=255)