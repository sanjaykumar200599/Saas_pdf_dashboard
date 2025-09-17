from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from .chunk import ChunkOut

class DocumentCreate(BaseModel):
    original_filename: str

class DocumentOut(BaseModel):
    id: int
    filename: str
    original_filename: Optional[str]
    created_at: datetime
    chunks: Optional[List[ChunkOut]] = []

    class Config:
        orm_mode = True
