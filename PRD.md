# PRD – TemanPanca (Product Requirements Document)

## 1. Product Overview
**Nama Produk:** TemanPanca  
**Tagline:** "Belajar Pancasila Jadi Petualangan!"  
**Platform:** Web App (Mobile-first, responsive)  
**Tujuan:** Membantu anak SD (kelas 1–3) belajar nilai-nilai Pancasila dengan cara interaktif, visual, dan berbasis cerita atau misi, dengan dipandu oleh karakter Nusantara. Dapat digunakan mandiri di rumah maupun di pantau oleh guru.

---

## 2. Target User
- **Primary:** Anak SD (kelas 1–3) -> Fokus pada UI simpel, tombol besar, tulisan sedikit, dan ikon visual.
- **Secondary:** Orang tua (membantu interaksi) & Guru.

---

## 3. Brand & Visual Guidelines
- **Personality:** Ceria, Edukatif, Ramah Anak, Inklusif, dan Penuh Petualangan.
- **Tone of Voice:** Simple, Positif, Friendly ("Yuk mulai petualangan!", "Hebat!")
- **Color System:**
  - **Base:** Abu-abu muda / putih (Clean agar tidak melelahkan mata).
  - **Accent:** Hijau, Biru, dan Kuning/Amber (Menandakan alam, kelancaran, interaksi ceria).
  - **Action:** Emas / Oranye / Amber (Tombol utama dan aksi penting).
- **Character Style:** Flat 2D illustration, anak Nusantara, ramah.

---

## 4. Current Core Features (MVP)

### 4.1. Dashboard & Navigasi Utama (Jelajah)
- Pengguna melihat sapaan dan peta nusantara interaktif.
- Pengguna dapat memilih 5 titik Sila, masing-masing dijaga oleh karakter maskot:
  - **Sila 1:** Bimo (Tema Amber)
  - **Sila 2:** Siregar (Tema Merah/Emerald)
  - **Sila 3:** Sinta (Tema Hijau/Biru)
  - **Sila 4:** Passa 
  - **Sila 5:** Aruya
- *Mapping* rute mengarahkan ke halaman `DetailSilaScreen`.

### 4.2. Materi List (Sila Details)
- Menu detail berisi kumpulan kartu `Materi` terkait satu perihal/sila.
- Merender status ketersediaan (Tersedia / Terkunci).
- Setiap meteri terhubung ke pangkalan data statis (`silaData.js` & `materiData.js`) untuk mempercepat rendering dan *templating*.

### 4.3. Interactive Learning Flow (Data-Driven Engine)
Fitur `BelajarScreen` adalah inti (jiwa) aplikasi. Konsepnya berlandaskan konsep *State Machine / Slidesable Book*:
1. **Panggung Visual 16:9:** Kotak landscape menampilkan ilustrasi latar belakang dan avatar karakter.
2. **Cerita Interaktif (Slides):** Deretan percakapan, konteks, info, teks penegasan (nilai pelajaran).
3. **Mini Interaksi:** Pertanyaan skenario dasar sebelum masuk ke ranah kuis, disertai *feedback* instan (Benar/Salah).
4. **Kuis Pilihan Ganda:** Ujian pemahaman dengan kotak warna dinamis (Hijau bila benar, Merah bila salah) dan *blue-box* berisi penjabaran rasionalisasi jawaban secara transparan.
5. **Score & Reward System (Selesai):** Halaman final pemberian XP dan skor, mengapung bersama Lencana / Aset penghargaan sukses menamatkan materi.

---

## 5. Arsiktektur Teknologi
**Frontend (Saat ini sepenuhnya beroperasi):**
- React 18
- Vite
- Tailwind CSS

**Data Management:**
- Pendekatan arsitektur *Data-driven*. Semua slide cerita, quiz, state UI disimpan dalam JSON (`materiData.js` & `silaData.js`) sehingga hanya membutuhkan 1 halaman antarmuka (`BelajarScreen`) untuk memutar hingga puluhan materi. 

**Backend & Authentication (Roadmap V2):**
- *Supabase Auth* (Google Sign-In)
- *Supabase Database* (Menyimpan histori poin `score`, progress materi `materi_completed`, data profil).

---

## 6. Skenario Flow & Struktur Routing
1. **Home/Jelajah** -> `JelajahScreen` (Pilih Sila yang tersedia di peta avatar).
2. **Detail Sila** -> `DetailSilaScreen` (Menampilkan sub-list materi misalnya *Berdoa*, *Menghormati*, dll).
3. **Belajar Panel** -> `BelajarScreen` (Ruang eksekusi belajar cerita -> interaksi -> quiz).
4. **Selesai** -> Mengakumulasi poin ke state lokal aplikasi.

---

## 7. Keunggulan & Inovasi (Unique Selling Point)
- **Modul Bukan Textbook:** Anak-anak merasa seperti sedang bermain dan membaca *scrapbook*, bukan dijejali teori.
- **Karakter Relatable:** Membawa representasi budaya lokal Indonesia.
- **Sistem Kuis Tematik:** Jawaban salah tidak sekadar memberikan silang, melainkan ada diskusi kotak biru konfirmasi pendidik agar anak memahami letak permasalahannya.
