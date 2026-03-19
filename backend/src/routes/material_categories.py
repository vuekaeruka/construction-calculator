from typing import List
from fastapi import APIRouter, Depends

from src.services.material_categories import MaterialCategoryService
from src.schemas.material_categories import MaterialCategoryCreateSchema, MaterialCategoryUpdateSchema, MaterialCategorySchema, MaterialCategoryFilterSchema
from src.dependencies import UOWdep

router = APIRouter(prefix='/material_categories', tags=['Material Categories'])

@router.post('/', status_code=201, response_model=MaterialCategorySchema)
async def create_material_category(uow: UOWdep, data: MaterialCategoryCreateSchema):
    return await MaterialCategoryService.create_material_category(uow, data)

@router.get('/', status_code=200, response_model=List[MaterialCategorySchema])
async def get_material_categories(uow: UOWdep, filters: MaterialCategoryFilterSchema = Depends()):
    return await MaterialCategoryService.get_material_categories_filter_by(uow, filters)

@router.get('/{material_category_id}', status_code=200, response_model=MaterialCategorySchema)
async def get_material_category(uow: UOWdep, material_category_id: int):
    return await MaterialCategoryService.get_material_category_filter_by(uow, material_category_id)

@router.put('/{material_category_id}', status_code=200, response_model=MaterialCategorySchema)
async def update_material_category(uow: UOWdep, material_category_id: int, data: MaterialCategoryUpdateSchema):
    return await MaterialCategoryService.update_material_category(uow, material_category_id, data)

@router.delete('/{material_category_id}', status_code=204)
async def delete_material_category(uow: UOWdep, material_category_id: int):
    await MaterialCategoryService.delete_material_category(uow, material_category_id)