from config.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, DATE, ForeignKey
from datetime import datetime
from utils.enums import Roles

class User(Base):
    
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    last_name: Mapped[str] = mapped_column(String(255))
    first_name: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(255), default=Roles.MANAGER.value)
    login: Mapped[str] = mapped_column(String(255), unique=True)
    password: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DATE, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(DATE, default=datetime.now)