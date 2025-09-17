from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./app.db")
JWT_SECRET = os.getenv("JWT_SECRET", "supersecretjwt")
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads")
