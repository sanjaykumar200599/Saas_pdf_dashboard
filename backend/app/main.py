from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, documents, query
from app.utils.database import init_db

app = FastAPI(title="Contract Analysis Backend")

# Allow frontend (Vite on port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(query.router, prefix="/api/query", tags=["Query"])

# Startup event
@app.on_event("startup")
async def startup_event():
    await init_db()

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}
