# app/config.py
from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET: str
    UPLOAD_DIR: str = "uploads"

    class Config:
        env_file = ".env"

# create instance
settings = Settings()

# ensure upload folder exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
