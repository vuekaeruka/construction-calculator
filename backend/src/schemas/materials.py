from typing import Optional
from pydantic import BaseModel, Field

class MaterialCategorySchema(BaseModel):
    id: int
    name: str

class MaterialCategoryCreateSchema(BaseModel):
    id: int
    name: str = Field(max_length=255)

class MaterialCategoryCreateSchema(BaseModel):
    id: int
    name: Optional[str] = Field(default=None, max_length=255)


class MaterialSchema(BaseModel):
    id: int
    category_name: str
    unit: str
    cost_price: float
    market_price: float

class MaterialCreateSchema(BaseModel):
    category_id: int
    name: str = Field(max_length=255)
    unit: str = Field(max_length=50)
    cost_price: float = Field(gt=0)
    market_price: float = Field(gt=0)

class MaterialUpdateSchema(BaseModel):
    category_id: Optional[int] = None
    name: Optional[str] = Field(default=None, max_length=255)
    unit: Optional[str] = Field(default=None, max_length=50)
    cost_price: Optional[float] = Field(default=None, gt=0)
    market_price: Optional[float] = Field(default=None, gt=0)