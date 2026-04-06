from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

from src.config import DatabaseConfig

async_engine = create_async_engine(DatabaseConfig.DATABASE_URL)

async_session_maker = async_sessionmaker(async_engine, expire_on_commit=False, class_=AsyncSession)