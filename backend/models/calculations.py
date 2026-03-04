from config.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, DateTime, Numeric, ForeignKey, event
from datetime import datetime, timedelta
from decimal import Decimal
from utils.enums import CalcStatus, CALC_LIFETIME_DAYS

class Calculation(Base):

    __tablename__ = "calculations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    client_id: Mapped[int] = mapped_column(Integer, ForeignKey("clients.id"))
    manager_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    status: Mapped[CalcStatus] = mapped_column(String(50), default=CalcStatus.RELEVANT.value)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    expires_at: Mapped[datetime] = mapped_column(DateTime)
    
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