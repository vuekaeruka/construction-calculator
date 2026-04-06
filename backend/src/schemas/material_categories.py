from typing import Optional
from pydantic import Field

from src.schemas.base_schema import BaseSchema

class MaterialCategorySchema(BaseSchema):
    id: int
    name: str

class MaterialCategoryCreateSchema(BaseSchema):
    name: str = Field(max_length=255)

class MaterialCategoryUpdateSchema(BaseSchema):
    name: Optional[str] = Field(default=None, max_length=255)

class MaterialCategoryFilterSchema(BaseSchema):
    name: Optional[str] = Field(default=None, max_length=255)