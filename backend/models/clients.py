from config.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, DATE, ForeignKey
from datetime import datetime
from utils.enums import Roles

class Client(Base):

    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    phone_number: Mapped[str] = mapped_column(String(255), unique=True)
    last_name: Mapped[str] = mapped_column(String(255))
    first_name: Mapped[str] = mapped_column(String(255))
    patronymic: Mapped[str] = mapped_column(String(255))
    address: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[str] = mapped_column(String(255), default=datetime.now)
    updated_at: Mapped[str] = mapped_column(String(255), default=datetime.now)