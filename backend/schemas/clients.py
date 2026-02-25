from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime, date

class ClientSchema(BaseModel):
    id: int
    email: EmailStr
    phone_number: str
    last_name: str
    first_name: str
    patronymic: str
    address: str
    created_at: str
    updated_at: str
    
class ClientCreateSchema(BaseModel):
    email: EmailStr
    phone_number: str
    last_name: str
    first_name: str
    patronymic: str
    address: str
    
class ClientUpdateSchema(BaseModel):
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    last_name: Optional[str] = None
    first_name: Optional[str] = None
    patronymic: Optional[str] = None
    address: Optional[str] = None
    