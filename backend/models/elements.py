from config.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, Numeric, ForeignKey
from decimal import Decimal

class CalcElement(Base):

    __tablename__ = "calculation_elements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    calculation_id: Mapped[int] = mapped_column(Integer, ForeignKey("calculations.id"))
    construct_element_id: Mapped[int] = mapped_column(Integer, ForeignKey("construct_elements.id"))
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2))

class ConstructElement(Base):

    __tablename__ = "construct_elements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))