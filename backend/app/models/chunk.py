# app/models/chunk.py
from sqlalchemy import Column, Integer, String, ForeignKey
from app.models.base import Base

class Chunk(Base):
    __tablename__ = "chunks"
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    content = Column(String)
