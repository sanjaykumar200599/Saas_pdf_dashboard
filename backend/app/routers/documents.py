from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import os

from app.utils.database import SessionLocal
from app.models.user import User
from app.models.document import Document
from app.schemas.document import DocumentOut
from app.config import UPLOAD_DIR
from app.utils.jwt_handler import decode_token

router = APIRouter()


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


@router.post("/upload", response_model=dict)
async def upload_contract(file: UploadFile = File(...), db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    safe_name = f"{user.id}_{int(os.path.getmtime('.') if os.path.exists('.') else 0)}_{file.filename}"
    path = os.path.join(UPLOAD_DIR, safe_name)

    content = await file.read()
    with open(path, "wb") as f:
        f.write(content)

    doc = Document(filename=safe_name, original_filename=file.filename, uploaded_by=user.id)
    db.add(doc)
    await db.commit()
    await db.refresh(doc)

    return {"message": "uploaded", "document_id": doc.id}


@router.get("/", response_model=list[DocumentOut])
async def list_documents(db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    q = await db.execute(select(Document).where(Document.uploaded_by == user.id))
    docs = q.scalars().all()
    return docs
