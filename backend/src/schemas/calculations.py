from typing import Optional, List
from datetime import datetime

from src.schemas.base_schema import BaseSchema
from src.schemas.users import UserSchema
from src.schemas.clients import ClientSchema
from src.schemas.construct_sub_elements import ConstructSubElementSchema
from src.schemas.construct_elements import ConstructElementSchema
from src.schemas.materials import MaterialSchema
from src.utils.enums import CalcStatus

class CalcPositionSchema(BaseSchema):
    material: MaterialSchema
    quantity: float
    price: float

class CalcSubElementSchema(BaseSchema):
    construct_sub_element: ConstructSubElementSchema
    positions: List[CalcPositionSchema]
    price: float

class CalcElementSchema(BaseSchema):
    construct_element: ConstructElementSchema
    subelements: List[CalcSubElementSchema]
    price: float

class CalculationSchema(BaseSchema):
    client: ClientSchema
    manager: UserSchema
    address: str
    status: CalcStatus
    price: float
    created_at: datetime
    updated_at: datetime
    expires_at: datetime
    elements: List[CalcElementSchema]

class ShortCalculationSchema(BaseSchema):
    client_id: int
    manager_id: int
    address: str
    status: CalcStatus
    price: float
    created_at: datetime
    updated_at: datetime
    expires_at: datetime

class CalculationFilter(BaseSchema):
    client_id: Optional[int] = None
    manager_id: Optional[int] = None
    address: Optional[str] = None
    status: Optional[CalcStatus] = None
    price: Optional[float] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    