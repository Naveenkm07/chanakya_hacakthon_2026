from fastapi import APIRouter

router = APIRouter()


@router.get("/generate")
def generate_chant(text: str = "OM"):
    """
    Placeholder route for chant generation.
    Replace with actual ML inference call.
    """
    return {"input": text, "chant_audio_url": None, "status": "placeholder"}
