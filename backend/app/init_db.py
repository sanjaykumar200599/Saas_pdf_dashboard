import asyncio
from app.db import engine, Base
from app.models.user import User  # import all models here!

async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

if __name__ == "__main__":
    asyncio.run(init_models())
