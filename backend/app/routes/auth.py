"""
auth.py — Authentication routes (Signup / Login).
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
import bcrypt

from app.utils.db import users_collection

router = APIRouter()


# ── Request / Response models ────────────────────────────────────────────────

class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class SignupResponse(BaseModel):
    message: str


# ── POST /api/signup ─────────────────────────────────────────────────────────

@router.post(
    "/signup",
    response_model=SignupResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
)
def signup(payload: SignupRequest):
    # 1. Validate password length (extra server-side guard)
    if len(payload.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Password must be at least 6 characters.",
        )

    # 2. Check for duplicate email
    existing = users_collection.find_one({"email": payload.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists with this email.",
        )

    # 3. Hash password with bcrypt
    hashed_password = bcrypt.hashpw(
        payload.password.encode("utf-8"), bcrypt.gensalt()
    ).decode("utf-8")

    # 4. Insert new user document
    new_user = {
        "name": payload.name,
        "email": payload.email,
        "password": hashed_password,
    }
    users_collection.insert_one(new_user)

    return SignupResponse(message="Signup successful")
