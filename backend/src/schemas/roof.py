from typing import Optional, List

from src.schemas.base_schema import BaseSchema
from src.utils.enums import RoofType 

class InitRoof(BaseSchema):
    slope_width: float
    left_slope_length: float
    right_slope_length: Optional[float] = None
    roof_type: RoofType

class RoofModification(BaseSchema):
    water_proofing_id: Optional[int] = None
    osb_id: Optional[int] = None
    insulation_id: Optional[int] = None 
    insulation_thickness: Optional[float] = None 

class RoofSchema(BaseSchema):
    init_roof: InitRoof
    roof_modification: Optional[RoofModification] = None