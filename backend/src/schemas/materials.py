from typing import Optional
from pydantic import Field

from src.schemas.base_schema import BaseSchema
from src.schemas.material_categories import MaterialCategorySchema

class MaterialSchema(BaseSchema):
    id: int
    category: MaterialCategorySchema
    name: str
    unit: str
    unit_value: float
    cost_price: float
    market_price: float

class MaterialCreateSchema(BaseSchema):
    category_id: int
    name: str = Field(max_length=255)
    unit: str = Field(max_length=50)
    unit_value: float = Field(gt=0)
    cost_price: float = Field(gt=0)
    market_price: float = Field(gt=0)

class MaterialUpdateSchema(BaseSchema):
    category_id: Optional[int] = Field(default=None)
    name: Optional[str] = Field(default=None, max_length=255)
    unit: Optional[str] = Field(default=None, max_length=50)
    unit_value: Optional[float] = Field(default=None, gt=0)
    cost_price: Optional[float] = Field(default=None, gt=0)
    market_price: Optional[float] = Field(default=None, gt=0)

class MaterialFilterSchema(BaseSchema):
    category_id: Optional[int] = Field(default=None)
    name: Optional[str] = Field(default=None, max_length=255)
    unit: Optional[str] = Field(default=None, max_length=50)
    unit_value: Optional[float] = Field(default=None, gt=0)
    cost_price: Optional[float] = Field(default=None, gt=0)
    market_price: Optional[float] = Field(default=None, gt=0)
