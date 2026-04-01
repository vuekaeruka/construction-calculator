from typing import Optional, List
from pydantic import computed_field
from datetime import datetime

from src.schemas.base_schema import BaseSchema
from src.schemas.clients import ClientSchema
from src.schemas.materials import MaterialSchema
from src.utils.enums import CalcStatus, Element
from src.schemas.frame import FrameSchema
from src.schemas.roof import RoofSchema
from src.schemas.foundation import FoundationSchema

# Schemas for GET EP
class CalcPositionSchema(BaseSchema):
    id: int
    material: MaterialSchema
    quantity: float
    price: float

class CalcSubElementSchema(BaseSchema):
    id: int
    sub_element_name: str
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
    price: float
    created_at: datetime
    updated_at: datetime
    expires_at: datetime
    elements: List[CalcElementSchema]

    @computed_field
    @property
    def status(self) -> str:
        if getattr(self, "_original_status", None) == CalcStatus.CONTRACT_SIGNED.value:
            return CalcStatus.CONTRACT_SIGNED.value
        if datetime.now() > self.expires_at:
            return CalcStatus.EXPIRED.value
        return CalcStatus.RELEVANT.value

class ShortCalculationSchema(BaseSchema):
    id: int
    client_id: int
    address: str
    status: CalcStatus
    price: float
    created_at: datetime
    updated_at: datetime
    expires_at: datetime


# Filter for GET all EP
class CalculationFilter(BaseSchema):
    client_id: Optional[int] = None
    address: Optional[str] = None
    status: Optional[CalcStatus] = None
    price: Optional[float] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None


# Schemas for POST and PUT EP
class ConsructionElement(BaseSchema):
    frame: Optional[FrameSchema] = None
    roof: Optional[RoofSchema] = None
    foundation: Optional[FoundationSchema] = None

class CalculationRequestPOSTSchema(BaseSchema):
    client_id: int
    address: str
    construction_element: ConsructionElement

class CalculationRequestPUTSchema(BaseSchema):
    client_id: Optional[int] = None
    address: Optional[str] = None
    status: Optional[CalcStatus] = None
    construction_element: Optional[ConsructionElement] = None


# Schemas for database operations
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
    sub_element_name: str
    price: float

class CalcPositionCreateSchema(BaseSchema):
    calc_sub_element_id: int
    material_id: int
    quantity: float
    price: float