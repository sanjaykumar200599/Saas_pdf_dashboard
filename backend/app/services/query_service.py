from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.chunk import Chunk
from app.utils.mock_llama import generate_answer_from_context

async def generate_answer(db: AsyncSession, user, question: str, document_id: int | None = None) -> str:
    # simple approach: if document_id provided get its chunks, else search across user's documents and choose top chunks
    chunks_text = []

    if document_id:
        q = await db.execute(select(Chunk).where(Chunk.document_id == document_id).order_by(Chunk.order))
        chunks = q.scalars().all()
        chunks_text = [c.text for c in chunks]
    else:
        # fallback: collect first chunks from documents the user owns
        q = await db.execute(select(Chunk).join_from(Chunk.__table__, Chunk.__table__))  # keep simple
        # if not using advanced query, just fetch small number of chunks
        q = await db.execute(select(Chunk).limit(10))
        chunks = q.scalars().all()
        chunks_text = [c.text for c in chunks]

    # pass the text context and question into the mock LLM
    context = "\n\n".join(chunks_text[:6])
    answer = generate_answer_from_context(context=context, question=question)
    return answer
