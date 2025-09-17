from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.dialects.sqlite import JSON
from sqlalchemy.orm import relationship
from app.utils.database import Base

class Chunk(Base):
    __tablename__ = "chunks"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    "order" = Column("order_idx", Integer, default=0)
    text = Column(Text, nullable=False)
    embedding = Column(JSON, nullable=True)  # optional JSON embeddings

    document = relationship("Document", back_populates="chunks")
