from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.auth import router as auth_router
from app.routes.chant import router as chant_router

app = FastAPI(
    title="Sanskrit Chant Generation System API",
    description="Backend API for generating Sanskrit chants using ML models.",
    version="1.0.0",
)

# Serve static audio files
import os
os.makedirs("audio", exist_ok=True)
app.mount("/audio", StaticFiles(directory="audio"), name="audio")

# Allow requests from the React frontend (dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ──────────────────────────────────────────────────────────────────
app.include_router(auth_router, prefix="/api", tags=["Auth"])
app.include_router(chant_router, prefix="/api", tags=["Chants"])



@app.get("/", tags=["Health"])
def root():
    return {"message": "Server running", "status": "ok"}
