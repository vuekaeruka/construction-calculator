from config.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, Numeric, ForeignKey
from decimal import Decimal

class CalcSubElement(Base):

    __tablename__ = "calculation_subelements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    calculation_element_id: Mapped[int] = mapped_column(Integer, ForeignKey("calculation_elements.id"))
    construct_subelement_id: Mapped[int] = mapped_column(Integer, ForeignKey("construct_subelements.id"))
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    
class ConstructSubElement(Base):

    __tablename__ = "construct_subelements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))