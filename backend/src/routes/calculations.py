from typing import List
from fastapi import APIRouter, Depends

from src.services.calculations import CalculationService
from src.schemas.calculations import CalculationSchema, ShortCalculationSchema, CalculationFilter
from src.schemas.frame import FrameSchema
from src.dependencies import UOWdep

router = APIRouter(prefix='/calculations', tags=['Calculations'])

@router.post('/', status_code=201, response_model=CalculationSchema)
async def create_calculation(uow: UOWdep, data: FrameSchema):
    return {'status': 'success'}

@router.get('/', status_code=200, response_model=List[ShortCalculationSchema])
async def get_calculations(uow: UOWdep, filters: CalculationFilter = Depends()):
    return await CalculationService.get_calculations_filter_by(uow, filters)

@router.get('/{calculation_id}', status_code=200, response_model=CalculationSchema)
async def get_calculation(uow: UOWdep, calculation_id: int):
    return await CalculationService.get_calculation_filter_by(uow, calculation_id)