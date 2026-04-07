from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String
from typing import List

from src.models.base import BaseSQLModels

class Client(BaseSQLModels):

    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    phone_number: Mapped[str] = mapped_column(String(11), unique=True)
    last_name: Mapped[str] = mapped_column(String(255))
    first_name: Mapped[str] = mapped_column(String(255))
    patronymic: Mapped[str] = mapped_column(String(255))

    calculations: Mapped[List['Calculation']] = relationship(
        'Calculation',
        lazy='selectin', 
        back_populates='client'
    )