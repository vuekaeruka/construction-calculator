from src.utils.base_repository import SQLAlchemyRepository
from src.models.calculations import *

class CalculationRepository(SQLAlchemyRepository):
    entity = Calculation

class CalcElementRepository(SQLAlchemyRepository):
    entity = CalcElement

class CalcSubElementRepository(SQLAlchemyRepository):
    entity = CalcSubElement

class CalcPositionRepository(SQLAlchemyRepository):
    entity = CalcPosition