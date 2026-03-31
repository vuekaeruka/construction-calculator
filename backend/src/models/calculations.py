from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, DateTime, Float, Text, ForeignKey
from datetime import datetime, timedelta

from src.models.base import BaseSQLModels
from src.utils.enums import CalcStatus, CALC_LIFETIME_DAYS, Element, SubElement

class Calculation(BaseSQLModels):

    __tablename__ = "calculations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    client_id: Mapped[int] = mapped_column(Integer, ForeignKey("clients.id", ondelete="CASCADE"))
    address: Mapped[str] = mapped_column(Text)
    status: Mapped[CalcStatus] = mapped_column(String(50), default=CalcStatus.RELEVANT.value)
    price: Mapped[float] = mapped_column(Float)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    expires_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now() + timedelta(days=CALC_LIFETIME_DAYS))

    client: Mapped['Client'] = relationship(
        'Client', 
        foreign_keys=[client_id], 
        lazy='joined', 
        back_populates='calculations'
    )
    elements: Mapped[list['CalcElement']] = relationship(
        'CalcElement',
        cascade="all, delete-orphan",
        passive_deletes=True,  # Важно для ondelete="CASCADE"
        lazy='selectin'
    )

class CalcElement(BaseSQLModels):

    __tablename__ = "calculation_elements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    calculation_id: Mapped[int] = mapped_column(Integer, ForeignKey("calculations.id", ondelete="CASCADE"))
    element_name: Mapped[Element] = mapped_column(String(255))
    price: Mapped[float] = mapped_column(Float)

    subelements: Mapped[list['CalcSubElement']] = relationship(
        'CalcSubElement',
        cascade="all, delete-orphan",
        passive_deletes=True,
        lazy='selectin'
    )

class CalcSubElement(BaseSQLModels):

    __tablename__ = "calculation_subelements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    calc_element_id: Mapped[int] = mapped_column(Integer, ForeignKey("calculation_elements.id", ondelete="CASCADE"))
    sub_element_name: Mapped[str] = mapped_column(String(255))
    price: Mapped[float] = mapped_column(Float)

    positions: Mapped[list['CalcPosition']] = relationship(
        'CalcPosition',
        cascade="all, delete-orphan",
        passive_deletes=True,
        lazy='selectin'
    )

class CalcPosition(BaseSQLModels):

    __tablename__ = "calculation_positions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    calc_sub_element_id: Mapped[int] = mapped_column(Integer, ForeignKey("calculation_subelements.id", ondelete="CASCADE"))
    material_id: Mapped[int] = mapped_column(Integer, ForeignKey("materials.id"))
    quantity: Mapped[float] = mapped_column(Float)
    price: Mapped[float] = mapped_column(Float)

    material: Mapped['Material'] = relationship(
        'Material',
        lazy='joined'
    )