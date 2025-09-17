from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from passlib.hash import bcrypt
from app.models.user import User

async def create_user(db: AsyncSession, username: str, password: str) -> User:
    hashed = bcrypt.hash(password)
    user = User(username=username, password_hash=hashed)
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

async def authenticate_user(db: AsyncSession, username: str, password: str) -> User | None:
    q = await db.execute(select(User).where(User.username == username))
    user = q.scalar_one_or_none()
    if not user:
        return None
    if not bcrypt.verify(password, user.password_hash):
        return None
    return user
