from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, DateTime, event
from datetime import datetime
from typing import List

from src.models.base import BaseSQLModels

class Client(BaseSQLModels):

    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    phone_number: Mapped[str] = mapped_column(String(30), unique=True)
    last_name: Mapped[str] = mapped_column(String(255))
    first_name: Mapped[str] = mapped_column(String(255))
    patronymic: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    calculations: Mapped[List['Calculation']] = relationship(
        'Calculation',
        lazy='selectin', 
        back_populates='client'
    )

@event.listens_for(Client, "before_update")
def set_expiration_on_update(mapper, connection, target):
    target.updated_at = datetime.now()