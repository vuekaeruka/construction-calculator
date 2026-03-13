from abc import ABC, abstractmethod
from typing import Type

from src.repositories import *
from src.utils.connect import async_session_maker

class IUnitOfWork(ABC):

    calculations: Type[CalculationRepository]
    calc_elements: Type[CalcElementRepository]
    calc_sub_elements: Type[CalcSubElementRepository]
    calc_positions: Type[CalcPositionRepository]
    clients: Type[ClientRepository]
    construct_elements: Type[ConstructElementRepository]
    construct_sub_elements: Type[ConstructSubElementRepository]
    materials: Type[MaterialRepository]
    material_subs: Type[MaterialSubRepository]
    users: Type[UserRepository]

    @abstractmethod
    async def __aenter__(self):
        raise NotImplementedError()

    @abstractmethod
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        raise NotImplementedError()

    @abstractmethod
    async def commit(self):
        raise NotImplementedError()

    @abstractmethod
    async def rollback(self):
        raise NotImplementedError()

class UnitOfWork(IUnitOfWork):

    def __init__(self):
        self.session_factory = async_session_maker

    async def __aenter__(self):
        self.session = self.session_factory()
        self.calculations = CalculationRepository(self.session)
        self.calc_elements = CalcElementRepository(self.session)
        self.calc_sub_elements = CalcSubElementRepository(self.session)
        self.calc_positions = CalcPositionRepository(self.session)
        self.clients = ClientRepository(self.session)
        self.construct_elements = ConstructElementRepository(self.session)
        self.construct_sub_elements = ConstructSubElementRepository(self.session)
        self.materials = MaterialRepository(self.session)
        self.material_subs = MaterialSubRepository(self.session)
        self.users = UserRepository(self.session)

        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            await self.session.rollback()
        await self.session.close()

    async def commit(self):
        await self.session.commit()

    async def rollback(self):
        await self.session.rollback()
