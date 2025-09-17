from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from passlib.hash import bcrypt
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, TokenResponse
from app.utils.database import SessionLocal
from app.utils.jwt_handler import create_access_token

router = APIRouter()

async def get_db():
    async with SessionLocal() as session:
        yield session

@router.post("/signup")
async def signup(user: UserCreate, db: AsyncSession = Depends(get_db)):
    q = await db.execute(select(User).where(User.username == user.username))
    existing = q.scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    new_user = User(username=user.username, password_hash=bcrypt.hash(user.password))
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return {"id": new_user.id, "username": new_user.username}

@router.post("/login", response_model=TokenResponse)
async def login(user: UserLogin, db: AsyncSession = Depends(get_db)):
    q = await db.execute(select(User).where(User.username == user.username))
    db_user = q.scalar_one_or_none()
    if not db_user or not bcrypt.verify(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": str(db_user.id)})
    return {"access_token": token}
