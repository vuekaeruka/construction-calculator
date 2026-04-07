from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import event
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.engine import Engine

from src.config import DatabaseConfig

async_engine = create_async_engine(DatabaseConfig.DATABASE_URL)

async_session_maker = async_sessionmaker(async_engine, expire_on_commit=False, class_=AsyncSession)

@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()