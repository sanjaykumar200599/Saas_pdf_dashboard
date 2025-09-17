import os
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.document import Document
from app.models.chunk import Chunk
from app.config import UPLOAD_DIR

async def save_file_and_create_document(db: AsyncSession, user_id: int, upload_file, filename: str) -> Document:
    # upload_file: bytes; filename: original filename
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    saved_name = f"{user_id}_{filename}"
    path = os.path.join(UPLOAD_DIR, saved_name)
    with open(path, "wb") as f:
        f.write(upload_file)

    doc = Document(filename=saved_name, original_filename=filename, uploaded_by=user_id)
    db.add(doc)
    await db.commit()
    await db.refresh(doc)
    return doc

def simple_chunk_text(text: str, max_chars: int = 800) -> List[str]:
    # naive chunker: split by sentences until near max_chars
    sentences = text.split(". ")
    chunks = []
    current = ""
    for s in sentences:
        add = (s + ". ") if not s.endswith(".") else s + " "
        if len(current) + len(add) > max_chars:
            if current.strip():
                chunks.append(current.strip())
            current = add
        else:
            current += add
    if current.strip():
        chunks.append(current.strip())
    return chunks

async def create_chunks_for_document(db: AsyncSession, document_id: int, texts: List[str]):
    created = []
    for idx, t in enumerate(texts):
        chunk = Chunk(document_id=document_id, order=idx, text=t)
        db.add(chunk)
        created.append(chunk)
    await db.commit()
    # optionally refresh/return
    return created

async def get_documents_for_user(db: AsyncSession, user_id: int):
    q = await db.execute(select(Document).where(Document.uploaded_by == user_id))
    return q.scalars().all()
