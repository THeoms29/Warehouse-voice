# 🏭 Warehouse Voice Assistant

Aplikasi manajemen gudang berbasis suara menggunakan AI. Memungkinkan staf gudang untuk mengelola inventori secara hands-free melalui perintah suara.

![Warehouse Voice Assistant](https://img.shields.io/badge/Status-Production-green) ![React](https://img.shields.io/badge/Frontend-React-blue) ![Laravel](https://img.shields.io/badge/Backend-Laravel-red) ![LiveKit](https://img.shields.io/badge/AI-LiveKit-purple)

---

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Tech Stack](#-tech-stack)
- [Fitur Utama](#-fitur-utama)
- [Instalasi & Setup](#-instalasi--setup)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Struktur Folder](#-struktur-folder)

---

## 🎯 Tentang Project

**Warehouse Voice Assistant** adalah sistem manajemen gudang yang memungkinkan pengguna untuk:
- Menambah dan mengurangi stok barang via suara
- Mencari lokasi barang dalam gudang
- Melihat riwayat aktivitas inventori
- Berinteraksi dengan sistem tanpa menyentuh perangkat

Ideal untuk lingkungan gudang dimana tangan pekerja sibuk dan input manual tidak praktis.

---

## 🏗 Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                         INTERNET                            │
└───────────────────────────┬─────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────────────┐
│   Frontend    │  │   Backend     │  │   LiveKit Cloud       │
│   (Vercel)    │  │   (Railway)   │  │   (AI Agent)          │
│               │  │               │  │                       │
│  React + Vite │  │  Laravel API  │  │  Python + Groq LLM    │
│  Tailwind CSS │  │  MySQL DB     │  │  Cartesia TTS         │
│               │  │               │  │  Whisper STT          │
└───────┬───────┘  └───────┬───────┘  └───────────┬───────────┘
        │                  │                      │
        │    REST API      │      WebSocket       │
        └──────────────────┴──────────────────────┘
```

---

## 🛠 Tech Stack

### Frontend (React)
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI Framework |
| Vite | 5.x | Build Tool |
| Tailwind CSS | 3.x | Styling |
| LiveKit Client | 2.x | Real-time Audio |
| React Router | 6.x | Navigation |

### Backend (Laravel)
| Technology | Version | Purpose |
|------------|---------|---------|
| Laravel | 10.x | API Framework |
| MySQL | 8.x | Database |
| LiveKit SDK | 1.x | Token Generation |
| Sanctum | 3.x | Authentication |

### AI Agent (Python)
| Technology | Version | Purpose |
|------------|---------|---------|
| LiveKit Agents | 1.3.x | Agent Framework |
| Groq Whisper | - | Speech-to-Text |
| Groq LLaMA | 3.1-8B | Language Model |
| Cartesia | Sonic-3 | Text-to-Speech |
| Silero VAD | - | Voice Activity Detection |

---

## ✨ Fitur Utama

- 🎤 **Voice Commands** - Kontrol inventori dengan suara
- 🔐 **PIN Authentication** - Login dengan PIN 6 digit
- 📦 **Inventory Management** - Tambah/kurang stok via suara
- 🔍 **Product Search** - Cari barang dan lokasi
- 📊 **Activity History** - Riwayat semua transaksi
- 🌙 **Dark Mode** - Tema gelap untuk kenyamanan

---

## 🚀 Instalasi & Setup

### Prerequisites

- Node.js 18+
- PHP 8.2+
- Composer
- Python 3.10+
- MySQL 8.0+

### 1. Clone Repository

```bash
git clone https://github.com/THeoms29/Warehouse-voice.git
cd Warehouse-voice
```

### 2. Setup Frontend

```bash
cd frontend-gudang
npm install
cp .env.example .env
# Edit .env dengan konfigurasi Anda
npm run dev
```

### 3. Setup Backend

```bash
cd Backend-Laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### 4. Setup AI Agent

```bash
cd ai-agent
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
cp .env.example .env
# Edit .env dengan API keys
python agent.py dev
```

---

## ☁️ Deployment

### Production URLs

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | `https://warehouse-voice-igos.vercel.app` |
| Backend | Railway | `https://warehouse-voice-production.up.railway.app` |
| AI Agent | LiveKit Cloud | Managed by LiveKit |

### Environment Variables

#### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.railway.app/api
VITE_LIVEKIT_URL=wss://your-project.livekit.cloud
```

#### Backend (.env)
```
APP_KEY=base64:xxxxx
DB_CONNECTION=mysql
DB_HOST=your-db-host
LIVEKIT_API_KEY=your-key
LIVEKIT_API_SECRET=your-secret
```

#### AI Agent (.env)
```
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your-key
LIVEKIT_API_SECRET=your-secret
GROQ_API_KEY=gsk_xxxxx
CARTESIA_API_KEY=xxxxx
LARAVEL_API_URL=https://your-backend-url.railway.app
```

---

## 📚 API Documentation

### Authentication

#### Verify PIN
```http
POST /api/auth/verify-pin
Content-Type: application/json

{
  "pin": "123456"
}
```

### LiveKit Token

#### Get Token
```http
GET /api/livekit/token?room=room-name&username=user-name
```

### Activity Log

#### Get All Logs
```http
GET /api/activity-log
```

---

## 📁 Struktur Folder

```
Warehouse-voice/
├── frontend-gudang/          # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React Context (Auth)
│   │   └── services/         # API services
│   └── package.json
│
├── Backend-Laravel/          # Laravel Backend
│   ├── app/
│   │   ├── Http/Controllers/ # API Controllers
│   │   └── Models/           # Eloquent Models
│   ├── database/
│   │   ├── migrations/       # DB Migrations
│   │   └── seeders/          # Data Seeders
│   └── routes/api.php        # API Routes
│
├── ai-agent/                 # Python AI Agent
│   ├── agent.py              # Main Agent Entry
│   ├── api.py                # Inventory Tools
│   └── requirements.txt      # Python Dependencies
│
└── README.md
```

---

## 👥 Tim Pengembang

- **Developer** - Theodore Manuel Sahasikas

---

## 📄 Lisensi

Project ini dikembangkan untuk tujuan akademis.

---

## 🙏 Acknowledgments

- [LiveKit](https://livekit.io/) - Real-time communication platform
- [Groq](https://groq.com/) - Fast LLM inference
- [Cartesia](https://cartesia.ai/) - Text-to-speech
- [Railway](https://railway.app/) - Backend hosting
- [Vercel](https://vercel.com/) - Frontend hosting
