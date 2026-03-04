from config.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, Numeric, ForeignKey
from decimal import Decimal

class CalcPosition(Base):

    __tablename__ = "calculation_positions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    subelement_id: Mapped[int] = mapped_column(Integer, ForeignKey("calculation_subelements.id"))
    material_id: Mapped[int] = mapped_column(Integer, ForeignKey("materials.id"))
    quantity: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2))