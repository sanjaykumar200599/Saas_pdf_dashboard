# app/models/document.py
from sqlalchemy import Column, Integer, String, ForeignKey
from app.models.base import Base

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    uploaded_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    file_name = Column(String, nullable=False)
