"""
auth.py — Authentication routes (Signup / Login) using local JSON (Offline).
"""

import json
import os
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, EmailStr
import bcrypt

from app.utils.security import create_access_token, get_current_user

router = APIRouter()
USERS_FILE = "users.json"

def get_users():
    if not os.path.exists(USERS_FILE):
        return {}
    with open(USERS_FILE, "r") as f:
        return json.load(f)

def save_users(users_data):
    with open(USERS_FILE, "w") as f:
        json.dump(users_data, f, indent=4)

# ── Request / Response models ────────────────────────────────────────────────

class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    message: str
    token: str
    user_name: str | None = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# ── POST /api/signup ─────────────────────────────────────────────────────────

@router.post(
    "/signup",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
)
def signup(payload: SignupRequest):
    if len(payload.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Password must be at least 6 characters.",
        )

    users_db = get_users()
    if payload.email in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists with this email.",
        )

    hashed_password = bcrypt.hashpw(
        payload.password.encode("utf-8"), bcrypt.gensalt()
    ).decode("utf-8")

    users_db[payload.email] = {
        "name": payload.name,
        "email": payload.email,
        "password": hashed_password,
    }
    save_users(users_db)
    
    token = create_access_token(data={"sub": payload.email})

    return AuthResponse(message="Signup successful", token=token, user_name=payload.name)

# ── POST /api/login ──────────────────────────────────────────────────────────

@router.post(
    "/login",
    response_model=AuthResponse,
    status_code=status.HTTP_200_OK,
    summary="Login a user",
)
def login(payload: LoginRequest):
    users_db = get_users()
    user = users_db.get(payload.email)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
        
    if not bcrypt.checkpw(payload.password.encode("utf-8"), user["password"].encode("utf-8")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
        
    token = create_access_token(data={"sub": payload.email})
    
    return AuthResponse(message="Login successful", token=token, user_name=user.get("name", ""))

# ── GET /api/me ──────────────────────────────────────────────────────────────

@router.get("/me", summary="Get current user info")
def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "email": current_user["email"],
        "name": current_user.get("name", "")
    }
