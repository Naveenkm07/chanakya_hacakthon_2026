# 🕉️ Chanakya Hackathon 2026 — Sanskrit Chant Generation System

A full-stack AI-powered Sanskrit chant generation system built for Chanakya Hackathon 2026.

## 📁 Project Structure

```
├── backend/        # FastAPI Python backend
├── frontend/       # React + Vite + TypeScript frontend
├── ml-model/       # Machine learning inference & training scripts
```

## 🚀 Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at: http://localhost:5173

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Runs at: http://localhost:8000

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, TypeScript, Three.js |
| Backend | FastAPI, Python, MongoDB |
| ML | NumPy, Librosa |
| Auth | bcrypt, JWT |

## 🌐 Deployment

- **Frontend**: Netlify (build: `npm run build`, publish: `dist/`)
- **Backend**: Render / Railway

## 👨‍💻 Author

[Naveenkm07](https://github.com/Naveenkm07)
