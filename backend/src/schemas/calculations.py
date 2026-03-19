from typing import Optional
from pydantic import Field

from src.schemas.base_schema import BaseSchema
from src.schemas.users import UserSchema
from src.schemas.clients import ClientSchema
from src.utils.enums import CalcStatus

class CalculationSchema(BaseSchema):
    client: ClientSchema
    manager: UserSchema
    status: CalcStatus
    price: float

class CalculationFilter(BaseSchema):
    client_id: Optional[int] = None
    manager_id: Optional[int] = None
    status: Optional[CalcStatus] = None
    price: Optional[float] = None