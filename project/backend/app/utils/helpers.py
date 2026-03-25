"""Shared utility helpers for the backend."""
import re


def sanitize_text(text: str) -> str:
    """Remove non-printable characters from input text."""
    return re.sub(r"[^\x20-\x7E\u0900-\u097F]", "", text).strip()


def clamp(value: float, min_val: float, max_val: float) -> float:
    """Clamp a float to [min_val, max_val]."""
    return max(min_val, min(max_val, value))
