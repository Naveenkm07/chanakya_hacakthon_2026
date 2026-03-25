from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from app.services.chant_service import process_text

router = APIRouter()

class ChantRequest(BaseModel):
    text: str

@router.post("/generate-chant")
def generate_chant(payload: ChantRequest):
    if not payload.text or not payload.text.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Text cannot be empty."
        )
    
    try:
        # Call the modular pipeline
        result = process_text(payload.text)
        return result
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(ve)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Audio generation failed: {str(e)}"
        )
