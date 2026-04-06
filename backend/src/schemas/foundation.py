from src.schemas.base_schema import BaseSchema

class FoundationSchema(BaseSchema):
    width: float
    length: float
    height: float

    step_rebar: float
    rebar_length: float

    board_length: float
    board_width: float