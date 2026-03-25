import os
import sys

# Add backend to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.routes.chant import generate_chant, ChantRequest

payload = ChantRequest(text="गुरुर्ब्रह्मा")
try:
    response = generate_chant(payload)
    print("SUCCESS!")
    print(response)
    
    if os.path.exists("audio") and response["audio_url"]:
        print("Audio file created successfully.")
except Exception as e:
    print(f"FAILED: {e}")
