-- ==========================================
-- TEMANPANCA SUPABASE INITIAL SCHEMA
-- ==========================================

-- 1. EXTENSION SETUP
create extension if not exists "uuid-ossp";

-- 2. PROFILES TABLE (Extend Auth Users untuk Google Login)
-- Disinkronisasikan otomatis dengan auth.users milik Supabase
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  total_xp integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- 3. SILA TABLE (Pangkalan Sila & Tema)
create table public.silas (
  id integer primary key,
  title text not null,
  subtitle text,
  character_name text,
  character_img text,
  theme_color text
);

alter table public.silas enable row level security;
create policy "Silas readable by everyone" on silas for select using (true);

-- 4. MATERI TABLE (Menyimpan Metadata Pembelajaran & Story Slides)
create table public.materis (
  id text primary key, -- e.g., 's1_m1'
  sila_id integer references public.silas(id),
  order_index integer,
  title text,
  subtitle text,
  icon text,
  content jsonb -- Menyimpan payload slides & pilihan interaksi (JSON)
);

alter table public.materis enable row level security;
create policy "Materis readable by everyone" on materis for select using (true);

-- 5. QUIZ TABLE (Soal-soal Ujian)
create table public.quizzes (
  id uuid default uuid_generate_v4() primary key,
  materi_id text references public.materis(id),
  question text,
  options jsonb, -- Array string pilihan ganda
  answer text,
  explanation text
);

alter table public.quizzes enable row level security;
create policy "Quizzes readable by everyone" on quizzes for select using (true);

-- 6. USER PROGRESS TABLE (Penyimpanan Rapor & Kelulusan)
-- Memastikan tiap anak memiliki progres kuis yang independen!
create table public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  materi_id text references public.materis(id) not null,
  is_completed boolean default false,
  high_score integer default 0,
  last_accessed timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, materi_id) -- Mencegah duplikasi history
);

alter table public.user_progress enable row level security;
create policy "Users can view own progress" on user_progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on user_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on user_progress for update using (auth.uid() = user_id);

-- ==========================================
-- AUTOMATION TRIGGER (GOOGLE OAUTH SYNC)
-- ==========================================
-- Setiap kali ada yang login via Google Auth untuk pertama kalinya, 
-- Fungsi ini akan mencegat dan mendaftarkannya otomatis ke table profiles kita.

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
