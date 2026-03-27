from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, DateTime, Numeric, Text, ForeignKey, event
from datetime import datetime, timedelta

from src.models.base import BaseSQLModels
from src.utils.enums import CalcStatus, CALC_LIFETIME_DAYS, Element, SubElement

class Calculation(BaseSQLModels):

    __tablename__ = "calculations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    client_id: Mapped[int] = mapped_column(Integer, ForeignKey("clients.id"))
    address: Mapped[str] = mapped_column(Text)
    status: Mapped[CalcStatus] = mapped_column(String(50), default=CalcStatus.RELEVANT.value)
    price: Mapped[float] = mapped_column(Numeric(10, 2))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    expires_at: Mapped[datetime] = mapped_column(DateTime)

    client: Mapped['Client'] = relationship(
        'Client', 
        foreign_keys=[client_id], 
        lazy='joined', 
        back_populates='calculations'
    )
    elements: Mapped[list['CalcElement']] = relationship(
        'CalcElement',
        cascade="all, delete-orphan",
        lazy='selectin'
    )
    
# Events
@event.listens_for(Calculation, "before_insert")
def set_expiration_on_create(mapper, connection, target):
    now = datetime.now()
    target.created_at = now
    target.updated_at = now
    target.expires_at = now + timedelta(days=CALC_LIFETIME_DAYS)


@event.listens_for(Calculation, "before_update")
def set_expiration_on_update(mapper, connection, target):
    now = datetime.now()
    target.updated_at = now
    target.expires_at = now + timedelta(days=CALC_LIFETIME_DAYS)

# Properties
@property
def is_expired(self) -> bool:
    return datetime.now() > self.expires_at

@property
def actual_status(self):
    if self.is_expired:
        return CalcStatus.NOT_RELEVANT.value
    return self.status


class CalcElement(BaseSQLModels):

    __tablename__ = "calculation_elements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    calculation_id: Mapped[int] = mapped_column(Integer, ForeignKey("calculations.id"))
    element_name: Mapped[Element] = mapped_column(String(255))
    price: Mapped[float] = mapped_column(Numeric(10, 2))

    subelements: Mapped[list['CalcSubElement']] = relationship(
        'CalcSubElement',
        cascade="all, delete-orphan",
        lazy='selectin'
    )

class CalcSubElement(BaseSQLModels):

    __tablename__ = "calculation_subelements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    calc_element_id: Mapped[int] = mapped_column(Integer, ForeignKey("calculation_elements.id"))
    sub_element_name: Mapped[SubElement] = mapped_column(String(255))
    price: Mapped[float] = mapped_column(Numeric(10, 2))

    positions: Mapped[list['CalcPosition']] = relationship(
        'CalcPosition',
        cascade="all, delete-orphan",
        lazy='selectin'
    )

class CalcPosition(BaseSQLModels):

    __tablename__ = "calculation_positions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    calc_sub_element_id: Mapped[int] = mapped_column(Integer, ForeignKey("calculation_subelements.id"))
    material_id: Mapped[int] = mapped_column(Integer, ForeignKey("materials.id"))
    quantity: Mapped[float] = mapped_column(Numeric(10, 2))
    price: Mapped[float] = mapped_column(Numeric(10, 2))

    material: Mapped['Material'] = relationship(
        'Material',
        lazy='joined'
    )
