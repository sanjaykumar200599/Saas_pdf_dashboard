from fastapi import APIRouter, Depends, HTTPException, Header, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

from app.utils.database import SessionLocal
from app.models.user import User
from app.utils.jwt_handler import decode_token
from app.services.query_service import generate_answer

router = APIRouter()

class QueryRequest(BaseModel):
    question: str
    document_id: int | None = None

async def get_db():
    async with SessionLocal() as session:
        yield session

async def get_current_user(authorization: str = Header(None), db: AsyncSession = Depends(get_db)) -> User:
    if not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing authorization header")
    token = authorization.split(" ")[1] if " " in authorization else authorization
    payload = decode_token(token)
    user_id = int(payload.get("sub"))
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user


@router.post("/", response_model=dict)
async def query_endpoint(req: QueryRequest, db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    # generate_answer will return a dict with an 'answer' field
    answer = await generate_answer(db=db, user=user, question=req.question, document_id=req.document_id)
    return {"answer": answer}
