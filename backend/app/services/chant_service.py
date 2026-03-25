import os
import uuid
import numpy as np
import scipy.io.wavfile as wavf
import csv

def split_syllables(text: str) -> list[str]:
    """Naive syllable extraction based on characters (ignoring spaces)."""
    clean_text = text.replace(" ", "")
    # Returns each character as a pseudo-syllable for the MVP
    return [char for char in clean_text if char.strip()]

def assign_duration(syllables: list[str]) -> list[float]:
    """Alternate short (0.15s) and long (0.3s)"""
    return [0.15 if i % 2 == 0 else 0.3 for i in range(len(syllables))]

def assign_pitch(syllables: list[str]) -> list[float]:
    """Cycle [100, 140, 180] Hz"""
    cycle = [100.0, 140.0, 180.0]
    return [cycle[i % len(cycle)] for i in range(len(syllables))]

def generate_audio(syllables: list, durations: list, pitches: list) -> str:
    """Synthesize sine wave audio and save as WAV, returning path."""
    sample_rate = 44100
    audio_chunks = []
    
    for pitch, duration in zip(pitches, durations):
        # Generate sine wave for each syllable
        t = np.linspace(0, duration, int(sample_rate * duration), False)
        tone = np.sin(pitch * t * 2 * np.pi)
        audio_chunks.append(tone)
    
    if not audio_chunks:
        raise ValueError("No audio chunks generated")

    full_audio = np.concatenate(audio_chunks)
    
    # Normalize volume to 16-bit PCM scale
    max_val = np.max(np.abs(full_audio))
    if max_val > 0:
        full_audio = full_audio * (32767 / max_val)
    full_audio = full_audio.astype(np.int16)
    
    os.makedirs("audio", exist_ok=True)
    filename = f"chant_{uuid.uuid4().hex[:8]}.wav"
    filepath = os.path.join("audio", filename)
    
    wavf.write(filepath, sample_rate, full_audio)
    return f"/audio/{filename}"

def save_to_csv(syllables: list, pitches: list, durations: list):
    """Export the most recently generated chant data to CSV for Power BI."""
    filepath = "chant_data.csv"
    # Overwrites the file on every call as requested
    with open(filepath, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["index", "syllable", "pitch", "duration"])
        for i, (syl, p, d) in enumerate(zip(syllables, pitches, durations), start=1):
            writer.writerow([i, syl, p, d])

def process_text(text: str) -> dict:
    """Master controller pipeline for processing a chant request."""
    if not text.strip():
        raise ValueError("Empty text received")
        
    syllables = split_syllables(text)
    if not syllables:
        raise ValueError("Invalid text format")
        
    durations = assign_duration(syllables)
    pitches = assign_pitch(syllables)
    
    audio_url = generate_audio(syllables, durations, pitches)
    
    # Run the new Power BI Export task
    save_to_csv(syllables, pitches, durations)
    
    return {
        "audio_url": audio_url,
        "pitch": pitches,
        "duration": durations,
        "syllables": syllables,
    }
