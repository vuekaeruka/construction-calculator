from fastapi import HTTPException

from src.utils.unit_of_work import IUnitOfWork
from src.schemas.material_categories import MaterialCategoryCreateSchema, MaterialCategoryUpdateSchema, MaterialCategoryFilterSchema

class MaterialCategoryService:
    
    @staticmethod
    async def create_material_category(uow: IUnitOfWork, data: MaterialCategoryCreateSchema):
        async with uow:
            new_material_category = await uow.material_categories.create(data)
            await uow.commit()
            return new_material_category
        
    @staticmethod
    async def get_material_categories_filter_by(uow: IUnitOfWork, filters: MaterialCategoryFilterSchema):
        async with uow:
            material_categories = await uow.material_categories.get_all_filter_by(**filters.clean_dict())
            return material_categories or []

    @staticmethod
    async def get_material_category_filter_by(uow: IUnitOfWork, material_category_id: int):
        async with uow:
            material_category = await uow.material_categories.get_one_filter_by(id=material_category_id)
            if not material_category:
                raise HTTPException(status_code=404, detail='Material Category not found')
            return material_category
        
    @staticmethod
    async def update_material_category(uow: IUnitOfWork, material_category_id: int, data: MaterialCategoryUpdateSchema):
        async with uow:
            upd_material_category = await uow.material_categories.update(entity_id=material_category_id, **data.clean_dict())
            if not upd_material_category:
                raise HTTPException(status_code=404, detail='Material Category not found')
            await uow.commit()
            return upd_material_category
        
    @staticmethod
    async def delete_material_category(uow: IUnitOfWork, material_category_id: int):
        async with uow:
            del_material_category = await uow.material_categories.delete(material_category_id)
            if not del_material_category:
                raise HTTPException(status_code=404, detail='Material Category not found')
            await uow.commit()