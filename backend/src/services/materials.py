from fastapi import HTTPException

from src.utils.unit_of_work import IUnitOfWork
from src.schemas.materials import MaterialCreateSchema, MaterialUpdateSchema, MaterialFilterSchema

class MaterialService:
    
    @staticmethod
    async def create_material(uow: IUnitOfWork, data: MaterialCreateSchema):
        async with uow:
            new_material = await uow.materials.create(data)
            await uow.commit()
            return new_material
        
    @staticmethod
    async def get_materials_filter_by(uow: IUnitOfWork, filters: MaterialFilterSchema):
        async with uow:
            materials = await uow.materials.get_all_filter_by(**filters.clean_dict())
            return materials or []

    @staticmethod
    async def get_material_filter_by(uow: IUnitOfWork, material_id: int):
        async with uow:
            material = await uow.materials.get_one_filter_by(id=material_id)
            if not material:
                raise HTTPException(status_code=404, detail='Material not found')
            return material
        
    @staticmethod
    async def update_material(uow: IUnitOfWork, material_id: int, data: MaterialUpdateSchema):
        async with uow:
            upd_material = await uow.materials.update(entity_id=material_id, **data.clean_dict())
            if not upd_material:
                raise HTTPException(status_code=404, detail='Material not found')
            await uow.commit()
            return upd_material
        
    @staticmethod
    async def delete_material(uow: IUnitOfWork, material_id: int):
        async with uow:
            del_material = await uow.materials.delete(material_id)
            if not del_material:
                raise HTTPException(status_code=404, detail='Material not found')
            await uow.commit()