from typing import Optional, List

from src.schemas.base_schema import BaseSchema
from src.utils.enums import RoofType 

class RoofSchema(BaseSchema):
    type: RoofType  # Тип крыши (односкатная, двускатная, вальмовая и т.д.)
    
