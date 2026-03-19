from fastapi import HTTPException

from src.utils.unit_of_work import IUnitOfWork
from src.schemas.clients import ClientSchema
from src.schemas.users import UserSchema
from src.schemas.calculations import CalculationFilter, CalculationSchema
from src.utils.enums import CalcStatus

class CalculationService:
    
    @staticmethod
    async def create_calculation(uow: IUnitOfWork):
        async with uow:
            new_calculation = await uow.calculations.create()
            await uow.commit()
            return new_calculation
        
    @staticmethod
    async def get_calculations_filter_by(uow: IUnitOfWork, filters: CalculationFilter):
        async with uow:
            calculations = await uow.calculations.get_all_filter_by(**filters.clean_dict())
            return calculations