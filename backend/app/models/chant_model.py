from pydantic import BaseModel
from typing import Optional


class ChantRequest(BaseModel):
    text: str
    tempo: Optional[float] = 1.0
    pitch: Optional[float] = 0.0


class ChantResponse(BaseModel):
    input: str
    chant_audio_url: Optional[str]
    status: str
