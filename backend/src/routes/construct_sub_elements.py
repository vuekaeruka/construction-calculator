from typing import List
from fastapi import APIRouter, Depends

from src.services.construct_sub_elements import ConstructSubElementService
from src.schemas.construct_sub_elements import ConstructSubElementCreateSchema, ConstructSubElementUpdateSchema, ConstructSubElementSchema, ConstructSubElementFilterSchema
from src.dependencies import UOWdep

router = APIRouter(prefix='/construct_sub_elements', tags=['Construct Sub-Elements'])

@router.post('/', status_code=201, response_model=ConstructSubElementSchema)
async def create_construct_sub_element(uow: UOWdep, data: ConstructSubElementCreateSchema):
    return await ConstructSubElementService.create_construct_sub_element(uow, data)

@router.get('/', status_code=200, response_model=List[ConstructSubElementSchema])
async def get_construct_sub_elements(uow: UOWdep, filters: ConstructSubElementFilterSchema = Depends()):
    return await ConstructSubElementService.get_construct_sub_elements_filter_by(uow, filters)

@router.get('/{construct_sub_element_id}', status_code=200, response_model=ConstructSubElementSchema)
async def get_construct_sub_element(uow: UOWdep, construct_sub_element_id: int):
    return await ConstructSubElementService.get_construct_sub_element_filter_by(uow, construct_sub_element_id)

@router.put('/{construct_sub_element_id}', status_code=200, response_model=ConstructSubElementSchema)
async def update_construct_sub_element(uow: UOWdep, construct_sub_element_id: int, data: ConstructSubElementUpdateSchema):
    return await ConstructSubElementService.update_construct_sub_element(uow, construct_sub_element_id, data)

@router.delete('/{construct_sub_element_id}', status_code=204)
async def delete_construct_sub_element(uow: UOWdep, construct_sub_element_id: int):
    await ConstructSubElementService.delete_construct_sub_element(uow, construct_sub_element_id)