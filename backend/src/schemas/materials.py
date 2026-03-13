from typing import Optional
from pydantic import Field

from src.schemas.base_schema import BaseSchema

class MaterialCategorySchema(BaseSchema):
    id: int
    name: str

class MaterialCategoryCreateSchema(BaseSchema):
    id: int
    name: str = Field(max_length=255)

class MaterialCategoryCreateSchema(BaseSchema):
    id: int
    name: Optional[str] = Field(default=None, max_length=255)


class MaterialSchema(BaseSchema):
    id: int
    category_name: str
    unit: str
    cost_price: float
    market_price: float

class MaterialCreateSchema(BaseSchema):
    category_id: int
    name: str = Field(max_length=255)
    unit: str = Field(max_length=50)
    cost_price: float = Field(gt=0)
    market_price: float = Field(gt=0)

class MaterialUpdateSchema(BaseSchema):
    category_id: Optional[int] = None
    name: Optional[str] = Field(default=None, max_length=255)
    unit: Optional[str] = Field(default=None, max_length=50)
    cost_price: Optional[float] = Field(default=None, gt=0)
    market_price: Optional[float] = Field(default=None, gt=0)