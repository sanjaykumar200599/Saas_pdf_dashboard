from pydantic import BaseModel
from typing import Optional

class ChunkCreate(BaseModel):
    order: int
    text: str
    embedding: Optional[dict] = None

class ChunkOut(BaseModel):
    id: int
    order: int
    text: str

    class Config:
        orm_mode = True
