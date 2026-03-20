from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, DateTime, event
from datetime import datetime
from typing import List

from src.models.base import BaseSQLModels

class User(BaseSQLModels):
    
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    last_name: Mapped[str] = mapped_column(String(255))
    first_name: Mapped[str] = mapped_column(String(255))
    login: Mapped[str] = mapped_column(String(50), unique=True)
    password: Mapped[str] = mapped_column(String(255), unique=True)
    
    calculations: Mapped[List['Calculation']] = relationship(
        'Calculation',
        lazy='selectin', 
        back_populates='manager'
    )