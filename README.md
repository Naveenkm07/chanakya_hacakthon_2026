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
| ☀️🌙 **Dark / Light Mode** | Toggle from the Navbar, persists across sessions |
| 🎵 **Chant Generation + Audio** | ML-powered chant with live audio player + download |
| 📊 **Visualization Dashboard** | Pitch & rhythm graphs with Sanskrit syllables |
| 🔐 **Browser-Only Auth** | JWT-style tokens stored in localStorage — no backend needed |

---

## 🎯 Problem Statement

Sanskrit — one of the world's oldest languages — carries centuries of chants, mantras, and wisdom. Yet, no modern, intelligent system exists to **generate, customize, and experience** Sanskrit chants digitally. We built one.

---

## ✨ Key Features

- 🎵 **AI Chant Generation** — ML model trained on classical Sanskrit chant patterns
- 🔊 **Audio Playback + Download** — Generate and download chants as WAV files
- 🌌 **4D Animated Background** — Immersive particle canvas with z-wave oscillation
- ☀️🌙 **Dark/Light Mode** — Full theme system toggled from the Navbar
- 🔐 **Offline Auth** — JWT-style login/signup using browser localStorage + SHA-256 hashing
- 📊 **Dashboard Analytics** — Pitch Hz and rhythm pattern visualization per syllable

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│   React + Vite Frontend (Netlify)        │
│   Three.js 3D | Canvas 4D | TypeScript  │
│   Browser Auth (SHA-256 + localStorage)  │
└────────────────┬────────────────────────┘
                 │ HTTP / JWT (when backend available)
┌────────────────▼────────────────────────┐
│         FastAPI Python Backend (Local)   │
│   Auth Routes | Chant Routes | ML        │
└────────────────┬────────────────────────┘
                 │
     ┌───────────┴──────────┐
     │                      │
┌────▼────┐         ┌───────▼──────┐
│users.json│         │  ML Model    │
│(Auth DB) │         │ (Librosa +   │
└──────────┘         │  NumPy)      │
                     └──────────────┘

Note: Frontend Auth works 100% offline via browser localStorage.
      Chant generation falls back to demo mode if backend is offline.
```

---

## 🛠️ Tech Stack

| Layer        | Technology                                              |
|--------------|--------------------------------------------------------|
| **Frontend** | React 19, Vite, TypeScript, Three.js, React-Three-Fiber, Canvas API |
| **Theme**    | Dark/Light mode via React Context + localStorage       |
| **Backend**  | FastAPI, Python 3.11, Uvicorn                          |
| **ML/Audio** | NumPy, Librosa, PyDub, OfflineAudioContext (browser)  |
| **Auth**     | JWT (PyJWT / browser SHA-256), bcrypt, Local JSON Store |
| **Deployment** | Netlify (Frontend), optional Render (Backend)        |

---

## 📁 Project Structure

```
chanakya_hacakthon_2026/
├── 📂 frontend/
│   ├── src/
│   │   ├── context/            # ThemeContext (dark/light)
│   │   ├── pages/              # Landing, Login, Signup, Dashboard
│   │   ├── components/         # Navbar, ProtectedRoute, AnimatedBackground
│   │   └── services/           # api.ts (axios) + localAuth.ts (browser auth)
├── 📂 backend/
│   ├── app/
│   │   ├── routes/             # auth.py (offline JSON), chant.py
│   │   ├── utils/              # security.py (JWT), db.py
│   │   └── main.py
│   ├── requirements.txt
│   └── users.json              # Offline local user store
└── 📂 ml-model/
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
```
> No database setup needed. Users saved to `users.json` locally.

---

## 🔐 Authentication Flow

```
Register → SHA-256 hash (browser) → token stored in localStorage → Auto logged in
Login    → Hash verified in browser → token issued → Dashboard
Protected Routes → isLoggedIn() check → redirect if expired
```

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

## 👨‍💻 Team

| Name | GitHub |
|------|--------|
| Naveen Kumar KM | [@Naveenkm07](https://github.com/Naveenkm07) |

---

<div align="center">

**⭐ Built with passion for Sanskrit and AI at Chanakya University Hackathon 2026 ⭐**

[![Live Demo](https://img.shields.io/badge/Try%20Now-chanakya07.netlify.app-00C7B7?style=for-the-badge)](https://chanakya07.netlify.app)

</div>
