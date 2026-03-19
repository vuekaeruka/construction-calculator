from typing import Optional
from pydantic import Field

from src.schemas.base_schema import BaseSchema

class ConstructElementSchema(BaseSchema):
    id: int
    name: str

class ConstructElementCreateSchema(BaseSchema):
    name: str = Field(max_length=255)

class ConstructElementUpdateSchema(BaseSchema):
    name: Optional[str] = Field(default=None, max_length=255)

class ConstructElementFilterSchema(BaseSchema):
    name: Optional[str] = Field(default=None, max_length=255)