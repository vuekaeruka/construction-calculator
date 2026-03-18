from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, DateTime, event
from datetime import datetime

from src.models.base import BaseSQLModels

class User(BaseSQLModels):
    
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    last_name: Mapped[str] = mapped_column(String(255))
    first_name: Mapped[str] = mapped_column(String(255))
    login: Mapped[str] = mapped_column(String(50), unique=True)
    password: Mapped[str] = mapped_column(String(255), unique=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

@event.listens_for(User, "before_update")
def set_expiration_on_update(mapper, connection, target):
    target.updated_at = datetime.now()