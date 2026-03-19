from fastapi import HTTPException

from src.utils.unit_of_work import IUnitOfWork
from src.schemas.construct_elements import ConstructElementCreateSchema, ConstructElementUpdateSchema, ConstructElementFilterSchema

class ConstructElementService:
    
    @staticmethod
    async def create_construct_element(uow: IUnitOfWork, data: ConstructElementCreateSchema):
        async with uow:
            new_construct_element = await uow.construct_elements.create(data)
            await uow.commit()
            return new_construct_element
        
    @staticmethod
    async def get_construct_elements_filter_by(uow: IUnitOfWork, filters: ConstructElementFilterSchema):
        async with uow:
            construct_elements = await uow.construct_elements.get_all_filter_by(**filters.clean_dict())
            return construct_elements or []

    @staticmethod
    async def get_construct_element_filter_by(uow: IUnitOfWork, construct_element_id: int):
        async with uow:
            construct_element = await uow.construct_elements.get_one_filter_by(id=construct_element_id)
            if not construct_element:
                raise HTTPException(status_code=404, detail='Construct Element not found')
            return construct_element
        
    @staticmethod
    async def update_construct_element(uow: IUnitOfWork, construct_element_id: int, data: ConstructElementUpdateSchema):
        async with uow:
            upd_construct_element = await uow.construct_elements.update(entity_id=construct_element_id, **data.clean_dict())
            if not upd_construct_element:
                raise HTTPException(status_code=404, detail='Construct Element not found')
            await uow.commit()
            return upd_construct_element
        
    @staticmethod
    async def delete_construct_element(uow: IUnitOfWork, construct_element_id: int):
        async with uow:
            del_construct_element = await uow.construct_elements.delete(construct_element_id)
            if not del_construct_element:
                raise HTTPException(status_code=404, detail='Construct Element not found')
            await uow.commit()