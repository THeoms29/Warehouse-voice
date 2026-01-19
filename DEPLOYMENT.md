# Deployment Configuration Guide
## Warehouse Inventory Assistant

Dokumen ini berisi konfigurasi lengkap untuk deployment sistem ke cloud platform.

---

## 1. Backend (Laravel) - Railway / Heroku / DigitalOcean

### Environment Variables (Wajib)

```env
# App Configuration
APP_NAME=WarehouseVoice
APP_ENV=production
APP_KEY=base64:... (generate dengan: php artisan key:generate --show)
APP_DEBUG=false
APP_URL=https://your-backend-url.up.railway.app

# Database (dari Railway MySQL atau PlanetScale)
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=root
DB_PASSWORD=your-db-password

# LiveKit Configuration
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=APIxxxxxxxx
LIVEKIT_API_SECRET=your-livekit-secret
```

### Build Command
```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan db:seed --force
php artisan config:cache
php artisan route:cache
```

### Start Command
```bash
php artisan serve --host=0.0.0.0 --port=$PORT
```

---

## 2. Frontend (React) - Vercel / Netlify

### Environment Variables

```env
VITE_API_URL=https://your-backend-url.up.railway.app/api
VITE_LIVEKIT_URL=wss://your-project.livekit.cloud
```

### Build Settings (Vercel)
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

---

## 3. AI Agent (Python) - LiveKit Cloud

### Environment Variables

```env
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=APIxxxxxxxx
LIVEKIT_API_SECRET=your-livekit-secret
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxx
CARTESIA_API_KEY=your-cartesia-api-key
LARAVEL_API_URL=https://your-backend-url.up.railway.app
```

### Deploy Command
```bash
cd ai-agent
livekit-cli cloud deploy
```

---

## 4. Daftar API Keys yang Diperlukan

| Service | URL | Keterangan |
|---------|-----|------------|
| LiveKit Cloud | https://cloud.livekit.io | API Key + Secret |
| Groq | https://console.groq.com | Untuk STT (Whisper) + LLM (Llama) |
| Cartesia | https://cartesia.ai | Untuk TTS |

---

## 5. Langkah Redeploy Cepat

### Railway (Backend)
1. Login ke https://railway.app
2. New Project → Deploy from GitHub
3. Pilih repo `Warehouse-voice`, folder `Backend-Laravel`
4. Add MySQL service
5. Copy-paste environment variables di atas
6. Deploy!

### Vercel (Frontend)
1. Login ke https://vercel.com
2. New Project → Import dari GitHub
3. Pilih repo, set Root Directory ke `frontend-gudang`
4. Add environment variables
5. Deploy!

### LiveKit Cloud (AI Agent)
1. Login ke https://cloud.livekit.io
2. Create project (jika belum ada)
3. Jalankan `livekit-cli cloud deploy` dari terminal

---

## 6. Troubleshooting

| Error | Solusi |
|-------|--------|
| CORS error | Tambahkan URL frontend ke `config/cors.php` |
| 500 Server Error | Cek `APP_KEY` dan jalankan `php artisan config:cache` |
| Database connection refused | Periksa `DB_HOST` gunakan internal Railway URL |
| Agent not connecting | Pastikan `LIVEKIT_URL` diawali `wss://` |
