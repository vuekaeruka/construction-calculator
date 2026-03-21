from fastapi import HTTPException

from src.utils.unit_of_work import IUnitOfWork
from src.schemas.clients import ClientSchema
from src.schemas.users import UserSchema
from src.schemas.calculations import CalculationFilter, CalculationSchema
from src.utils.enums import CalcStatus

from datetime import datetime
from decimal import Decimal
from sqlalchemy.inspection import inspect

def orm_to_dict(obj):
    if obj is None:
        return None
    if isinstance(obj, (int, float, str, bool, datetime, Decimal)):
        return obj
    if isinstance(obj, list):
        return [orm_to_dict(i) for i in obj]

    result = {}
    # колонки таблицы
    for column in inspect(obj).mapper.column_attrs:
        value = getattr(obj, column.key)
        result[column.key] = value

    # отношения (relationship)
    for name, relation in inspect(obj).mapper.relationships.items():
        related = getattr(obj, name)
        result[name] = orm_to_dict(related)

    return result

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
            return calculations or []
        
    @staticmethod
    async def get_calculation_filter_by(uow: IUnitOfWork, calculation_id: int):
        async with uow:
            calculation = await uow.calculations.get_one_filter_by(id=calculation_id)
            return calculation