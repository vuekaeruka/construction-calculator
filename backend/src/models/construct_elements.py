from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String

from src.models.base import BaseSQLModels

class ConstructElement(BaseSQLModels):

    __tablename__ = "construct_elements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))

    elements: Mapped[list['CalcElement']] = relationship(
        'CalcElement',
        back_populates='construct_element',
        lazy='selectin'
    )

class ConstructSubElement(BaseSQLModels):

    __tablename__ = "construct_subelements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))

    subelements: Mapped[list['CalcSubElement']] = relationship(
        'CalcSubElement',
        back_populates='construct_sub_element',
        lazy='selectin'
    )
