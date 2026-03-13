from abc import ABC, abstractmethod
from sqlalchemy import select, insert, update, delete
from sqlalchemy.exc import SQLAlchemyError, IntegrityError, OperationalError, ProgrammingError
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Type

from src.models.base import BaseSQLModels

class AbstractRepository(ABC):
       
    @abstractmethod
    async def create(self, entity):
        raise NotImplementedError()
    
    @abstractmethod
    async def get_all_filter_by(self, **kwargs):
        raise NotImplementedError()

    @abstractmethod
    async def get_one_filter_by(self, **kwargs):
        raise NotImplementedError()

    @abstractmethod
    async def update(self, entity_id: int, **kwargs):
        raise NotImplementedError()

    @abstractmethod
    async def delete(self, entity_id: int):
        raise NotImplementedError()

class SQLAlchemyRepository(AbstractRepository):

    entity: Type[BaseSQLModels]

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def _execute(self, stmt):
        try:
            result = await self.session.execute(stmt)
            return result

        except IntegrityError as e:
            await self.session.rollback()
            raise Exception("Нарушение целостности данных.", e.params, e.orig)
        
        except OperationalError as e:
            await self.session.rollback()
            raise Exception("Ошибка работы с базой данных.", e.params, e.orig)

        except ProgrammingError as e:
            await self.session.rollback()
            raise Exception("Ошибка синтаксиса SQL.", e.params, e.orig)

        except SQLAlchemyError as e:
            await self.session.rollback()
            raise Exception("Непредвиденная ошибка базы данных.", e.params, e.orig)

    async def create(self, entity):
        stmt = insert(self.entity).values(**entity.__dict__).returning(self.entity)
        result = await self._execute(stmt)
        entity = result.scalars().first()
        return entity

    async def get_all_filter_by(self, **kwargs):
        stmt = select(self.entity).filter_by(**kwargs)
        result = await self._execute(stmt)
        entity = result.scalars().all()
        return entity if entity else None

    async def get_one_filter_by(self, **kwargs):
        stmt = select(self.entity).filter_by(**kwargs)
        result = await self._execute(stmt)
        entity = result.scalars().first()
        return entity if entity else None

    async def update(self, entity_id: int, **kwargs):
        stmt = update(self.entity).filter_by(id=entity_id).values(**kwargs).returning(self.entity)
        result = await self._execute(stmt)
        entity = result.scalar_one_or_none()
        return entity if entity else None

    async def delete(self, entity_id: int):
        stmt = delete(self.entity).filter_by(id=entity_id)
        result = await self._execute(stmt)
        return result