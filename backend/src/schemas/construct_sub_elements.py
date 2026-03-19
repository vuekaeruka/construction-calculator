from typing import Optional
from pydantic import Field

from src.schemas.base_schema import BaseSchema

class ConstructSubElementSchema(BaseSchema):
    id: int
    name: str

class ConstructSubElementCreateSchema(BaseSchema):
    name: str = Field(max_length=255)

class ConstructSubElementUpdateSchema(BaseSchema):
    name: Optional[str] = Field(default=None, max_length=255)

class ConstructSubElementFilterSchema(BaseSchema):
    name: Optional[str] = Field(default=None, max_length=255)