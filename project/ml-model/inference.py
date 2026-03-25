"""
inference.py — Sanskrit Chant Inference Script (Placeholder)

Given Sanskrit text input:
  1. Convert text to syllables
  2. Map syllables to pitch values
  3. Synthesise audio output
"""

import numpy as np


def text_to_syllables(text: str) -> list[str]:
    """Naive syllable splitter — replace with proper Sanskrit tokenizer."""
    return text.split()


def syllables_to_pitch(syllables: list[str]) -> np.ndarray:
    """Map syllables to normalised pitch values (placeholder)."""
    # Placeholder: assign a fixed pitch to each syllable
    base_pitch = 220.0  # Hz (A3)
    return np.array([base_pitch + i * 10 for i in range(len(syllables))])


def synthesise_audio(pitch_contour: np.ndarray, sample_rate: int = 22050) -> np.ndarray:
    """Synthesise a simple sine-wave audio from a pitch contour (placeholder)."""
    duration_per_syllable = 0.5  # seconds
    audio_frames = []
    t = np.linspace(0, duration_per_syllable, int(sample_rate * duration_per_syllable))
    for freq in pitch_contour:
        wave = 0.3 * np.sin(2 * np.pi * freq * t)
        audio_frames.append(wave)
    return np.concatenate(audio_frames)


def run_inference(text: str = "OM Namah Shivaya") -> np.ndarray:
    syllables = text_to_syllables(text)
    pitch = syllables_to_pitch(syllables)
    audio = synthesise_audio(pitch)
    print(f"[inference] Generated audio | samples: {len(audio)}")
    return audio


if __name__ == "__main__":
    run_inference()
