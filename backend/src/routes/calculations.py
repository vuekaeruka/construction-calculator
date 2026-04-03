from typing import List
from fastapi import APIRouter, Depends

from src.services.calculations import CalculationService
from src.schemas.calculations import CalculationSchema, ShortCalculationSchema, CalculationFilter
from src.schemas.calculations import CalculationRequestPOSTSchema, CalculationRequestPUTSchema, ConsructionElement
from src.dependencies import UOWdep

router = APIRouter(prefix='/calculations', tags=['Calculations'])

# Base CRUD
@router.post('/', status_code=201, response_model=CalculationSchema)
async def create_calculation(uow: UOWdep, data: CalculationRequestPOSTSchema):
    return await CalculationService.create_calculation(uow, data)

@router.get('/', status_code=200, response_model=List[ShortCalculationSchema])
async def get_calculations(uow: UOWdep, filters: CalculationFilter = Depends()):
    return await CalculationService.get_calculations_filter_by(uow, filters)

@router.get('/{calculation_id}', status_code=200, response_model=CalculationSchema)
async def get_calculation(uow: UOWdep, calculation_id: int):
    return await CalculationService.get_calculation_filter_by(uow, calculation_id)

@router.put('/{calculation_id}', status_code=200, response_model=CalculationSchema)
async def update_calculation(uow: UOWdep, calculation_id: int, data: CalculationRequestPUTSchema):
    return await CalculationService.update_calculation(uow, calculation_id, data)

@router.delete('/{calculation_id}', status_code=204)
async def delete_calculation(uow: UOWdep, calculation_id: int):
    await CalculationService.delete_calculation(uow, calculation_id)

# Expire calculation
@router.patch('/{calculation_id}/expire', status_code=200, response_model=CalculationSchema)
async def expire_calculation(uow: UOWdep, calculation_id: int):
    return await CalculationService.expire_calculation(uow, calculation_id)

# Construction elements
@router.put('/{calculation_id}/elements/{calc_element_id}', status_code=200, response_model=CalculationSchema)
async def update_calculation(uow: UOWdep, calculation_id: int, calc_element_id: int, data: ConsructionElement):
    return await CalculationService.update_calc_element(uow, calculation_id, calc_element_id, data)

@router.delete('/{calculation_id}/elements/{calc_element_id}', status_code=204)
async def delete_calc_element(uow: UOWdep, calculation_id: int, calc_element_id: int):
    return await CalculationService.delete_calc_element(uow, calculation_id, calc_element_id)