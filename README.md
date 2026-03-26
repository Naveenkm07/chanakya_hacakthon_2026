<div align="center">

# 🕉️ Sanskrit Chant Generation System
### Chanakya Hackathon 2026 — AI-Powered Sanskrit Heritage Preservation

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify)](https://chanakya-chant.netlify.app)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Frontend](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![AI Tools](https://img.shields.io/badge/AI%20Tools-Declared-ff6b6b?style=for-the-badge)](https://github.com/Naveenkm07/chanakya_hacakthon_2026)

> **An intelligent, full-stack system that generates, analyzes, and plays Sanskrit chants using machine learning and audio processing — built in 48 hours at Chanakya University Hackathon 2026.**

</div>

---

## 📸 Screenshots

| Landing Page | Dashboard |
|---|---|
| 3D Animated Sanskrit Characters | Chant Generator + Audio Player |

---

## 🎯 Problem Statement

Sanskrit — one of the world's oldest languages — carries centuries of chants, mantras, and wisdom. Yet, no modern, intelligent system exists to **generate, customize, and experience** Sanskrit chants digitally. We built one.

---

## ✨ Key Features

- 🎵 **AI Chant Generation** — ML model trained on classical Sanskrit chant patterns
- 🔊 **Audio Playback** — Generate and play chants with real audio
- 🌐 **3D Landing Page** — Immersive Three.js powered Sanskrit visualization
- 🔐 **Secure Authentication** — JWT token-based login/signup (fully offline)
- 📊 **Dashboard Analytics** — Track and replay generated chants
- 🚀 **Full-Stack** — React frontend + FastAPI backend

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│           React + Vite Frontend      │
│   Three.js 3D | TypeScript | Axios  │
└────────────────┬────────────────────┘
                 │ HTTP / JWT
┌────────────────▼────────────────────┐
│         FastAPI Python Backend       │
│  Auth Routes | Chant Routes | ML    │
└────────────────┬────────────────────┘
                 │
     ┌───────────┴───────────┐
     │                       │
┌────▼────┐          ┌───────▼──────┐
│users.json│          │  ML Model    │
│(Auth DB) │          │ (Librosa +   │
└──────────┘          │  NumPy)      │
                      └──────────────┘
```

---

## 🛠️ Tech Stack

| Layer       | Technology                              |
|-------------|----------------------------------------|
| **Frontend**  | React 19, Vite, TypeScript, Three.js, React-Three-Fiber |
| **Backend**   | FastAPI, Python 3.11, Uvicorn          |
| **ML/Audio**  | NumPy, Librosa, PyDub                  |
| **Auth**      | JWT (PyJWT), bcrypt, Local JSON Store  |
| **Deployment**| Netlify (Frontend), Render (Backend)   |

---

## 📁 Project Structure

```
chanakya_hacakthon_2026/
├── 📂 frontend/                 # React + Vite + TypeScript
│   ├── src/
│   │   ├── pages/              # Landing, Login, Signup, Dashboard
│   │   ├── components/         # Navbar, ProtectedRoute
│   │   └── services/           # API (axios + JWT interceptor)
├── 📂 backend/                  # FastAPI Python API
│   ├── app/
│   │   ├── routes/             # auth.py, chant.py
│   │   ├── utils/              # db.py, security.py
│   │   └── main.py
│   ├── requirements.txt
│   └── users.json              # Offline local user store
└── 📂 ml-model/                 # ML training & inference scripts
```

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- Node.js 18+
- Python 3.11+

### 1. Clone the Repository
```bash
git clone https://github.com/Naveenkm07/chanakya_hacakthon_2026.git
cd chanakya_hacakthon_2026
```

### 2. Start the Backend
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
> Backend API running at: **http://localhost:8000**
> API Docs (Swagger): **http://localhost:8000/docs**

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
> Frontend running at: **http://localhost:5173**

### 4. Environment Variables (Optional)
Create a `.env` file in `backend/`:
```env
JWT_SECRET_KEY=your-secret-key-here
```
> Without this, a secure default key is used automatically. No database setup needed!

---

## 🔐 Authentication Flow

```
User Registers → Password hashed (bcrypt) → JWT Token issued → Auto logged in
User Logs In   → Credentials verified       → JWT Token issued → Redirected to Dashboard
Protected Routes → Token checked in localStorage → Access granted or redirected
```

---

## 🌐 Deployment

### Frontend → Netlify
```
Build Command:  npm run build
Publish Dir:    dist/
```

### Backend → Render / Railway
```
Start Command:  uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

---

## 📋 Hackathon Rules & Compliance

> **This project was built in compliance with all Chanakya Hackathon 2026 rules.**

| Rule | Status |
|------|--------|
| ✅ Originality — Developed entirely during the hackathon period | **Compliant** |
| ✅ Open-source libraries & public datasets used | **Compliant** |
| ✅ AI Tools declared (see below) | **Compliant** |
| ✅ Public GitHub repository with README & setup steps | **Compliant** |
| ✅ Source code integrity, no plagiarized code | **Compliant** |
| ✅ Live demo ready for shortlisted evaluation | **Ready** |
| ✅ 2-minute video submission (architecture + pipeline explained) | **Submitted** |

### 🤖 AI Tools Disclosure
As required by hackathon rules, we declare the use of the following AI tools during development:
- **Google Gemini (Antigravity AI Coding Assistant)** — Used for code generation, debugging, and architecture guidance.
- All AI-assisted code was reviewed, understood, and validated by the team.

---

## 🎬 Video Submission
- **Duration**: Under 2 minutes (strict limit)
- **Content**: Project architecture walkthrough + live technical demo

---

## 👨‍💻 Team

| Name | GitHub |
|------|--------|
| Naveen Kumar KM | [@Naveenkm07](https://github.com/Naveenkm07) |

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">

**⭐ Built with passion for Sanskrit and AI at Chanakya University Hackathon 2026 ⭐**

</div>
