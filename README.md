<div align="center">

# 🕉️ Sanskrit Chant Generation System
### Chanakya Hackathon 2026 — AI-Powered Sanskrit Heritage Preservation

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify)](https://chanakya07.netlify.app)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Frontend](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![AI Tools](https://img.shields.io/badge/AI%20Tools-Declared-ff6b6b?style=for-the-badge)](https://github.com/Naveenkm07/chanakya_hacakthon_2026)

> **An intelligent, full-stack system that generates, analyzes, and plays Sanskrit chants using machine learning and audio processing — built in 48 hours at Chanakya University Hackathon 2026.**

</div>

---

## 📸 Interface Highlights

| Feature | Details |
|---|---|
| 🌌 **4D Animated Background** | Canvas particle system with z-axis wave oscillation, adapts to theme |
| 🎭 **3D Landing Page** | Three.js floating Sanskrit text (संस्कृतम्) with animated sound-wave equalizer |
| ☀️🌙 **Dark / Light Mode** | Toggle from the Navbar, persists across sessions via localStorage |
| 🎵 **Chant Generation + Audio** | ML-powered chant with live audio player + WAV download |
| 📊 **7-Chart Visualization Dashboard** | Pitch, rhythm, energy, radar, bubble, waveform & spectrogram |
| 🔐 **Dual Auth (Online + Offline)** | Backend JWT (bcrypt) + Browser SHA-256 — works without backend |

---

## 🎯 Problem Statement

Sanskrit — one of the world's oldest languages — carries centuries of chants, mantras, and wisdom. Yet, no modern, intelligent system exists to **generate, customize, and experience** Sanskrit chants digitally. We built one.

---

## ✨ Key Features

- 🎵 **AI Chant Generation** — ML pipeline: text → syllables → pitch assignment → sine-wave WAV synthesis
- 🔊 **Audio Playback + Download** — Generate and download chants as WAV files (44.1 kHz, 16-bit PCM)
- 🌌 **4D Animated Background** — 120-particle Canvas system with z-wave oscillation & inter-particle connections
- 🎭 **3D Hero Scene** — Three.js powered landing with floating Sanskrit text + 15-bar audio equalizer
- ☀️🌙 **Dark/Light Mode** — Full theme system toggled from the Navbar, persists in localStorage
- 🔐 **Offline Auth** — JWT-style login/signup using browser localStorage + SHA-256 hashing (Web Crypto API)
- 📊 **Dashboard Analytics** — 7 chart types: pitch line, rhythm bars, energy envelope, radar, bubble map, waveform canvas & spectrogram
- 📤 **Power BI Export** — Auto-generates `chant_data.csv` with syllable, pitch & duration data on every generation
- 🎵 **Demo Fallback** — Frontend uses raga-scale pitch mapping + AudioContext when backend is offline

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│   React + Vite Frontend (Netlify)        │
│   Three.js 3D | Canvas 4D | TypeScript  │
│   Browser Auth (SHA-256 + localStorage)  │
│   AudioContext fallback for demo mode    │
└────────────────┬────────────────────────┘
                 │ HTTP / Axios (JWT Bearer)
┌────────────────▼────────────────────────┐
│         FastAPI Python Backend (Local)   │
│   Auth Routes | Chant Routes | ML        │
│   Static audio serving at /audio/        │
└────────────────┬────────────────────────┘
                 │
     ┌───────────┼──────────────┐
     │           │              │
┌────▼────┐ ┌───▼──────┐ ┌─────▼──────────┐
│users.json│ │ML Pipeline│ │ chant_data.csv │
│(Auth DB) │ │(NumPy +   │ │ (Power BI)     │
└──────────┘ │ SciPy)    │ └────────────────┘
             └───────────┘

Note: Frontend Auth works 100% offline via browser localStorage.
      Chant generation falls back to demo mode if backend is offline.
```

---

## 🛠️ Tech Stack

| Layer        | Technology                                              |
|--------------|--------------------------------------------------------|
| **Frontend** | React 19, Vite 8, TypeScript 5.9, Three.js, React-Three-Fiber, Recharts, Canvas API |
| **Theme**    | Dark/Light mode via React Context + localStorage       |
| **Backend**  | FastAPI 0.110, Python 3.11, Uvicorn                    |
| **ML/Audio** | NumPy, SciPy (WAV I/O), Librosa, PyDub, OfflineAudioContext (browser) |
| **Auth**     | JWT (PyJWT HS256 / browser SHA-256), bcrypt, Local JSON Store |
| **Deployment** | Netlify (Frontend), optional Render/Railway (Backend) |
| **ML Model** | PyTorch 2.2, Torchaudio, Librosa, SoundFile (research module) |

---

## 📁 Project Structure

```
chanakya_hacakthon_2026/
├── 📂 frontend/
│   ├── src/
│   │   ├── context/            # ThemeContext (dark/light)
│   │   ├── pages/              # Landing, Login, Signup, Dashboard, Home
│   │   ├── components/         # Navbar, ProtectedRoute, AnimatedBackground, PitchGraph
│   │   ├── services/           # api.ts (axios) + localAuth.ts (browser auth)
│   │   ├── hooks/              # useChant.ts (chant generation hook)
│   │   └── utils/              # helpers.ts (toTitleCase, formatDuration)
│   ├── package.json
│   └── vite.config.ts
├── 📂 backend/
│   ├── app/
│   │   ├── routes/             # auth.py (signup/login/me), chant.py (generate-chant)
│   │   ├── services/           # chant_service.py (syllable→pitch→audio→CSV pipeline)
│   │   ├── models/             # chant_model.py (Pydantic schemas)
│   │   ├── utils/              # security.py (JWT), db.py (MongoDB), helpers.py
│   │   └── main.py             # FastAPI app, CORS, routers, static files
│   ├── audio/                  # Generated WAV files (auto-created)
│   ├── users.json              # Offline local user store
│   ├── chant_data.csv          # Power BI export (auto-generated)
│   ├── test_chant_logic.py     # Chant pipeline test
│   ├── test_db.py              # MongoDB connection test
│   └── requirements.txt
├── 📂 ml-model/
│   ├── train.py                # Training: dataset → syllables → MFCC → pitch contours
│   ├── inference.py            # Inference: text → pitch → sine-wave audio synthesis
│   └── requirements.txt        # PyTorch, Librosa, SoundFile, SciPy
├── netlify.toml                # Netlify config (base=frontend, publish=dist)
└── .gitignore
```

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- Node.js 18+, Python 3.11+

### 1. Clone
```bash
git clone https://github.com/Naveenkm07/chanakya_hacakthon_2026.git
cd chanakya_hacakthon_2026
```

### 2. Start Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
> API running at **http://localhost:8000** | Swagger: **http://localhost:8000/docs**

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
> Frontend at **http://localhost:5173**

### 4. Environment Variables (Optional)
Create `backend/.env`:
```env
JWT_SECRET_KEY=your-secret-key-here
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/chant_db   # optional
```

Frontend `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:8000
```
> No database setup needed. Users saved to `users.json` locally.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check — returns `{ "status": "ok" }` |
| `POST` | `/api/signup` | Register user (name, email, password) → JWT token |
| `POST` | `/api/login` | Login user (email, password) → JWT token |
| `GET` | `/api/me` | Get current user info (requires Bearer token) |
| `POST` | `/api/generate-chant` | Generate chant from Sanskrit text → audio URL + pitch/duration data |

---

## 🔐 Authentication Flow

### Backend (Server-side — bcrypt + JWT)
```
Register → bcrypt hash → save to users.json → JWT HS256 token (7-day expiry)
Login    → bcrypt verify → JWT token issued → Bearer auth for /api/me
```

### Frontend (Browser-only — SHA-256 + localStorage)
```
Register → SHA-256 hash (Web Crypto API) → token stored in localStorage → Auto logged in
Login    → Hash verified in browser → base64 session token → Dashboard
Protected Routes → isLoggedIn() check → redirect if expired
```

> Frontend auth works **100% offline** — no backend required.

---

## 🎵 Chant Generation Pipeline

### Backend (`chant_service.py`)
```
Sanskrit Text → split_syllables() → assign_pitch() → assign_duration() → generate_audio() → save_to_csv()
                     │                    │                 │                    │                 │
              Strip spaces,        Cycle [100,        Alternate 0.15s      Sine-wave WAV      Export CSV
              per-char split     140, 180] Hz        / 0.3s durations    (44.1kHz, 16-bit)   for Power BI
```

### Frontend Demo Mode (when backend is offline)
- Uses `Intl.Segmenter` for proper Devanagari grapheme splitting
- Raga-scale pitch mapping: `[Sa Re Ga Ma Pa Dha Ni]` (261–523 Hz)
- Real-time playback via `AudioContext` oscillator nodes
- WAV download via `OfflineAudioContext` with RIFF/WAVE headers

---

## 📊 Visualization Dashboard (7 Charts)

| Chart | Type | Description |
|-------|------|-------------|
| 📈 Pitch Line | Recharts `LineChart` | Pitch (Hz) per syllable |
| 🥁 Rhythm Bars | Recharts `BarChart` | Duration (seconds) per syllable |
| 🌊 Energy Envelope | Recharts `AreaChart` | Pitch + Duration overlay with gradients |
| 🕸️ Properties Radar | Recharts `RadarChart` | Normalized Pitch%, Duration%, Energy% |
| 🫧 Bubble Map | Recharts `ScatterChart` | Pitch × Duration × Energy bubble sizes |
| 〰️ Waveform | Canvas API | Per-syllable sine-wave simulation |
| 🌡️ Spectrogram | Canvas API | 32-band frequency intensity heatmap |

---

## 🌐 Deployment

### Frontend → Netlify *(auto-detected via netlify.toml)*
```
Base: frontend | Build: npm run build | Publish: dist
```

### Backend → Render/Railway (optional)
```
Start: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

> **Note:** The frontend works fully standalone on Netlify — auth is browser-based and chant generation falls back to a synthesized demo when no backend is connected.

---

## 🧪 Testing

```bash
# Backend — test chant pipeline
cd backend && python test_chant_logic.py

# Backend — test MongoDB connection
cd backend && python test_db.py

# Frontend — lint + type check + build
cd frontend && npm run lint && npx tsc --noEmit && npm run build
```

---

## 📋 Hackathon Rules & Compliance

| Rule | Status |
|------|--------|
| ✅ Originality — Developed entirely during hackathon period | **Compliant** |
| ✅ Open-source libraries & public datasets | **Compliant** |
| ✅ AI Tools declared (see below) | **Compliant** |
| ✅ Public GitHub repo with README & setup steps | **Compliant** |
| ✅ Live demo ready | **Ready at chanakya07.netlify.app** |
| ✅ 2-minute video submission | **Submitted** |

### 🤖 AI Tools Disclosure
- **Google Gemini (Antigravity AI Coding Assistant)** — Used for code generation, debugging, and architecture guidance.
- All AI-assisted code was reviewed, understood, and validated by the team.

---

## 🗺️ Future Roadmap

- [ ] 🎼 Train real ML model on Sanskrit chant datasets (MFCC + RNN/Transformer)
- [ ] 🎹 Multiple raga/scale selection (Bhairav, Yaman, Malkauns)
- [ ] 🔊 Replace sine waves with sampled instruments (tanpura, harmonium)
- [ ] 📱 Progressive Web App (PWA) with full offline support
- [ ] 🗄️ MongoDB / PostgreSQL integration for persistent user management
- [ ] 🌍 Multi-language transliteration (Hindi, Telugu, Tamil)

---

## 👨‍💻 Team

| Name | GitHub |
|------|--------|
| Naveen Kumar KM | [@Naveenkm07](https://github.com/Naveenkm07) |

---

<div align="center">

**⭐ Built with passion for Sanskrit and AI at Chanakya University Hackathon 2026 ⭐**

[![Live Demo](https://img.shields.io/badge/Try%20Now-chanakya07.netlify.app-00C7B7?style=for-the-badge)](https://chanakya07.netlify.app)

</div>
