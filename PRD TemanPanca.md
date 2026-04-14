

## PRD

 PRD – Web App Edukasi Pancasila
Interaktif (MVP)
## 1. 吝 Product Overview
Nama sementara:
“PancaPlay” – Belajar Pancasila Interaktif untuk Anak SD
## Platform:
● Web App (Mobile-first, responsive)
● Deploy via Vercel
● Backend ringan via Supabase
## Tujuan:
● Membantu anak SD belajar Pancasila dengan cara:
## ○ Interaktif
## ○ Visual
○ Berbasis misi & karakter
● Bisa digunakan:
○ Di rumah (orang tua)
○ Di sekolah (guru)

## 2.  Target User
## Primary:
● Anak SD (kelas 1–3)
## Secondary:
● Orang tua (bantu login & monitoring)
## ● Guru (opsional)


- 里 Core Features (MVP)
 3.1 Authentication (Login Google)
## Tool: Supabase Auth
## Fitur:
● Login dengan Google
● Tidak perlu register manual
## ● Simpan:
## ○ Nama
○ Progress belajar
## Simplifikasi:
 Tidak perlu role (user/guru) dulu

##  3.2 Karakter Nusantara
Gunakan tabel yang kamu buat:
## Nama Sila Role
## Bimo Sila 1 Guide
## Siregar Sila 2 Guide
Sinta/Leh
a
## Sila 3 Guide
## Passa Sila 4 Guide
## Aruya Sila 5 Guide
## Fungsi:
● Maskot tiap sila
● Narator materi
● Pembawa misi


 3.3 Learning Flow (Paling Penting)
## Struktur:
## Pilih Sila → Pilih Materi → Cerita → Interaksi → Quiz → Reward

 3.4 Materi (Content System)
Gunakan list kamu (15 materi)
Struktur DB (Supabase):
sila
- id
- name

materi
- id
- sila_id
- title
- content
- character_id

quiz
- id
- materi_id
- question
- options[]
- answer

## 易 3.5 Quiz System
## MVP:
● 1–2 soal per materi
● Multiple choice
## Feedback:
● Benar → animasi + pujian
● Salah → penjelasan ringan


##  3.6 Progress Tracking
Disimpan di Supabase:
● materi selesai
● skor quiz
## UI:
● Progress bar per sila
● Badge sederhana

流 3.7 AR Integration (Assemblr EDU)
Cara paling realistis:
● Setiap materi punya:
○ tombol “Lihat AR”
● Redirect ke:
○ link / QR dari Assemblr
 Tidak perlu embed rumit

##  3.8 UI/UX (FUN & CHILD-FRIENDLY)
## Style:
● Warna cerah
● Rounded UI
● Icon besar
● Sedikit teks
## Tools:
● Canva Premium → asset cepat
● atau generate via AI (kamu sudah siap )


## ⚠ 4. FITUR OPSIONAL (JANGAN
## PRIORITAS DULU)
❌ Custom Karakter (FULL)
## Kenapa:
● Asset berat
● Konsistensi sulit

✅ Alternatif (SMART):
Pilihan skin sederhana:
## ● Ganti:
○ warna baju
○ aksesoris
 Ini masih doable

 Tools untuk Asset AI (yang cocok buat kamu):
Karena kamu pakai node-based image:
Gunakan prompt seperti:
“2D flat illustration, Indonesian elementary school child, cartoon style, front facing, simple
shapes, consistent character sheet, colorful outfit, no background”
Untuk variasi:
same character, different outfit color, same face, same proportions
 Kunci: pakai seed / reference image


隣 5. TECH STACK (Disesuaikan Tools
## Kamu)
## Frontend:
● Next.js (deploy ke Vercel)
● Tailwind CSS
## Backend:
## ● Supabase:
○ Auth (Google login)
## ○ Database
## ○ Storage (opsional)
## AR:
● Assemblr EDU (external link)

##  6. STRUKTUR HALAMAN
## 1. Landing Page
## ● Logo
## ● Tombol:
## ○ Mulai
## ○ Login

## 2. Dashboard
● Pilih Sila (5 card)
● Progress bar


## 3. Halaman Materi
● List materi per sila

## 4. Halaman Belajar
● Karakter muncul
● Cerita singkat
● Tombol lanjut

## 5. Quiz Page
## ● Soal
● Pilihan jawaban

- AR Page (simple)
● Tombol buka AR

## 易 7. CORE INNOVATION (UNTUK HAKI)
Ini penting banget—yang kamu jual bukan codingnya:
##  Keunikan:
- Sistem karakter berbasis budaya Indonesia
- Pembelajaran berbasis misi (bukan hanya baca)
- Integrasi AR sebagai penguat visual
- Gamifikasi ringan untuk anak SD


## ⏱ 8. ROADMAP 1 BULAN (REALISTIS)
## Week 1:
## ● Setup:
## ○ Next.js
## ○ Supabase Auth
● Design UI (Canva/Figma)

## Week 2:
## ● Implement:
## ○ Dashboard
## ○ Materi
## ○ Quiz

## Week 3:
## ● Tambah:
○ Progress tracking
○ AR link
● Isi konten

## Week 4:
## ● Polish
## ● Screenshot
● Dokumentasi HAKI


- product overview

##  1. PRODUCT OVERVIEW — FINAL
## (TEMANPANCA)
##  Product Name
TemanPanca

## 易 Core Product Idea
TemanPanca adalah web app edukasi interaktif untuk anak SD yang
menggabungkan pembelajaran Pancasila dengan sistem misi, karakter
Nusantara, dan visual interaktif termasuk AR.

 Brand Guideline (Final Structured)
##  Brand Personality
## ● Ceria 
## ● Edukatif 
● Ramah anak 
● Inklusif ϙ
## ● Petualangan 吝
##  Implikasi:
● Tidak boleh terlalu formal
● Harus terasa seperti “teman”, bukan “guru”

 Tone of Voice
## Karakter:

## ● Simple
## ● Pendek
## ● Positif
## ● Friendly
Contoh implementasi:
● “Yuk mulai petualangan!”
● “Hebat! Kamu berhasil!”
● “Coba lagi ya ”

 Tagline (Final Choice Recommendation)
 Pilih ini:
“Belajar Pancasila Jadi Petualangan!”
## Kenapa:
● Nyambung ke sistem misi
● Mudah diingat
● Kuat secara branding

 Visual Key (Diperjelas & Dibuat
## Sistematis)
##  Color System
- Base Color (UI utama)
● Putih → background utama
● Dark (abu tua / hitam lembut) → teks
##  Tujuan:
## ● Clean
● Tidak melelahkan mata anak


- Accent Alam (Environment Feel)
● Hijau → elemen alam, karakter, kartu
● Biru → langit, background section
 Memberi rasa:
## ● Natural
## ● Tenang
● “Dunia petualangan”

- Action Color (CTA / Button)
## ●  Oranye
## ●  Kuning
 Digunakan untuk:
## ● Tombol
## ● Highlight
## ● Reward
##  Insight:
● Ini bikin UI “hidup” tanpa terlalu ramai

##  Gradient Style
● Soft gradient:
○ Biru → putih
○ Hijau → putih
 Hindari gradient terlalu kontras

里 Visual Style (Character & UI)

##  Character Style
● Flat illustration (2D)
● Rounded shape
● Soft shadow
## ● Proporsi:
○ Kepala lebih besar (child-friendly)
## ● Ekspresi:
○ Jelas & ekspresif

 UI Style
## Layout:
## ● Card-based
● Banyak whitespace
## Komponen:
● Tombol besar
● Ikon jelas
● Font besar
## Animasi:
● Hover ringan
● Transisi sederhana
 Jangan over-animasi (biar ringan di HP)

易 Value Proposition (Dipertajam)
##  Masalah:
## ● Pembelajaran Pancasila:
○ Terlalu teoritis
○ Kurang menarik

○ Minim interaksi

 Solusi TemanPanca:
Belajar melalui:
●  Cerita → mudah dipahami
●  Misi → terasa seperti game
●  Karakter → relatable
● 易 Interaksi → tidak pasif

 Core Experience (VERY
## IMPORTANT)
Ini yang akan jadi “jiwa produk”:
Anak tidak merasa belajar, tapi merasa sedang bermain dan menjelajah dunia
bersama karakter

里 Feature Philosophy (Guiding
## Principle)
Semua fitur harus:
● Mudah dipahami anak SD
● Tidak butuh instruksi panjang
● Bisa dimainkan dalam < 3 menit per sesi


⚠ Design Constraint (Biar Kamu
## Tidak Over)
● ❌ Tidak terlalu banyak teks
● ❌ Tidak kompleks seperti LMS
● ❌ Tidak seperti aplikasi sekolah formal

易 Positioning Statement (Untuk
HAKI & Presentasi)
TemanPanca merupakan platform edukasi digital berbasis web yang
mengintegrasikan pembelajaran nilai Pancasila dengan pendekatan gamifikasi,
karakter budaya Indonesia, dan visual interaktif untuk meningkatkan keterlibatan
siswa sekolah dasar.

## ✅ OUTPUT DARI STEP 1 (KAMU
## SUDAH PUNYA):
● Nama produk ✔
## ● Branding ✔
● Visual direction ✔
● Core idea ✔
● Value proposition ✔
 Ini sudah cukup untuk:
● Masuk ke HAKI nanti
● Lanjut ke desain & development
## ○


## 2. User Flow

吝 Navbar Utama TemanPanca (Final
## Recommendation)
Struktur (kiri → kanan):
Home – Jelajah – Misi – AR – Profil

## 里 1. Home 
 Posisi: paling kiri
## Fungsi:
● Landing setelah login
● Ringkasan progress
● Quick access
## Isi:
● “Halo, [nama]!”
● Progress per sila
## ● Tombol:
○ “Lanjutkan belajar”
 Ini dashboard ringan, bukan menu utama belajar

 2. Jelajah  (Explore Materi)
## Fungsi:
● Masuk ke:



## Pilih Sila → Pilih Materi


## Isi:
● 5 kartu sila:
○ Sila 1 (Bimo)
○ Sila 2 (Siregar)
○ dst
 Ini entry utama ke learning content

 3. Misi ⭐ (Core Feature)
 Ini yang bikin produk kamu beda
## Fungsi:
● Akses langsung ke:
○ Misi aktif
## ○ Challenge
## Isi:
● “Misi hari ini”
## ● Status:
○ Belum selesai
○ Sudah selesai
 Ini versi gamified flow
 Anak bisa langsung main tanpa harus pilih materi dulu

## 流 4. AR 
## Fungsi:
● Akses semua pengalaman AR

## Isi:
## ● List:
## ○ Scan Garuda
○ Scan simbol sila
○ Karakter 3D
##  Penting:
● Jangan taruh AR di dalam materi saja
● Kasih menu khusus biar “wow factor”

##  5. Profil 
 Paling kanan (sesuai kamu)
## Fungsi:
● Data user
● Progress detail
## Isi:
## ● Nama
## ● Avatar
● Progress total
## ● Logout

## 易 Kenapa Struktur Ini Paling Optimal
- Sesuai mental model anak
● Home → aman
● Jelajah → belajar
● Misi → main
● AR → seru
● Profil → opsional


- Pisahin “Belajar” vs “Main”
● Jelajah = belajar terstruktur
● Misi = gamifikasi
 Ini penting banget secara UX

## 3. Tidak Overload
● Cuma 5 menu
● Clear purpose

 Icon Recommendation (WAJIB VISUAL)
Gunakan icon sederhana:
## ● Home → 
## ● Jelajah →  / 
## ● Misi → ⭐ / 
## ● AR →  / 
## ● Profil → 
 Anak SD lebih ngerti icon daripada teks

## ⚠ Yang Harus Dihindari
● ❌ Menu “Materi” (terlalu formal)
● ❌ Menu terlalu banyak
● ❌ Istilah kompleks


隣 Mapping ke Learning Flow Kamu
Flow kamu:
## Pilih Sila → Pilih Materi → Cerita → Interaksi → Quiz → Reward
Masuk ke:
##  Navbar: Jelajah
✔ semua flow ini terjadi di sini

 Bonus (Advanced UX – tapi simple)
## Di Home:
## ● Tambahkan:


“Lanjutkan terakhir belajar”


 Ini bikin UX terasa “pintar”

## ✅ FINAL NAVBAR TEMANPANCA
 Home |  Jelajah |  Misi |  AR |  Profil


- detail user flow

Mantap, ini bagian paling penting karena ini akan jadi blueprint UX + struktur coding kamu
sekaligus.
Aku buat dalam 2 layer:
-  User Guide (untuk anak SD / user awam)
- ೕ Developer Notes (biar kamu langsung bisa build)

## 吝 USER FLOW TEMANPANCA
## (END-TO-END)

##  0. FIRST TIME USER (ONBOARDING +
## LOGIN)
##  User Experience
- User buka web TemanPanca
- Muncul halaman:
## ○ Logo
○ Ilustrasi karakter
## ○ Tombol:
 “Masuk dengan Google”
- Orang tua bantu klik login
- Setelah login:
## ○ Muncul:
“Halo! Selamat datang di TemanPanca!”
- Masuk ke Home

## ೕ Developer Notes
## Halaman:

## /login
## Gunakan:
● Supabase Auth (Google)
## Flow:
## Click Login → Supabase Google Auth → Redirect → /home

Data yang disimpan:
● user_id
● name
● email

##  1. HOME (DASHBOARD)
##  User Experience
User melihat:
●  “Halo, Budi!”
● Progress bar:
## ○ Sila 1 ⭐⭐⬜⬜⬜
● Tombol besar:
 “Lanjutkan Petualangan”
● Menu bawah (navbar)

Jika klik:
 “Lanjutkan Petualangan”
→ langsung ke materi terakhir

## ೕ Developer Notes

## Halaman:
## /home
## Data:
● Ambil dari:
○ progress table
## Logic:
if last_materi exists → redirect ke /materi/[id]


##  2. JELAJAH (PILIH SILA)
##  User Experience
User klik:
 “Jelajah”
Muncul 5 kartu:
●  Sila 1 (Bimo)
●  Sila 2 (Siregar)
● dst
User klik:
##  Sila 1

## ೕ Developer Notes
## Halaman:
## /jelajah
## UI:
● Card grid (5 item)

## Data:
● static / database (sila table)

##  3. PILIH MATERI
##  User Experience
Setelah pilih sila:
## Contoh:
##  Sila 1
Muncul list:
● Berdoa sebelum belajar
● Menghormati agama lain
## ● Ibadah
User klik:
 “Berdoa sebelum belajar”

## ೕ Developer Notes
## Halaman:
## /sila/[id]
## Data:
● materi by sila_id

##  4. CERITA (LEARNING PAGE)

##  User Experience
User melihat:
● Karakter muncul (Bimo)
## ● Dialog:
“Sebelum belajar, kita berdoa dulu ya!”
## ● Tombol:
 “Lanjut”
Setelah klik:
● Cerita lanjut (2–3 slide saja)

## ೕ Developer Notes
## Halaman:
## /materi/[id]
## Struktur:
## [
## { "type": "dialog", "text": "...", "character": "bimo" },
## { "type": "dialog", "text": "..." }
## ]

## UI:
● Card + next button

##  5. INTERAKSI (MINI DECISION)
##  User Experience
Setelah cerita:

## Pertanyaan:
“Apa yang harus kamu lakukan sebelum belajar?”
## Pilihan:
● ❌ Langsung main
● ✅ Berdoa dulu
User klik

## ೕ Developer Notes
Masih di:
## /materi/[id]
## Type:
## {
## "type": "choice",
## "question": "...",
## "options": [...]
## }


## 易 6. QUIZ
##  User Experience
● 1–2 soal
## Contoh:
“Kenapa kita harus berdoa?”
Setelah jawab:
## ● Benar → 
● Salah →  + penjelasan


## ೕ Developer Notes
## Halaman:
## /quiz/[materi_id]
## Data:
● quiz table

##  7. REWARD / SELESAI
##  User Experience
Setelah selesai:
## ●  Animasi
● “Kamu hebat!”
## ● Dapat:
⭐ 1 bintang
## Tombol:
 “Lanjut ke misi lain”

## ೕ Developer Notes
## Update:
● progress table
materi_completed = true
score = x



##  8. MISI (ALTERNATIVE FLOW)
##  User Experience
## Klik:
 “Misi”
## Muncul:
● “Misi Hari Ini”
○ Selesaikan 1 materi
○ Jawab 1 quiz

## ೕ Developer Notes
## Halaman:
## /misi
## Logic:
● generate simple task dari materi

## 流 9. AR PAGE
##  User Experience
## Klik:
##  “AR”
## Muncul:
## ● Tombol:
○ “Lihat Garuda”
○ “Lihat Sila 1”

## Klik:
 buka AR

## ೕ Developer Notes
## Halaman:
## /ar
## Isi:
● external link (Assemblr)
window.open(ar_url)


##  10. PROFILE
##  User Experience
## Klik:
##  Profil
## Isi:
## ● Nama
## ● Progress
● Tombol logout

## ೕ Developer Notes
## Halaman:
## /profile


## 隣 STRUKTUR ROUTING (NEXT.JS)
/                 → redirect ke /home atau /login
## /login
## /home
## /jelajah
## /sila/[id]
## /materi/[id]
## /quiz/[id]
## /misi
## /ar
## /profile


## 易 FLOW INTI (SUPER RINGKAS)
## Login
## → Home
## → Jelajah
## → Sila
## → Materi
## → Interaksi
## → Quiz
## → Reward
## → Save Progress


##  NEXT STEP (SANGAT DISARANKAN)
Sekarang kamu sudah punya:
● UX flow ✔
● Struktur halaman ✔
 Kita bisa lanjut ke:
 Tech Setup Step-by-Step
● Setup Supabase Auth (Google)

● Setup database
● Setup Next.js structure
## ATAU
 Wireframe UI per halaman (biar tinggal coding)

Tinggal bilang:
 “lanjut ke tech setup”
atau
 “lanjut ke wireframe UI”
Kita lanjut ke tahap build 


4.1 Materi dan Quiz

## 易 3.5 + 3.4 – MATERI & QUIZ SYSTEM (FINAL DESIGN)

Kita desain sebagai:

Slide Interaktif → Interaksi → Quiz (3 soal) → Feedback → Reward

##  A. STRUKTUR MATERI (SLIDE-BASED SYSTEM)
 Format per Materi

Setiap materi = 5–7 slide maksimal

Struktur tetap:
Slide 1 → Intro (karakter + konteks)
Slide 2 → Penjelasan sederhana
Slide 3 → Contoh kehidupan
## Slide 4 → Interaksi (pilihan)
Slide 5 → Penegasan nilai
→ lanjut ke quiz
里 Contoh Nyata (Materi 1)
##  Sila 1 – Mengenal Tuhan

Sub: Berdoa sebelum belajar

 SLIDE 1 (Intro)
## Karakter: Bimo

## Teks:

“Hai! Sebelum belajar, kita biasanya melakukan sesuatu dulu loh!”

 SLIDE 2 (Konsep)

“Kita berdoa agar belajar kita lancar dan mendapat ilmu yang baik.”

 SLIDE 3 (Contoh)

“Seperti di sekolah, kita berdoa sebelum mulai pelajaran.”

 SLIDE 4 (Interaksi)

“Kalau kamu mau belajar, apa yang kamu lakukan?”

## Pilihan:


Main dulu ❌
Berdoa dulu ✅
 SLIDE 5 (Penegasan)

“Hebat! Berdoa adalah kebiasaan baik ”

## ೕ Developer Structure
## {
## "materi_id": 1,
## "slides": [
## {
## "type": "dialog",
## "character": "bimo",
"text": "Hai! Sebelum belajar..."
## },
## {
## "type": "info",
"text": "Kita berdoa agar..."
## },
## {
## "type": "example",
"text": "Seperti di sekolah..."
## },
## {
## "type": "choice",
"question": "Kalau kamu mau belajar...",
## "options": [
{ "text": "Main dulu", "correct": false },
{ "text": "Berdoa dulu", "correct": true }
## ]
## },
## {
## "type": "closing",
"text": "Hebat! Berdoa adalah..."
## }
## ]
## }
##  B. QUIZ SYSTEM (PER MATERI)
##  Aturan:
3 soal
Multiple choice
1 jawaban benar
易 Contoh Quiz (Materi 1)
## Soal 1:


“Apa yang kita lakukan sebelum belajar?”

## Berdoa ✅
## Bermain
## Tidur
## Soal 2:

“Kenapa kita berdoa?”

Supaya belajar lancar ✅
Supaya cepat pulang
Supaya tidak belajar
## Soal 3:

“Berdoa termasuk sikap...”

## Baik ✅
## Buruk
Tidak penting
## ೕ Struktur Data
## {
## "materi_id": 1,
## "quiz": [
## {
"question": "Apa yang kita lakukan sebelum belajar?",
"options": ["Berdoa", "Bermain", "Tidur"],
## "answer": 0,
"explanation": "Berdoa membantu kita fokus belajar."
## }
## ]
## }
##  C. FEEDBACK SYSTEM
## ✅ Jika Benar:
## Animasi 

## Teks:

“Hebat! Kamu benar!”

## ❌ Jika Salah:
Animasi ringan 

## Teks:


“Belum tepat ya, jawabannya adalah...”

 + tampilkan explanation

## ⭐ D. REWARD SYSTEM

Setelah 3 soal:

## Skor:
## 3/3 → ⭐⭐⭐
## 2/3 → ⭐⭐
## 1/3 → ⭐

## Teks:

“Kamu hebat! Lanjut ke misi berikutnya!”

## 易 E. GENERIC TEMPLATE (UNTUK SEMUA 15 MATERI)

Supaya kamu cepat produksi, gunakan pola ini:

##  TEMPLATE MATERI
- Intro karakter
- Penjelasan sederhana
- Contoh kehidupan
- Interaksi pilihan
## 5. Penegasan
##  TEMPLATE QUIZ
Q1: konsep dasar
Q2: alasan / pemahaman
Q3: penerapan
## ⚡ F. CONTOH CEPAT (MATERI LAIN)
## 里 Sila 2 – Tolong Menolong
## Slide:
“Temanmu jatuh...”
“Apa yang harus kamu lakukan?”

##  Interaksi:

## Membantu ✅
## Menertawakan ❌
## Quiz:
Apa arti tolong menolong?

Kapan kita membantu teman?
Membantu teman adalah sikap...
##  G. STRATEGI PRODUKSI CEPAT (PENTING)

Kamu punya 15 materi → jangan kerjakan semua dulu

Prioritas MVP:
2 materi dari 2 sila berbeda

## Contoh:

Sila 1 (Berdoa)
Sila 2 (Tolong menolong)

 Ini sudah cukup untuk:

## Demo
## HAKI
## Prototype
## 易 H. UX INSIGHT (KRUSIAL)
1 slide = max 1–2 kalimat
Jangan panjang
## Gunakan:
emoji
visual
karakter
##  KESIMPULAN SISTEM
Materi (Slide)
## → Interaksi
→ Quiz (3 soal)
## → Feedback
## → Reward
## → Save Progress

4.2 Detail Materi dan Quiz

Mantap—ini aku buatkan FULL CONTENT PACK (15 materi + slide + quiz) yang:
● ✔ siap langsung kamu masukin ke database / JSON
● ✔ konsisten struktur UX
● ✔ bahasa anak SD
● ✔ berdasarkan nilai umum PPKn SD (buku tematik & praktik pembelajaran dasar)

##  FORMAT YANG AKAN KAMU DAPAT
Setiap materi berisi:
● 5 slide
● 1 interaksi
● 3 soal quiz

##  SILA 1 – KETUHANAN YANG MAHA
## ESA

里 1. Mengenal Tuhan – Berdoa sebelum belajar
## Slides:
- Bimo: “Sebelum belajar, kita biasanya melakukan sesuatu dulu loh!”
- “Kita berdoa agar belajar kita lancar.”
- “Berdoa bisa dilakukan di rumah atau di sekolah.”
## 4. Interaksi:
“Apa yang kamu lakukan sebelum belajar?”
## ○ Berdoa ✅
## ○ Bermain ❌
- “Hebat! Berdoa adalah kebiasaan baik ”
## Quiz:
- Apa yang dilakukan sebelum belajar? → Berdoa ✅

- Kenapa kita berdoa? → Agar belajar lancar ✅
- Berdoa adalah sikap... → Baik ✅

里 2. Menghormati agama lain – Toleransi
## Slides:
- “Teman-teman kita punya agama berbeda.”
- “Kita harus saling menghormati.”
- “Tidak boleh mengejek ibadah orang lain.”
## 4. Interaksi:
“Temanmu berbeda agama, apa yang kamu lakukan?”
## ○ Menghormati ✅
## ○ Mengejek ❌
- “Hebat! Kita harus saling menghargai.”
## Quiz:
- Apa itu toleransi? → Menghormati perbedaan ✅
- Bolehkah mengejek agama lain? → Tidak ✅
- Teman berbeda agama harus... → Dihormati ✅

里 3. Ibadah – Kegiatan ibadah
## Slides:
- “Setiap agama punya cara ibadah.”
- “Ibadah adalah kewajiban.”
- “Kita harus rajin beribadah.”
## 4. Interaksi:
○ Rajin ibadah ✅
## ○ Malas ❌
- “Ibadah membuat kita jadi lebih baik.”
## Quiz:
- Apa itu ibadah? → Kegiatan berdoa kepada Tuhan ✅
- Haruskah kita rajin ibadah? → Ya ✅
- Ibadah membuat kita... → Lebih baik ✅


##  SILA 2 – KEMANUSIAAN

里 4. Sikap adil – Berbagi
## Slides:
- “Bimo punya 2 permen.”
- “Temannya tidak punya.”
- “Bimo membagi permennya.”
## 4. Interaksi:
## ○ Berbagi ✅
○ Menghabiskan sendiri ❌
- “Berbagi itu adil.”
## Quiz:
- Apa itu adil? → Tidak pilih kasih ✅
- Jika punya lebih harus... → Berbagi ✅
- Berbagi adalah sikap... → Baik ✅

里 5. Tolong menolong
## Slides:
- “Temanmu jatuh.”
- “Ia butuh bantuan.”
- “Kamu bisa menolong.”
## 4. Interaksi:
## ○ Membantu ✅
○ Diam saja ❌
- “Menolong itu mulia.”
## Quiz:
- Apa itu tolong menolong? → Membantu orang lain ✅
- Kapan kita membantu? → Saat dibutuhkan ✅

- Menolong adalah sikap... → Baik ✅

## 里 6. Empati
## Slides:
- “Temanmu sedih.”
- “Ia butuh perhatian.”
- “Kamu bisa menghibur.”
## 4. Interaksi:
## ○ Menghibur ✅
## ○ Mengejek ❌
- “Empati membuat kita peduli.”
## Quiz:
- Apa itu empati? → Memahami perasaan orang lain ✅
- Saat teman sedih kita... → Menghibur ✅
- Empati adalah sikap... → Peduli ✅

##  SILA 3 – PERSATUAN

里 7. Persatuan – Bermain bersama
## Slides:
- “Teman-teman bermain bersama.”
- “Tidak boleh memilih-milih teman.”
- “Semua harus rukun.”
## 4. Interaksi:
○ Bermain bersama ✅
○ Memilih teman ❌
- “Bersama itu menyenangkan!”
## Quiz:

- Apa itu persatuan? → Bersama-sama ✅
- Bolehkah pilih teman? → Tidak ✅
- Bermain bersama membuat kita... → Rukun ✅

里 8. Kerjasama – Gotong royong
## Slides:
- “Kelas kotor.”
- “Semua bekerja sama membersihkan.”
- “Pekerjaan jadi ringan.”
## 4. Interaksi:
○ Ikut membantu ✅
## ○ Diam ❌
- “Kerjasama itu hebat!”
## Quiz:
- Apa itu kerjasama? → Bekerja bersama ✅
- Kerjasama membuat pekerjaan... → Ringan ✅
- Gotong royong adalah... → Kerjasama ✅

## 里 9. Cinta Indonesia
## Slides:
- “Indonesia punya banyak budaya.”
- “Kita harus bangga.”
- “Menjaga budaya adalah kewajiban.”
## 4. Interaksi:
## ○ Bangga ✅
○ Tidak peduli ❌
- “Aku cinta Indonesia!”
## Quiz:
- Apa itu cinta Indonesia? → Bangga pada negara ✅
- Budaya harus... → Dijaga ✅
- Kita adalah warga... → Indonesia ✅


##  SILA 4 – DEMOKRASI

## 里 10. Musyawarah
## Slides:
- “Teman-teman ingin memilih ketua kelas.”
- “Mereka berdiskusi.”
- “Semua boleh berbicara.”
## 4. Interaksi:
○ Ikut diskusi ✅
## ○ Diam ❌
- “Musyawarah itu penting!”
## Quiz:
- Apa itu musyawarah? → Diskusi bersama ✅
- Semua orang boleh... → Berpendapat ✅
- Musyawarah untuk... → Mencari keputusan ✅

里 11. Menghargai pendapat
## Slides:
- “Temanmu punya pendapat.”
- “Kamu harus mendengarkan.”
- “Tidak boleh memotong.”
## 4. Interaksi:
## ○ Mendengarkan ✅
## ○ Mengejek ❌
- “Menghargai itu penting!”
## Quiz:
- Apa itu menghargai? → Menghormati ✅
- Saat teman bicara kita... → Mendengar ✅

- Mengejek itu... → Salah ✅

里 12. Pengambilan keputusan
## Slides:
- “Kelas ingin memilih permainan.”
- “Mereka voting.”
- “Hasil terbanyak dipilih.”
## 4. Interaksi:
○ Ikut voting ✅
## ○ Memaksa ❌
- “Voting itu adil!”
## Quiz:
- Apa itu voting? → Memilih bersama ✅
- Hasil terbanyak berarti... → Dipilih ✅
- Voting adalah... → Adil ✅

##  SILA 5 – KEADILAN

## 里 13. Keadilan – Berbagi
## Slides:
- “Ada 3 teman, 3 kue.”
- “Setiap anak mendapat 1.”
- “Itu adil.”
## 4. Interaksi:
○ Dibagi sama rata ✅
○ Diambil sendiri ❌
- “Adil itu tidak pilih kasih!”
## Quiz:

- Apa itu adil? → Sama rata ✅
- Berbagi harus... → Adil ✅
- Adil berarti... → Tidak pilih kasih ✅

里 14. Hak & kewajiban
## Slides:
- “Hak: mendapat belajar.”
- “Kewajiban: belajar dengan baik.”
- “Keduanya harus seimbang.”
## 4. Interaksi:
## ○ Belajar ✅
## ○ Malas ❌
- “Hak dan kewajiban harus seimbang!”
## Quiz:
- Apa itu hak? → Sesuatu yang kita dapatkan ✅
- Apa itu kewajiban? → Sesuatu yang harus dilakukan ✅
- Haruskah seimbang? → Ya ✅

## 里 15. Disiplin
## Slides:
- “Sekolah punya aturan.”
- “Kita harus taat.”
- “Datang tepat waktu.”
## 4. Interaksi:
○ Tepat waktu ✅
## ○ Terlambat ❌
- “Disiplin itu penting!”
## Quiz:
- Apa itu disiplin? → Taat aturan ✅
- Datang tepat waktu itu... → Disiplin ✅
- Melanggar aturan itu... → Tidak baik ✅


##  NEXT STEP (PENTING)
Sekarang kamu sudah punya:
✔ Semua materi
✔ Semua quiz
✔ Struktur siap pakai

 Saran langsung:
Langsung lanjut ke:
“implementasi ke Supabase + struktur JSON”
Aku bisa bantu:
● Convert semua ini ke database schema
● Atau langsung ke format file (biar kamu import)

Kalau siap:
 bilang “lanjut ke implementasi database” 


- AR system

Mantap—ini bagian yang bisa jadi WOW factor TemanPanca 
Karena kamu cuma punya 5 slot AR, kita harus bikin yang:
● ✔ representatif (1 AR = 1 sila)
● ✔ impactful (bukan gimmick)
● ✔ gampang dibuat di Assemblr
● ✔ nyambung ke materi & karakter

## 流 3.7 AR SYSTEM – FINAL STRATEGY
##  Prinsip:
1 Sila = 1 AR Experience
 Jadi total:
5 AR = 5 Sila

##  5 IDE AR TEMANPANCA (FINAL &
## REALISTIS)

 1. Sila 1 – “Doa Sebelum Belajar”
(Bimo)
##  Konsep:
AR menampilkan:
● Bimo sedang berdoa
● Background: meja belajar / kelas

##  Interaksi:
● Anak scan → muncul Bimo
● Ada teks:
“Yuk berdoa sebelum belajar!”
## ✨ Value:
● Membiasakan ritual
● Visual sederhana tapi kuat
易 Kenapa bagus:
● Mudah dibuat di Assemblr
● Relevan langsung ke materi

欄 2. Sila 2 – “Menolong Teman” (Siregar)
##  Konsep:
● Siregar membantu teman yang jatuh
##  Interaksi:
## ● Scene:
○ Teman jatuh
○ Siregar membantu
## Teks:
“Kita harus saling menolong!”
## ✨ Value:
● Emosi terasa
● Anak bisa relate


ణ 3. Sila 3 – “Bermain Bersama”
(Sinta/Leha)
##  Konsep:
● Sekelompok anak dari berbagai daerah bermain bersama
##  Interaksi:
● 3–4 karakter muncul
● Lingkaran bermain
## Teks:
“Bersama itu menyenangkan!”
## ✨ Value:
● Representasi keberagaman
● Kuat untuk visual

 4. Sila 4 – “Musyawarah” (Passa)
##  Konsep:
● Anak-anak duduk melingkar
● Sedang diskusi
##  Interaksi:
● Passa berbicara
● Teman mendengarkan

## Teks:
“Ayo berdiskusi bersama!”
## ✨ Value:
● Edukasi demokrasi sederhana
● Jarang ada di media anak

⚖ 5. Sila 5 – “Berbagi Adil” (Aruya)
##  Konsep:
● Aruya membagi makanan ke teman
##  Interaksi:
● 3 anak
● Masing-masing dapat bagian sama
## Teks:
“Berbagi harus adil!”
## ✨ Value:
● Visual langsung konsep keadilan
● Mudah dipahami anak

## 易 STRUKTUR AR (UNTUK KAMU BUILD
## DI ASSEMBLR)
Setiap AR cukup:

- 1–3 karakter
- 1 aksi utama
- 1 teks pendek
- Optional: animasi ringan

 Jangan terlalu kompleks (biar cepat selesai)

##  INTEGRASI KE WEB APP
## Flow:
User di materi → klik:
 “Lihat AR”
## → Redirect:
assemblr_link


## ೕ Developer:
Tambahkan di database:
## {
## "materi_id": 1,
## "ar_url": "https://assemblr.link/xxx"
## }


##  ASSET STRATEGY (PENTING
## BANGET)
Karena kamu generate sendiri:

Prompt dasar (untuk semua karakter):
2D flat illustration, Indonesian elementary school children, consistent character design, front
facing, simple shapes, colorful outfit, no background


Scene prompt:
children helping each other, classroom setting, 2D cartoon style, bright colors, simple
composition


##  Kunci:
● Buat 1 base character
● Reuse → ganti baju / pose

## ⚠ KESALAHAN YANG HARUS DIHINDARI
● ❌ Terlalu banyak objek
● ❌ Scene terlalu kompleks
● ❌ Teks panjang di AR
● ❌ Tidak nyambung ke materi

##  STRATEGI PALING CERDAS (WAKTU
## MEPEPET)
Urutan bikin AR:
- Sila 1 (paling gampang)
## 2. Sila 2
## 3. Sila 5
## 4. Sila 3
## 5. Sila 4

 Dari mudah → kompleks

##  HASIL AKHIR
Kamu akan punya:
● 5 AR experience
● 5 sila terwakili
● Bisa langsung dimasukkan ke HAKI

## NEXT STEP
Kalau kamu mau, kita bisa lanjut ke:
 1. Prompt detail PER KARAKTER (biar konsisten)
隣 2. Struktur database final (Supabase)
 3. Setup login Google step-by-step

Tinggal bilang:
 “lanjut ke database”
atau
 “buat prompt karakter detail”
Kita langsung masuk tahap build 


## 6. Char Style

Mantap—ini bagian krusial supaya semua aset kamu konsisten (ini yang sering gagal di
project AI).
Aku akan buat:
● ✅ Global Style Prompt (WAJIB dipakai semua karakter)
● ✅ Prompt per karakter (detail & siap generate)
● ✅ Tips konsistensi (super penting untuk hasil mirip)

##  1. GLOBAL STYLE PROMPT (WAJIB
## BASELINE)
 Ini HARUS kamu pakai di semua karakter (copy terus)
2D flat illustration, Indonesian elementary school child, age 7-9, cartoon style, front facing, full
body, consistent character design, simple shapes, rounded features, big expressive eyes,
friendly smile, soft shadow, clean vector style, bright but soft colors, no background, centered
composition, high consistency character sheet


## ⚠ RULE KONSISTENSI (PENTING
## BANGET)
Selalu tambahkan:
same face style, same proportions, same art style

 Kalau pakai node (kayak yang kamu bilang):
● pakai reference image / seed
● jangan generate dari nol tiap karakter

##  2. KARAKTER 1 – BIMO (JAWA)

2D flat illustration, Indonesian elementary school boy, age 8, Javanese culture, wearing
traditional batik ikat headband, simple Javanese outfit, modest clothing, calm and wise
expression, friendly smile, helping attitude, standing pose, same face style, same proportions,
same art style, bright soft colors, no background

 Variasi pose:
● pointing
● giving advice
● smiling

##  3. KARAKTER 2 – SIREGAR (BATAK)
2D flat illustration, Indonesian elementary school boy, age 8, Batak culture, wearing ulos cloth
draped on shoulder, simple traditional Batak outfit, modest clothing, firm and confident
expression, brave and honest personality, standing strong pose, same face style, same
proportions, same art style, bright soft colors, no background

##  Ekspresi:
● serius ringan
● protect teman

##  4. KARAKTER 3 – SINTA / LEHA
## (DAYAK)
2D flat illustration, Indonesian elementary school girl, age 8, Dayak culture, wearing simple
Dayak accessories (headband, bead necklace), modest traditional outfit, warm and friendly
expression, caring personality, smiling gently, same face style, same proportions, same art style,
bright soft colors, no background

##  Pose:
● merangkul teman
● melambaikan tangan


##  5. KARAKTER 4 – PASSA (BUGIS /
## MAKASSAR)
2D flat illustration, Indonesian elementary school boy, age 9, Bugis Makassar culture, wearing
simple traditional Bugis outfit, modest clothing, wise expression, calm and thoughtful, gesture
like explaining or discussing, same face style, same proportions, same art style, bright soft
colors, no background

##  Pose:
● tangan terbuka (diskusi)
● duduk (opsional)

##  6. KARAKTER 5 – ARUYA (PAPUA)
2D flat illustration, Indonesian elementary school girl, age 8, Papuan culture, curly hair, wearing
simple Papuan traditional outfit, modest clothing, cheerful and energetic expression, fair and
kind personality, big smile, same face style, same proportions, same art style, bright soft colors,
no background

##  Pose:
● lompat kecil
● senyum lebar

## 易 3. STRATEGI BIAR SEMUA KARAKTER
## “MATCH”
 Cara paling penting:

- Generate 1 karakter dulu (Bimo)
##  Jadikan:
## ● MASTER REFERENCE

- Karakter lain:
## Tambahkan:
based on the same character style as previous image

atau di tool kamu:
● pakai image reference node

 3. Samakan ini:
● ukuran kepala
● bentuk mata
● warna kulit (tone masih Indonesia tapi variasi dikit boleh)
● outline / tanpa outline

##  4. BONUS – PROMPT UNTUK POSE
## VARIASI
Kalau mau reuse karakter:
same character, different pose, waving hand
same character, pointing forward
same character, helping friend
same character, thinking pose



## ⚠ HAL YANG HARUS DIHINDARI
● ❌ terlalu realistis
● ❌ beda style tiap karakter
● ❌ terlalu detail (susah di AR)
● ❌ background kompleks

##  OUTPUT YANG AKAN KAMU DAPAT
Kalau kamu follow ini:
● Semua karakter konsisten ✔
● Mudah dipakai di:
○ web
○ AR (Assemblr)
● Terlihat profesional (ini penting buat HAKI)

##  NEXT STEP
Kalau kamu mau, kita bisa lanjut ke:
 1. Prompt SCENE untuk AR (biar tinggal generate)
隣 2. Struktur final database Supabase
 3. Setup login Google step-by-step

Tinggal bilang:
 “lanjut ke prompt scene AR”
atau
 “lanjut ke database”
Kita langsung masuk tahap produksi 



- custom karakter

Nah ini —fitur custom character + outfit unlock ini bisa jadi nilai jual utama TemanPanca,
tapi harus didesain simple & scalable biar kamu nggak kejebak di asset hell.
Aku bantu bikin sistem yang:
● ✔ realistis dikerjakan
● ✔ tetap keren
● ✔ bisa di-scale nanti

##   USER CHARACTER SYSTEM
## (FINAL DESIGN)
##  Konsep:
User punya avatar sendiri → bisa ganti baju → unlock seiring progress

## 里 1. BASE CHARACTER (WAJIB SIMPLE)
 2 pilihan awal:
## ● Laki-laki
## ● Perempuan
 JANGAN beda wajah terlalu jauh
 cukup beda:
● rambut
● sedikit bentuk muka

 Prompt Base Character (SUPER IMPORTANT)
##  Laki-laki:

2D flat illustration, Indonesian elementary school boy avatar, age 8, neutral outfit (plain t-shirt),
front facing, full body, simple shapes, rounded features, big eyes, friendly expression, consistent
character style, no background


##  Perempuan:
2D flat illustration, Indonesian elementary school girl avatar, age 8, neutral outfit (plain t-shirt),
front facing, full body, simple shapes, rounded features, big eyes, friendly expression, consistent
character style, no background


## 易 2. SISTEM CUSTOM OUTFIT (SMART
## VERSION)
⚠ Problem yang kamu bilang:
“assets harus match muka dll”
##  SOLUSI:
JANGAN generate karakter + baju jadi satu

✅ Gunakan sistem:
Layering PNG

##  Struktur:
## Base Character (body)
+ Outfit (PNG transparan)
## = Final Avatar



## 里 Layer:
- Base body (tetap)
## 2. Outfit (ganti-ganti)
## 3. Aksesoris (optional)

##  3. OUTFIT SYSTEM (CORE FEATURE)
 Kategori outfit:
##  Default:
● Kaos polos

 Unlock (Based on Sila):
## Sila Outfit
1 Baju adat Jawa (Bimo style)
## 2 Ulos Batak
## 3 Dayak
## 4 Bugis
## 5 Papua

 Ini genius karena:
● Nyambung ke karakter kamu
● Nyambung ke materi
● Jadi reward system


##  4. PROMPT OUTFIT PNG
## (TRANSPARENT)
## ⚠ Penting:
## Tambahkan:
 “transparent background, outfit only, no character face”

## Contoh:
##  Jawa:
2D flat illustration, traditional Javanese children outfit, batik style, front view, outfit only, no
character, transparent background, simple shapes, consistent style


## 泥 Batak:
2D flat illustration, Batak ulos traditional outfit, front view, outfit only, no character, transparent
background, simple shapes


##  Dayak:
Dayak traditional children outfit, bead accessories, simple version, flat illustration, transparent
background


## 痢 Bugis:
Bugis traditional outfit for children, simple and modest, flat illustration, transparent background


##  Papua:
Papuan traditional children outfit, simple and modest version, flat illustration, transparent
background



## 易 5. SISTEM UNLOCK (GAMIFICATION)
##  Logic:
Selesaikan materi → unlock outfit


## Contoh:
● Sila 1 selesai → unlock outfit Jawa
● Sila 2 selesai → unlock Batak

## ೕ Database:
## {
## "user_id": "123",
## "unlocked_outfits": ["jawa", "batak"],
## "selected_outfit": "jawa"
## }


##  6. UI FLOW (USER)
##  User Experience:
- Masuk ke Profil
## 2. Klik:
 “Ubah Karakter”
## 3. Pilih:
## ○ Laki-laki / Perempuan
- Pilih outfit:
○  terkunci
○ ✅ terbuka

## 5. Klik:
 “Pakai”

## ೕ Developer Notes
## Render:
<img src="base.png" />
<img src="outfit_jawa.png" />

 overlay (position absolute)

##  7. DESIGN RULE (BIAR TIDAK
## BERANTAKAN)
● Semua outfit harus:
○ ukuran sama
○ posisi sama
○ proporsi sama
 kalau tidak:
= bakal “geser-geser” di UI 

##  8. STRATEGI PALING AMAN
## (REKOMENDASI)
Phase 1 (MVP):
● 2 base character
● 3 outfit saja dulu


## Phase 2:
● tambah semua outfit

##  INSIGHT PENTING (JARANG ORANG
## SADAR)
Ini bukan cuma fitur kosmetik:
 ini jadi:
● reward system
● motivasi belajar
● identitas user

##  HASIL AKHIR
Kamu akan punya:
● Avatar system ✔
● Unlock system ✔
● Integrasi ke pembelajaran ✔
 Ini sudah level startup feature, bukan sekadar tugas

## NEXT STEP
Kalau kamu mau kita bisa lanjut ke:
隣 1. Struktur database lengkap (Supabase)

 2. Cara implement layering di Next.js
 3. Generate semua outfit siap pakai

Tinggal bilang:
 “lanjut ke database full”
atau
 “lanjut ke implement avatar UI”
Kita masuk ke tahap engineering 
