from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, DateTime, Numeric, ForeignKey, event
from datetime import datetime, timedelta
from decimal import Decimal

from src.models.base import BaseSQLModels
from src.utils.enums import CalcStatus, CALC_LIFETIME_DAYS

class Calculation(BaseSQLModels):

    __tablename__ = "calculations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    client_id: Mapped[int] = mapped_column(Integer, ForeignKey("clients.id"))
    manager_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    status: Mapped[CalcStatus] = mapped_column(String(50), default=CalcStatus.RELEVANT.value)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    expires_at: Mapped[datetime] = mapped_column(DateTime)

    manager: Mapped['User'] = relationship(
        'User', 
        foreign_keys=[manager_id], 
        lazy='joined', 
        back_populates='calculations'
    )
    client: Mapped['Client'] = relationship(
        'Client', 
        foreign_keys=[client_id], 
        lazy='joined', 
        back_populates='calculations'
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
    construct_element_id: Mapped[int] = mapped_column(Integer, ForeignKey("construct_elements.id"))
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2))

class CalcSubElement(BaseSQLModels):

    __tablename__ = "calculation_subelements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    calculation_element_id: Mapped[int] = mapped_column(Integer, ForeignKey("calculation_elements.id"))
    construct_subelement_id: Mapped[int] = mapped_column(Integer, ForeignKey("construct_subelements.id"))
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2))

class CalcPosition(BaseSQLModels):

    __tablename__ = "calculation_positions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    subelement_id: Mapped[int] = mapped_column(Integer, ForeignKey("calculation_subelements.id"))
    material_id: Mapped[int] = mapped_column(Integer, ForeignKey("materials.id"))
    quantity: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
