# expose models for convenience
from .user import User  # if already exists
from .document import Document
from .chunk import Chunk

__all__ = ["User", "Document", "Chunk"]
