from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String

from src.models.base import BaseSQLModels

class ConstructElement(BaseSQLModels):

    __tablename__ = "construct_elements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))

class ConstructSubElement(BaseSQLModels):

    __tablename__ = "construct_subelements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))
