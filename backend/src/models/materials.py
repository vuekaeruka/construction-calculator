from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, Numeric, ForeignKey
from decimal import Decimal

from src.models.base import BaseSQLModels

class Material(BaseSQLModels):

    __tablename__ = "materials"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    category_id: Mapped[int] = mapped_column(Integer, ForeignKey("material_categories.id"))
    name: Mapped[str] = mapped_column(String(255))
    unit: Mapped[str] = mapped_column(String(50))
    cost_price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    market_price: Mapped[Decimal] = mapped_column(Numeric(10, 2))

class MaterialCategory(BaseSQLModels):

    __tablename__ = "material_categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))