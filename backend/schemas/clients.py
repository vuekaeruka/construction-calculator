from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class ClientSchema(BaseModel):
    id: int
    email: EmailStr
    phone_number: str
    last_name: str
    first_name: str
    patronymic: str
    address: str
    created_at: datetime
    updated_at: datetime
    
class ClientCreateSchema(BaseModel):
    email: EmailStr = Field(max_length=255)
    phone_number: str = Field(max_length=30)
    last_name: str = Field(max_length=255)
    first_name: str = Field(max_length=255)
    patronymic: str = Field(max_length=255)
    address: str
    
class ClientUpdateSchema(BaseModel):
    email: Optional[EmailStr] = Field(default=None, max_length=255)
    phone_number: Optional[str] = Field(default=None, max_length=30)
    last_name: Optional[str] = Field(default=None, max_length=255)
    first_name: Optional[str] = Field(default=None, max_length=255)
    patronymic: Optional[str] = Field(default=None, max_length=255)
    address: Optional[str] = None