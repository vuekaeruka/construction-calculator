from typing import Optional
from pydantic import model_validator

from src.schemas.base_schema import BaseSchema
from src.utils.enums import RoofType 

class InitRoof(BaseSchema):
    slope_width: float
    left_slope_length: float
    right_slope_length: Optional[float] = None
    roof_type: RoofType

    @model_validator(mode='after')
    def check_slopes(self):
        if self.roof_type == RoofType.DOUBLE_SLOPE and not self.right_slope_length:
            raise ValueError('For a double slope roof, you must specify the right slope length')
        return self

class RoofModification(BaseSchema):
    water_proofing_id: Optional[int] = None
    osb_id: Optional[int] = None
    insulation_id: Optional[int] = None 
    insulation_thickness: Optional[float] = None 

class RoofSchema(BaseSchema):
    init_roof: InitRoof     
    roof_modification: Optional[RoofModification] = None