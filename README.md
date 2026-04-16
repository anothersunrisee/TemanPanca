# TemanPanca 🇮🇩

<p align="center">
  <em>Belajar Pancasila Jadi Petualangan!</em>
</p>

**TemanPanca** adalah aplikasi web interaktif yang dirancang khusus untuk anak Sekolah Dasar (SD kelas 1–3) guna mempelajari nilai-nilai dan pengamalan Pancasila melalui pendekatan _gamifikasi_, ilustrasi ramah anak, serta penyelesaian "misi" interaktif. Alih-alih belajar melalui teori text-book linear, TemanPanca mengajak pengguna berpetualang menelusuri pulau-pulau di nusantara bersama karakter lokal.

## 🚀 Fitur Utama
1. **Peta Nusantara (Jelajah)** 🗺️: Representasi 5 sila sebagai 5 karakter. Visual peta penjelajahan yang seru bagi anak-anak.
2. **Arsitektur Data-Driven** ⚙️: Menggunakan skema JSON (`silaData.js` & `materiData.js`) untuk me-render puluhan kisah, materi, interaksi, dan kuis secara ringan tanpa mengotori ruang _component_.
3. **Mesin Belajar Interaktif** 🎒: Alur cerita berbentuk *slides*, dengan *mini-interaction* dan *quiz* pilihan ganda lengkap dengan sistem umpan balik penjelasan berwarna (*feedback loop*).
4. **Awarding (Reward Screen)** 🌟: Mengakumulasi akurasi poin XP dan lencana selamat usai mendalami pelajaran guna menjaga aspek _engagement_ anak.

## 💻 Tech Stack
- **Framework DOM:** React 18 + Vite
- **Styling:** Tailwind CSS + Konfigurasi Utility Dinamis
- **Assets:** Google Fonts (Lexend & Plus Jakarta Sans), Material Symbols.

## 🏃‍♂️ Cara Menjalankan Lokal (Development)

Pastikan kamu memiliki **Node.js** terinstal dalam komputermu, kemudian ikuti instruksi berikut:

1. **Klon Repositori**
   ```bash
   git clone https://github.com/anothersunrisee/TemanPanca.git
   cd TemanPanca
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   ```

3. **Mulai Development Server**
   ```bash
   npm run dev
   ```

4. Buka _localhost_ (misalnya `http://localhost:5173`) di peramban web kamu. Disarankan untuk menggunakan fitur _Toggle Device Toolbar / F12_ (Responsive Mode) ke rasio Mobile (Misalnya ukuran layar iPhone atau Pixel) karena aplikasi ini didesain berprinsip **Mobile-First**.

## 🛠 Struktur Proyek Utama
```text
src/
├── components/          # Komponen modular UI (TopBar, BottomNavbar)
├── data/                # Database cerdas berupa JSON (Sila, Materi, Kuis)
├── layouts/             # Pembungkus (Wrapper) UI utama
├── screens/             # Halaman utama aplikasi 
│   ├── BelajarScreen/   # Mesin eksekutor cerita, tanya jawab & reward
│   ├── DetailSilaScreen/# Galeri materi dalam masing-masing Sila
│   ├── JelajahScreen/   # Portal masuk (Peta)
│   └── HomeScreen/      # Beranda pengguna
├── App.jsx              # Otak routing & sistem navigasi state
└── index.css            # Pengaya animasi dasar dan inisiasi Tailwind
supabase/                # Skema Database & Migrasi SQL
```

## 🛠 Backend (Supabase)
Aplikasi ini terintegrasi dengan Supabase untuk manajemen data yang persisten:
- **Profiles & Progress**: Menyimpan poin XP, riwayat misi, dan progres belajar per sila.
- **Karakter & Skin**: Sistem inventory untuk membeli dan menggunakan outfit karakter.
- **Leaderboard**: Data kompetisi antar pengguna secara real-time.

## Roadmap v2.0
- Autentikasi penuh via *Google Sign-in*.
- Fitur AR (Augmented Reality) untuk kartu Pancasila.
- Tambahan animasi Lottie untuk feedback interaksi.

*(Proyek ini dikembangkan sebagai upaya menghadirkan pendampingan edukasi yang interaktif untuk Pendidikan Kewarganegaraan dan Karakter Pancasila).*

