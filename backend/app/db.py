from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings  # loads DATABASE_URL from .env

# Create async engine
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=True,  # shows SQL queries in logs
    future=True
)

# Session factory
async_session = sessionmaker(
    engine,
    expire_on_commit=False,
    class_=AsyncSession
)

# Base class for models
Base = declarative_base()

# Dependency for FastAPI routes
async def get_db():
    async with async_session() as session:
        yield session
