from typing import List
from fastapi import APIRouter, Depends

from src.services.materials import MaterialService
from src.schemas.materials import MaterialCreateSchema, MaterialUpdateSchema, MaterialSchema, MaterialFilterSchema
from src.dependencies import UOWdep

router = APIRouter(prefix='/materials', tags=['Materials'])

@router.post('/', status_code=201, response_model=MaterialSchema)
async def create_material(uow: UOWdep, data: MaterialCreateSchema):
    return await MaterialService.create_material(uow, data)

@router.get('/', status_code=200, response_model=List[MaterialSchema])
async def get_materials(uow: UOWdep, filters: MaterialFilterSchema = Depends()):
    return await MaterialService.get_materials_filter_by(uow, filters)

@router.get('/{material_id}', status_code=200, response_model=MaterialSchema)
async def get_material(uow: UOWdep, material_id: int):
    return await MaterialService.get_material_filter_by(uow, material_id)

@router.put('/{material_id}', status_code=200, response_model=MaterialSchema)
async def update_material(uow: UOWdep, material_id: int, data: MaterialUpdateSchema):
    return await MaterialService.update_material(uow, material_id, data)

@router.delete('/{material_id}', status_code=204)
async def delete_material(uow: UOWdep, material_id: int):
    await MaterialService.delete_material(uow, material_id)