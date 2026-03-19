from typing import List
from fastapi import APIRouter, Depends

from src.services.construct_elements import ConstructElementService
from src.schemas.construct_elements import ConstructElementCreateSchema, ConstructElementUpdateSchema, ConstructElementSchema, ConstructElementFilterSchema
from src.dependencies import UOWdep

router = APIRouter(prefix='/construct_elements', tags=['Construct Elements'])

@router.post('/', status_code=201, response_model=ConstructElementSchema)
async def create_construct_element(uow: UOWdep, data: ConstructElementCreateSchema):
    return await ConstructElementService.create_construct_element(uow, data)

@router.get('/', status_code=200, response_model=List[ConstructElementSchema])
async def get_construct_elements(uow: UOWdep, filters: ConstructElementFilterSchema = Depends()):
    return await ConstructElementService.get_construct_elements_filter_by(uow, filters)

@router.get('/{construct_element_id}', status_code=200, response_model=ConstructElementSchema)
async def get_construct_element(uow: UOWdep, construct_element_id: int):
    return await ConstructElementService.get_construct_element_filter_by(uow, construct_element_id)

@router.put('/{construct_element_id}', status_code=200, response_model=ConstructElementSchema)
async def update_construct_element(uow: UOWdep, construct_element_id: int, data: ConstructElementUpdateSchema):
    return await ConstructElementService.update_construct_element(uow, construct_element_id, data)

@router.delete('/{construct_element_id}', status_code=204)
async def delete_construct_element(uow: UOWdep, construct_element_id: int):
    await ConstructElementService.delete_construct_element(uow, construct_element_id)