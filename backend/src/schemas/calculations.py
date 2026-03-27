from typing import Optional, List
from datetime import datetime

from src.schemas.base_schema import BaseSchema
from src.schemas.clients import ClientSchema
from src.schemas.materials import MaterialSchema
from src.utils.enums import CalcStatus, Element, SubElement


class CalcPositionSchema(BaseSchema):
    id: int
    material: MaterialSchema
    quantity: float
    price: float

class CalcSubElementSchema(BaseSchema):
    id: int
    sub_element_name: SubElement
    positions: List[CalcPositionSchema]
    price: float

class CalcElementSchema(BaseSchema):
    id: int
    element_name: Element
    subelements: List[CalcSubElementSchema]
    price: float

class CalculationSchema(BaseSchema):
    id: int
    client: ClientSchema
    address: str
    status: CalcStatus
    price: float
    created_at: datetime
    updated_at: datetime
    expires_at: datetime
    elements: List[CalcElementSchema]


class ShortCalculationSchema(BaseSchema):
    id: int
    client_id: int
    address: str
    status: CalcStatus
    price: float
    created_at: datetime
    updated_at: datetime
    expires_at: datetime

class CalculationFilter(BaseSchema):
    client_id: Optional[int] = None
    address: Optional[str] = None
    status: Optional[CalcStatus] = None
    price: Optional[float] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None


class CalculationCreateSchema(BaseSchema):
    client_id: int
    address: str
    price: float

class CalcElementCreateSchema(BaseSchema):
    calculation_id: int
    element_name: Element
    price: float

class CalcSubElementCreateSchema(BaseSchema):
    calc_element_id: int
    sub_element_name: SubElement
    price: float

class CalcPositionCreateSchema(BaseSchema):
    calc_sub_element_id: int
    material_id: int
    quantity: float
    price: float