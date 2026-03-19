from typing import Optional
from pydantic import EmailStr, Field
from datetime import datetime

from src.schemas.base_schema import BaseSchema

class ClientSchema(BaseSchema):
    id: int
    email: EmailStr
    phone_number: str
    last_name: str
    first_name: str
    patronymic: str

class ClientFilter(BaseSchema):
    email: Optional[EmailStr] = Field(default=None, max_length=255)
    phone_number: Optional[str] = Field(default=None, max_length=30)
    last_name: Optional[str] = Field(default=None, max_length=255)
    first_name: Optional[str] = Field(default=None, max_length=255)
    patronymic: Optional[str] = Field(default=None, max_length=255)
    
class ClientCreateSchema(BaseSchema):
    email: EmailStr = Field(max_length=255)
    phone_number: str = Field(max_length=30)
    last_name: str = Field(max_length=255)
    first_name: str = Field(max_length=255)
    patronymic: str = Field(max_length=255)
    
class ClientUpdateSchema(BaseSchema):
    email: Optional[EmailStr] = Field(default=None, max_length=255)
    phone_number: Optional[str] = Field(default=None, max_length=30)
    last_name: Optional[str] = Field(default=None, max_length=255)
    first_name: Optional[str] = Field(default=None, max_length=255)
    patronymic: Optional[str] = Field(default=None, max_length=255)