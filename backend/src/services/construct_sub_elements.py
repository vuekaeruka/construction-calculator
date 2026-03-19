from fastapi import HTTPException

from src.utils.unit_of_work import IUnitOfWork
from src.schemas.construct_sub_elements import ConstructSubElementCreateSchema, ConstructSubElementUpdateSchema, ConstructSubElementFilterSchema

class ConstructSubElementService:
    
    @staticmethod
    async def create_construct_sub_element(uow: IUnitOfWork, data: ConstructSubElementCreateSchema):
        async with uow:
            new_construct_sub_element = await uow.construct_sub_elements.create(data)
            await uow.commit()
            return new_construct_sub_element
        
    @staticmethod
    async def get_construct_sub_elements_filter_by(uow: IUnitOfWork, filters: ConstructSubElementFilterSchema):
        async with uow:
            construct_sub_elements = await uow.construct_sub_elements.get_all_filter_by(**filters.clean_dict())
            return construct_sub_elements or []

    @staticmethod
    async def get_construct_sub_element_filter_by(uow: IUnitOfWork, construct_sub_element_id: int):
        async with uow:
            construct_sub_element = await uow.construct_sub_elements.get_one_filter_by(id=construct_sub_element_id)
            if not construct_sub_element:
                raise HTTPException(status_code=404, detail='Construct Sub-Element not found')
            return construct_sub_element
        
    @staticmethod
    async def update_construct_sub_element(uow: IUnitOfWork, construct_sub_element_id: int, data: ConstructSubElementUpdateSchema):
        async with uow:
            upd_construct_sub_element = await uow.construct_sub_elements.update(entity_id=construct_sub_element_id, **data.clean_dict())
            if not upd_construct_sub_element:
                raise HTTPException(status_code=404, detail='Construct Sub-Element not found')
            await uow.commit()
            return upd_construct_sub_element
        
    @staticmethod
    async def delete_construct_sub_element(uow: IUnitOfWork, construct_sub_element_id: int):
        async with uow:
            del_construct_sub_element = await uow.construct_sub_elements.delete(construct_sub_element_id)
            if not del_construct_sub_element:
                raise HTTPException(status_code=404, detail='Construct Sub-Element not found')
            await uow.commit()