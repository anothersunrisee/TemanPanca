-- ============================================================
--  TemanPanca — Full Supabase Schema
--  Run this in Supabase SQL Editor (Dashboard → SQL Editor)
--  Order: extensions → tables → seed data → rls → functions
-- ============================================================

-- ============================================================
-- 0. EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";


-- ============================================================
-- 1. CONTENT TABLES (static data — silas & materis)
-- ============================================================

-- 1a. Silas
create table if not exists public.silas (
  id            int primary key,
  title         text not null,
  subtitle      text,
  character_name text,
  character_theme text,
  character_gender text,
  character_traits text,
  character_img  text,
  intro_text    text,
  theme_color   text default 'amber',
  references_items jsonb default '[]'::jsonb,
  created_at    timestamptz default now()
);

-- Ensure silas table has all required columns
ALTER TABLE public.silas ADD COLUMN IF NOT EXISTS intro_text text;
ALTER TABLE public.silas ADD COLUMN IF NOT EXISTS theme_color text DEFAULT 'amber';
ALTER TABLE public.silas ADD COLUMN IF NOT EXISTS references_items jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.silas ADD COLUMN IF NOT EXISTS subtitle text;
ALTER TABLE public.silas ADD COLUMN IF NOT EXISTS character_name text;
ALTER TABLE public.silas ADD COLUMN IF NOT EXISTS character_theme text;
ALTER TABLE public.silas ADD COLUMN IF NOT EXISTS character_gender text;
ALTER TABLE public.silas ADD COLUMN IF NOT EXISTS character_traits text;
ALTER TABLE public.silas ADD COLUMN IF NOT EXISTS character_img text;



-- 1b. Materis
create table if not exists public.materis (
  id              text primary key,          -- e.g. 's1_m1'
  sila_id         int references public.silas(id) on delete cascade,
  title           text not null,
  subtitle        text,
  icon            text,
  character_name  text,
  character_img_url text,
  illustration_url  text,
  slides          jsonb default '[]'::jsonb,
  interaction     jsonb default '{}'::jsonb,
  quiz            jsonb default '[]'::jsonb,
  created_at      timestamptz default now()
);

-- Ensure materis table has all required columns
ALTER TABLE public.materis ADD COLUMN IF NOT EXISTS subtitle text;
ALTER TABLE public.materis ADD COLUMN IF NOT EXISTS icon text;
ALTER TABLE public.materis ADD COLUMN IF NOT EXISTS character_name text;
ALTER TABLE public.materis ADD COLUMN IF NOT EXISTS character_img_url text;
ALTER TABLE public.materis ADD COLUMN IF NOT EXISTS illustration_url text;
ALTER TABLE public.materis ADD COLUMN IF NOT EXISTS slides jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.materis ADD COLUMN IF NOT EXISTS interaction jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.materis ADD COLUMN IF NOT EXISTS quiz jsonb DEFAULT '[]'::jsonb;



-- ============================================================
-- 2. OUTFIT / SKIN CATALOGUE (static)
-- ============================================================
create table if not exists public.outfits (
  id            text primary key,            -- e.g. 'default', 'jawa', 'batak'
  label         text not null,
  price         int not null default 0,
  gender        text check (gender in ('Laki-laki','Perempuan','Unisex')) default 'Unisex',
  img_url       text,
  description   text,
  coming_soon   boolean default false,
  sort_order    int default 99,
  created_at    timestamptz default now()
);

-- Seed basic default outfit to prevent FK error during user creation
INSERT INTO public.outfits (id, label, price, gender, description)
VALUES ('default', 'Default', 0, 'Unisex', 'Pakaian kasual sehari-hari')
ON CONFLICT (id) DO NOTHING;



-- ============================================================
-- 3. USER TABLES
-- ============================================================

-- 3a. Profiles  (mirrors auth.users, created via trigger)
create table if not exists public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  display_name    text,
  email           text,
  gender          text default 'Laki-laki',   -- 'Laki-laki' | 'Perempuan'
  selected_outfit text references public.outfits(id) on delete set null default 'default',
  avatar_url      text,
  total_points    int not null default 0,      -- cached total (updated by trigger/function)
  spent_points    int not null default 0,      -- points used for purchases
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- Ensure profiles table has all required columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gender text DEFAULT 'Laki-laki';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS selected_outfit text REFERENCES public.outfits(id) ON DELETE SET NULL DEFAULT 'default';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS total_points int NOT NULL DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS spent_points int NOT NULL DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;

-- readable computed column: available_points = total_points - spent_points
-- use this in your queries:  total_points - spent_points as available_points


-- 3b. User Progress (per materi)
create table if not exists public.user_progress (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  materi_id       text not null references public.materis(id) on delete cascade,
  sila_id         int  not null references public.silas(id)   on delete cascade,
  is_completed    boolean not null default false,
  quiz_score      int default 0,          -- e.g. 2 out of 3
  quiz_max        int default 3,
  stars           int default 0           -- 1–3 bintang berdasarkan score
                  check (stars >= 0 and stars <= 3),
  points_earned   int default 0,          -- points dari materi ini
  completed_at    timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  unique (user_id, materi_id)            -- 1 baris per user per materi
);

-- Ensure stars column exists for view
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS stars int default 0 check (stars >= 0 and stars <= 3);

-- Ensure sila_id column exists for compatibility
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS sila_id int not null references public.silas(id) on delete cascade;

-- Ensure points_earned column exists for view
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS points_earned int default 0;


-- 3c. Owned Outfits (purchases)
create table if not exists public.user_outfits (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  outfit_id   text not null references public.outfits(id)  on delete cascade,
  purchased_at timestamptz default now(),
  unique (user_id, outfit_id)
);


-- 3d. Daily Missions
create table if not exists public.missions (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  mission_date  date not null default current_date,
  task_type     text not null,          -- 'complete_materi' | 'perfect_quiz' | 'daily_login' | 'streak'
  task_target   text,                   -- materi_id or null
  is_completed  boolean default false,
  points_reward int default 50,
  completed_at  timestamptz,
  created_at    timestamptz default now(),
  unique (user_id, mission_date, task_type)
);


-- ============================================================
-- 4. VIEWS (handy helpers)
-- ============================================================

-- 4a. Progress per Sila (per user)
create or replace view public.v_progress_per_sila as
select
  up.user_id,
  up.sila_id,
  s.title                                          as sila_title,
  count(*)                                          as total_materi,
  count(*) filter (where up.is_completed = true)    as completed_materi,
  sum(up.stars)                                     as total_stars,
  sum(up.points_earned)                             as points_from_sila,
  round(
    count(*) filter (where up.is_completed = true)::numeric
    / count(*)::numeric * 100
  )                                                 as completion_pct
from public.user_progress up
join public.silas s on s.id = up.sila_id
group by up.user_id, up.sila_id, s.title;


-- 4b. Full leaderboard (optional, for future)
create or replace view public.v_leaderboard as
select
  p.id,
  p.display_name,
  p.gender,
  p.selected_outfit,
  p.total_points,
  p.total_points - p.spent_points as available_points,
  count(up.id) filter (where up.is_completed = true) as materis_completed
from public.profiles p
left join public.user_progress up on up.user_id = p.id
group by p.id, p.display_name, p.gender, p.selected_outfit, p.total_points, p.spent_points
order by p.total_points desc;


-- ============================================================
-- 5. FUNCTIONS & TRIGGERS
-- ============================================================

-- 5a. Auto-create profile on new auth user
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, display_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 5b. Update profiles.total_points whenever user_progress changes
create or replace function public.sync_user_points()
returns trigger language plpgsql security definer as $$
begin
  update public.profiles
  set
    total_points = (
      select coalesce(sum(points_earned), 0)
      from public.user_progress
      where user_id = coalesce(new.user_id, old.user_id)
        and is_completed = true
    ),
    updated_at = now()
  where id = coalesce(new.user_id, old.user_id);
  return new;
end;
$$;

drop trigger if exists trg_sync_points on public.user_progress;
create trigger trg_sync_points
  after insert or update or delete on public.user_progress
  for each row execute procedure public.sync_user_points();


-- 5c. Update profiles.updated_at on any change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();


-- 5d. Helper function: complete a materi and grant points
-- Usage: select complete_materi('<user_id>', 's1_m1', 3, 3);
create or replace function public.complete_materi(
  p_user_id   uuid,
  p_materi_id text,
  p_score     int,    -- soal benar
  p_max       int     -- total soal
)
returns json language plpgsql security definer as $$
declare
  v_stars   int;
  v_points  int;
  v_sila_id int;
begin
  -- determine stars
  if p_score >= p_max then
    v_stars := 3;
  elsif p_score >= ceil(p_max * 0.6) then
    v_stars := 2;
  else
    v_stars := 1;
  end if;

  -- points per materi: 50 base + 50 bonus for perfect
  v_points := 100 + (case when v_stars = 3 then 50 else 0 end);

  -- get sila_id from materi
  select sila_id into v_sila_id from public.materis where id = p_materi_id;

  -- upsert progress
  insert into public.user_progress
    (user_id, materi_id, sila_id, is_completed, quiz_score, quiz_max, stars, points_earned, completed_at)
  values
    (p_user_id, p_materi_id, v_sila_id, true, p_score, p_max, v_stars, v_points, now())
  on conflict (user_id, materi_id) do update set
    is_completed = true,
    quiz_score   = greatest(user_progress.quiz_score, excluded.quiz_score),
    stars        = greatest(user_progress.stars, excluded.stars),
    points_earned = greatest(user_progress.points_earned, excluded.points_earned),
    completed_at = now(),
    updated_at   = now();

  return json_build_object(
    'stars', v_stars,
    'points_earned', v_points,
    'materi_id', p_materi_id
  );
end;
$$;


-- 5e. Helper function: purchase an outfit
-- Usage: select purchase_outfit('<user_id>', 'batak');
create or replace function public.purchase_outfit(
  p_user_id  uuid,
  p_outfit_id text
)
returns json language plpgsql security definer as $$
declare
  v_price         int;
  v_available     int;
  v_already_owned boolean;
begin
  select price into v_price from public.outfits where id = p_outfit_id;
  if not found then
    return json_build_object('success', false, 'error', 'Outfit not found');
  end if;

  select exists(
    select 1 from public.user_outfits
    where user_id = p_user_id and outfit_id = p_outfit_id
  ) into v_already_owned;

  if v_already_owned then
    return json_build_object('success', false, 'error', 'Already owned');
  end if;

  select (total_points - spent_points) into v_available
  from public.profiles where id = p_user_id;

  if v_available < v_price then
    return json_build_object('success', false, 'error', 'Insufficient points', 'available', v_available, 'needed', v_price);
  end if;

  -- deduct points
  update public.profiles set spent_points = spent_points + v_price where id = p_user_id;

  -- record ownership
  insert into public.user_outfits (user_id, outfit_id)
  values (p_user_id, p_outfit_id)
  on conflict do nothing;

  return json_build_object('success', true, 'outfit_id', p_outfit_id, 'cost', v_price);
end;
$$;


-- ============================================================
-- 6. ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS
alter table public.profiles      enable row level security;
alter table public.user_progress  enable row level security;
alter table public.user_outfits   enable row level security;
alter table public.missions       enable row level security;
-- Content tables are public-read
alter table public.silas   enable row level security;
alter table public.materis  enable row level security;
alter table public.outfits  enable row level security;

-- silas: public read
drop policy if exists "silas_public_read" on public.silas;
create policy "silas_public_read" on public.silas
  for select using (true);

-- materis: public read
drop policy if exists "materis_public_read" on public.materis;
create policy "materis_public_read" on public.materis
  for select using (true);

-- outfits: public read
drop policy if exists "outfits_public_read" on public.outfits;
create policy "outfits_public_read" on public.outfits
  for select using (true);

-- profiles: users can read/update only their own row
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- user_progress: own rows only
drop policy if exists "progress_select_own" on public.user_progress;
create policy "progress_select_own" on public.user_progress
  for select using (auth.uid() = user_id);

drop policy if exists "progress_insert_own" on public.user_progress;
create policy "progress_insert_own" on public.user_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.user_progress;
create policy "progress_update_own" on public.user_progress
  for update using (auth.uid() = user_id);

-- user_outfits: own rows only
drop policy if exists "outfits_select_own" on public.user_outfits;
create policy "outfits_select_own" on public.user_outfits
  for select using (auth.uid() = user_id);

drop policy if exists "outfits_insert_own" on public.user_outfits;
create policy "outfits_insert_own" on public.user_outfits
  for insert with check (auth.uid() = user_id);

-- missions: own rows only
drop policy if exists "missions_select_own" on public.missions;
create policy "missions_select_own" on public.missions
  for select using (auth.uid() = user_id);

drop policy if exists "missions_insert_own" on public.missions;
create policy "missions_insert_own" on public.missions
  for insert with check (auth.uid() = user_id);

drop policy if exists "missions_update_own" on public.missions;
create policy "missions_update_own" on public.missions
  for update using (auth.uid() = user_id);


-- ============================================================
-- 7. SEED — OUTFITS CATALOGUE
-- ============================================================
insert into public.outfits (id, label, price, gender, img_url, description, coming_soon, sort_order) values
  ('default', 'Default', 0, 'Unisex',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuB108fhDPKMlX6NaK45QU5lPm2jIBSUDw2Tra2Szz_9aMhXkLiUqzehtOYSkbKS_9_eIQQl7L3IKH46NoGLI5kXRCEK847DivkJUKV3UxMYwspwxN519G_1SzLZyJila3ROxMus1ajUye2Iu9sZdXPIfzXRh_OjiGA0Ctvh91d4YU0P5maHC5GOWDvXpT4fTt-Et_EaAU8RTThyAuCbHjfEhW1Q-k5WpcNC_iYIGvbgp6DwkP4emrGuLtSPRBUAR09RbXSMU1pe_Js',
   'Pakaian kasual sehari-hari yang nyaman dipakai belajar dan bermain.', false, 1),

  ('jawa', 'Jawa', 0, 'Unisex',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuCdZsFogf_0lq2gFhOLT1Pg5TR9h4o91xKQtqItgpOLS8nFCyV9EzIMEaB7shwcCeA48XRAWhLTG9UmW9d1RHzufauqsPxxClapTDseMwD-D6G-wb_OT5ImbZJAUeqiKwhNDq8I568vGpo8wYOQyJyvHwB9MwU9IwO3ywg6HaMa1fgB03tIWCagxiNq7-NQeU07K3C63tCjtc6nWnwzlYmMJGp8PMdeDeWYs5XYwnJuK4ApYYZA9OurWES9Hzg9mNRasjCZHZlhdB4',
   'Baju adat Jawa yang elegan dengan sentuhan kain Batik asli yang mendunia.', false, 2),

  ('batak', 'Batak', 300, 'Unisex',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuBe5xGT6N9rkRSupO1U9KE-XEauDo_J0bLNurGV61XT3Hlhc_7pj6mSAVS47U6q_DaE-opeUC6cTCIFUQlyDwPtV6784OAa-B3XyxSNTJHO1K9GX6ic9GzUswQvXHHXlHX-0wA2ZYnPTKxTDsQqnlU4AxZSOSAVFqYcKxD0EAoRWWh5UmLnq3gsaHLiN6z8PzwpkRBaiKaKIBO7z4UMpzAGmMG9rGCDPqhtYjD15G02OESem7-E2jAg5Kx6AN3UWVdA8qCTfg2xsRM',
   'Pakaian berbalut kain Ulos khas Sumatera Utara. Simbol ikatan dan perlindungan yang kuat!', false, 3),

  ('dayak', 'Dayak', 450, 'Unisex',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuCTlcd3cqx0yBlKErwvz8tZ98lAC5Ay8IWAjgTWnlg6Ucnj-ym_0hGLaqcgiRHtZDzyL_1vdOQLCG7n1mr-dZcDLrxCT7ERWExgRJPjmuYOCreyvE3pxa8t26Ku9qYCtEoxheu1NsAuaHf_ar8-O9Ay8Lg77p72mtgWf7IzIGtYWtIr54gWNM7tWN5IBLlYF_3v2dsFwZ_M0eBZphLThKN0rln9W4fEH0gxvG9kL-GXg1lI75PNKSveS3ZIalsjpZumFwvA6_t2aZc',
   'Baju adat dari Kalimantan yang dilengkapi ornamen bulu burung enggang yang legendaris.', false, 4),

  ('bugis', 'Bugis', 300, 'Unisex',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuDLTyeYNrZUUVFZiZM0ReFztc_cKBFWpy55gw2eY6sszWHm8Rkz7muvItlxCi_z8DvFx2aaKN7Lgqye6OCl_j3b0yNM66kVw5Uz5Aw9tt6qaTW9uXVwx7Y7LeMhot5azutjzjjDBsiIJp0gnu-JOjdWOrok1jrcjNb5tgxYUUm4NEN9o0NMNcv6msbImQQRwE45Dfsl9Bl4BS7UVfy6hWWcNpNtocGqflf-v9yJMdNcMiczzbgHnTwUIUrUuZs6FsysJSeXIIrrcVk',
   'Pakaian tradisional tertua dari Sulawesi Selatan yang memancarkan pesona kebudayaan maritim Bugis.', false, 5),

  ('papua', 'Papua', 600, 'Unisex',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuAsThHe39Ev_bSq1n_qBPF1lvuTXIX6ji5TfGuU_vJjAYajt9Plr29YQcmWVeXp8-NVLasPamZwgZ66ZbP1-d5bPyoxGAlrJ2n5rt-ECWYHJWX-jsverjkev4hCs_7uP2B-tVH_TrUsMlZHWMKXBSp0shrRjt4HAT0C19RqGIV4DNh0IZfgjD151Lrr-JJjS4wFs7z6RUcPvNALg_s125owne2JDN4vXyqiewEQ6MVTqt73X8glfD0paNZi4vBw7CswEcKHExyqFSM',
   'Pakaian asli bumi Cendrawasih dengan dekorasi alami. Tampil sangat berani dan mencintai alam!', false, 6),

  ('bali', 'Bali', 800, 'Unisex', null,
   'Segera hadir membawa eksotisme pulau Dewata ke ujung jarimu.', true, 7),

  ('minang', 'Minang', 900, 'Unisex', null,
   'Segera hadir dengan kemegahan budaya Minangkabau yang memukau.', true, 8)

on conflict (id) do update set
  label       = excluded.label,
  price       = excluded.price,
  img_url     = excluded.img_url,
  description = excluded.description,
  coming_soon = excluded.coming_soon,
  sort_order  = excluded.sort_order;


-- ============================================================
-- 8. SEED — SILAS
-- ============================================================
insert into public.silas (id, title, subtitle, character_name, character_theme, character_gender, character_traits, character_img, intro_text, theme_color, references_items) values
  (1, 'Ketuhanan Yang Maha Esa', 'Mari belajar tentang nilai Ketuhanan', 'Bimo', 'Budaya Jawa', 'Laki-laki', 'Bijaksana, suka menolong',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuCxWYpwcirKnfkZTbbTpHNInBWsqlznegKBU6ERJOExDqif1xUlwqwUWzGhCXeM85XwQHjh19IZ7H0p-1NvLP5zKk7qjKiCBoUxIDt3nzKgulnO1lGDz1n3AXIl9dnEX5IVB9NM_FMv5rRwymQpaPJ9b_O893b2ikA1UTNuX1sGLP7R-aekEC2GvamwStySLm0ZxAZr_NUcCckD4lALQFZnnTEe9RvdK6XQl2mUgQ2AbyahyfeipRBEiOgFWOPdaRfK8QT8M3QkxEk',
   'Yuk belajar nilai-nilai agamis bersama Bimo yang bijaksana!', 'amber',
   '["Buku Tematik SD Kelas 1 Tema 6: Lingkungan Bersih, Sehat, dan Asri","Buku Pendidikan Agama (umum lintas agama – nilai dasar)","Nilai karakter religius (Kemendikbud)"]'::jsonb),

  (2, 'Kemanusiaan yang Adil dan Beradab', 'Belajar peduli pada sesama', 'Siregar', 'Budaya Batak', 'Laki-laki', 'Tegas, jujur',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuAe6PLCvdhY25YiBaOoP0UU35zHclS9Sq8JYLfy-VFB4azsx7JTMnEL-MYsclT-SXu7YVwAzcdn3dIMCC_WeWsRqyeqPP2LqID3GZSunSveKQnq89YAIyKVw1P-aS1MdJz9gnNVtFApd90yE6UEq4JDaq4KVGiZwBr_df-FCUeR5bMU55iQ8CpHvgY5W8Lccw9Oq6U_AcPoZ5vEy_KDobi08JOe7nxBzwy1zeGRrbg17PnELohRerQunuMKnda8jn6jDmS0KnSniTA',
   'Yuk saling menolong bersama Siregar yang jujur!', 'amber',
   '["Buku Tematik SD Kelas 2 – Hidup Rukun","Nilai Pancasila Sila 2 (adil, berbagi & empati)","Buku PPKn SD Kelas 1–2","Kemendikbud – Penguatan Pendidikan Karakter","Program SEL (Social Emotional Learning) dasar anak"]'::jsonb),

  (3, 'Persatuan Indonesia', 'Bersatu kita teguh, berpecah kita runtuh', 'Sinta / Leha', 'Budaya Dayak', 'Perempuan', 'Ramah, peduli',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuDB3yBKAM3nv7-mp5OkCr8pU3OoDCvc4EyeMkU_sfhb392LfsAhzdCH1z1mUYHlqU-pkarvW9LJpx10oVPOY4oSvWuXwa-yHBgn09CsBmD-46Db5F-H6PYR_6TDdJppEqCnEf0r7daRinbRw0Wx83jxpy9xgE96kRxjWmOa-BmDI2_15Gf6l_Hq4wTa8BJ7OyYMv3e6Jw6j1MM2KWvel3F7NfW8CrMhqsewVoEUrU5jQmICr9PC6r7Lgd-GPvtE-jzJ2Ze7JyX8YDU',
   'Ayo belajar persatuan bersama Sinta / Leha yang ramah!', 'amber',
   '["Buku Tematik SD Kelas 1 – Hidup Rukun","Nilai Pancasila Sila 3 (persatuan & kebersamaan)","Buku PPKn SD – Gotong Royong","Nilai budaya Indonesia (kolektivitas & sosial)","Kemendikbud – Cinta Tanah Air"]'::jsonb),

  (4, 'Kerakyatan yang Dipimpin oleh Hikmat', 'Belajar bermusyawarah dan menghargai pendapat', 'Passa', 'Budaya Bugis / Makassar', 'Laki-laki', 'Bijak, suka bermusyawarah',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuB7lvoESQHpoJDRChWSPgGcvpsyDpYD3rnUyOIYlTGLGBmCUt49vXxut5clZvFU6OA02qIQLalLDGkv0Q2coawNuqd4meopK-USK28EGFvK9X1GT_iGg0megL7PWDr1-UoyN5byyWO8TCP649Z9drZ--k8_4sDG4wCwyF0lJnZRMk2fGW61syVOj4N-nTvzhRYGnt2xavvKiA5Zr1z6R4agFShwce3__t6KnAaaGC8GmeDWtXIyjhBbRkw25RwjfTPavtjjSA4UhYo',
   'Ayo belajar musyawarah bersama Passa!', 'amber',
   '["Buku PPKn SD – Demokrasi sederhana","Nilai Pancasila Sila 4 (musyawarah mufakat)","Kemendikbud – Pendidikan karakter demokratis","Konsep dasar demokrasi anak (voting sederhana)"]'::jsonb),

  (5, 'Keadilan Sosial bagi Seluruh Rakyat', 'Belajar bersikap adil dan bertanggung jawab', 'Aruya', 'Budaya Papua', 'Perempuan', 'Ceria, adil',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuBaLFfFGf6bGRZ_LEnFjaeQ8BGKkKg5Rbq095H8Oa7tmR5R__Fzxa6d6EXL0oi4y55_-QZsTkgWoMNKGImlm5olJm-pMyR2by5eLASS7mj67jGOYf2dbnoMIr-MWaQfODxVEZDRtBOV7JCANpyxX46XppO-_t2nL-S9MdI3kLeNFLiY3SLY6-LsnhD0q9sHEk00vcD6fF0n9RBL9H7IafKDIwVJJcUIwa08rBbq7xcZA__Yi7T3IwkJKp9c6rIfqlaRBi62RraW_jY',
   'Ayo belajar keadilan bersama Aruya yang ceria!', 'amber',
   '["Buku Tematik SD – Kebersamaan & Keadilan","Nilai Pancasila Sila 5 (keadilan sosial)","Buku PPKn SD – Hak dan Kewajiban","Nilai karakter disiplin & tanggung jawab","Pancasila Sila 5 (keadilan melalui keteraturan sosial)"]'::jsonb)

on conflict (id) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  character_name = excluded.character_name,
  character_theme = excluded.character_theme,
  character_gender = excluded.character_gender,
  character_traits = excluded.character_traits,
  character_img = excluded.character_img,
  intro_text = excluded.intro_text,
  references_items = excluded.references_items;


-- ============================================================
-- 9. SEED — MATERIS (all 15)
-- ============================================================
insert into public.materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) values

-- SILA 1
('s1_m1', 1, 'Berdoa sebelum belajar', 'Mengenal kebiasaan religius', 'BookOpen', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Halo! Aku Bimo 😊 Sebelum belajar, aku selalu melakukan sesuatu dulu loh!"},{"type":"story","text":"Aku berdoa agar belajar jadi lancar dan mudah dipahami."},{"type":"info","text":"Berdoa adalah cara kita berbicara kepada Tuhan."},{"type":"context","text":"Kita bisa berdoa di rumah, di sekolah, atau di mana saja."},{"type":"value","text":"Berdoa membuat hati kita tenang dan siap belajar 🙏"}]'::jsonb,
 '{"question":"Apa yang kamu lakukan sebelum belajar?","options":[{"text":"Berdoa","isCorrect":true,"feedback":"Hebat! Berdoa adalah kebiasaan baik 🙏"},{"text":"Langsung bermain","isCorrect":false,"feedback":"Coba lagi ya 😊 Sebelum belajar, kita sebaiknya berdoa dulu."}]}'::jsonb,
 '[{"question":"Apa yang dilakukan sebelum belajar?","options":["Berdoa","Bermain","Tidur"],"answer":"Berdoa","explanation":"Berdoa membantu kita memulai belajar dengan baik."},{"question":"Kenapa kita berdoa sebelum belajar?","options":["Agar belajar lancar","Agar cepat pulang","Agar tidak belajar"],"answer":"Agar belajar lancar","explanation":"Berdoa membantu kita fokus dan tenang."},{"question":"Berdoa adalah kebiasaan...","options":["Baik","Buruk","Tidak penting"],"answer":"Baik","explanation":"Berdoa adalah kebiasaan baik yang diajarkan sejak kecil."}]'::jsonb),

('s1_m2', 1, 'Menghormati teman berbeda agama', 'Sikap toleransi antar agama', 'Users', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Di sekolah, teman-teman punya agama yang berbeda-beda."},{"type":"story","text":"Walaupun berbeda, kita tetap bisa bermain bersama 😊"},{"type":"info","text":"Menghormati agama lain disebut sikap toleransi."},{"type":"warning","text":"Kita tidak boleh mengejek cara ibadah orang lain."},{"type":"value","text":"Kalau kita saling menghormati, kita bisa hidup rukun 🤝"}]'::jsonb,
 '{"question":"Temanmu berbeda agama, apa yang kamu lakukan?","options":[{"text":"Menghormati","isCorrect":true,"feedback":"Hebat! Kita harus saling menghargai 🤝"},{"text":"Mengejek","isCorrect":false,"feedback":"Tidak boleh ya 😊 Kita harus saling menghormati."}]}'::jsonb,
 '[{"question":"Apa itu toleransi?","options":["Menghormati perbedaan","Memilih teman","Bertengkar"],"answer":"Menghormati perbedaan","explanation":"Toleransi berarti menghormati perbedaan orang lain."},{"question":"Bolehkah mengejek agama lain?","options":["Tidak","Boleh","Kadang boleh"],"answer":"Tidak","explanation":"Mengejek agama lain adalah sikap yang tidak baik."},{"question":"Teman berbeda agama harus...","options":["Dihormati","Dijauhi","Diejek"],"answer":"Dihormati","explanation":"Kita harus menghormati semua teman."}]'::jsonb),

('s1_m3', 1, 'Rajin beribadah', 'Mendekatkan diri pada Tuhan', 'Heart', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Setiap orang punya cara beribadah sesuai agamanya."},{"type":"info","text":"Ibadah adalah kegiatan kita mendekatkan diri kepada Tuhan."},{"type":"example","text":"Contohnya: berdoa, ke tempat ibadah, atau membaca kitab suci."},{"type":"value","text":"Kita harus rajin beribadah agar menjadi anak yang baik."},{"type":"closing","text":"Dengan ibadah, kita belajar menjadi lebih sabar dan baik 💛"}]'::jsonb,
 '{"question":"Apa yang harus kita lakukan tentang ibadah?","options":[{"text":"Rajin beribadah","isCorrect":true,"feedback":"Hebat! Rajin ibadah membuat kita jadi lebih baik 💛"},{"text":"Malas ibadah","isCorrect":false,"feedback":"Yuk semangat 😊 Ibadah itu penting."}]}'::jsonb,
 '[{"question":"Apa itu ibadah?","options":["Kegiatan mendekatkan diri kepada Tuhan","Bermain","Tidur"],"answer":"Kegiatan mendekatkan diri kepada Tuhan","explanation":"Ibadah adalah cara kita berhubungan dengan Tuhan."},{"question":"Haruskah kita rajin ibadah?","options":["Ya","Tidak","Kadang saja"],"answer":"Ya","explanation":"Rajin ibadah membuat kita menjadi pribadi yang baik."},{"question":"Ibadah membuat kita...","options":["Lebih baik","Lebih malas","Tidak berubah"],"answer":"Lebih baik","explanation":"Ibadah membantu kita menjadi lebih sabar dan baik."}]'::jsonb),

-- SILA 2
('s2_m4', 2, 'Berbagi itu adil', 'Mengenal sikap adil dan berbagi', 'Gift', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Bimo punya 2 permen 🍬🍬"},{"type":"story","text":"Temannya tidak punya permen."},{"type":"action","text":"Bimo membagi permennya kepada temannya."},{"type":"info","text":"Berbagi adalah salah satu contoh sikap adil."},{"type":"value","text":"Kalau kita punya lebih, kita bisa berbagi 😊"}]'::jsonb,
 '{"question":"Jika kamu punya lebih, apa yang kamu lakukan?","options":[{"text":"Berbagi","isCorrect":true,"feedback":"Hebat! Berbagi adalah sikap adil 😊"},{"text":"Menghabiskan sendiri","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus berbagi dengan teman."}]}'::jsonb,
 '[{"question":"Apa itu sikap adil?","options":["Tidak pilih kasih","Memilih teman","Tidak peduli"],"answer":"Tidak pilih kasih","explanation":"Adil berarti memperlakukan semua orang dengan sama."},{"question":"Jika kita punya lebih, sebaiknya...","options":["Berbagi","Disimpan sendiri","Dibuang"],"answer":"Berbagi","explanation":"Berbagi adalah sikap baik dan adil."},{"question":"Berbagi adalah sikap...","options":["Baik","Buruk","Tidak penting"],"answer":"Baik","explanation":"Berbagi menunjukkan kita peduli kepada orang lain."}]'::jsonb),

('s2_m5', 2, 'Suka menolong', 'Sikap tolong menolong sesama', 'HandHeart', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Temanmu jatuh saat bermain 😢"},{"type":"story","text":"Ia terlihat kesakitan dan butuh bantuan."},{"type":"action","text":"Kamu bisa menolong dan membantu temanmu."},{"type":"info","text":"Tolong menolong adalah sikap saling membantu."},{"type":"value","text":"Menolong orang lain adalah perbuatan mulia 🤝"}]'::jsonb,
 '{"question":"Apa yang kamu lakukan jika temanmu jatuh?","options":[{"text":"Membantu","isCorrect":true,"feedback":"Hebat! Menolong adalah sikap baik 🤝"},{"text":"Diam saja","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus membantu teman."}]}'::jsonb,
 '[{"question":"Apa itu tolong menolong?","options":["Membantu orang lain","Bermain sendiri","Tidak peduli"],"answer":"Membantu orang lain","explanation":"Tolong menolong berarti saling membantu."},{"question":"Kapan kita harus membantu?","options":["Saat dibutuhkan","Saat ingin saja","Tidak perlu"],"answer":"Saat dibutuhkan","explanation":"Kita membantu ketika orang lain membutuhkan bantuan."},{"question":"Menolong adalah sikap...","options":["Baik","Buruk","Biasa saja"],"answer":"Baik","explanation":"Menolong membuat kita menjadi anak yang baik."}]'::jsonb),

('s2_m6', 2, 'Belajar empati', 'Peduli terhadap perasaan orang lain', 'Heart', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Temanmu terlihat sedih 😢"},{"type":"story","text":"Ia butuh perhatian dan teman untuk berbicara."},{"type":"action","text":"Kamu bisa menghibur dan menemani temanmu."},{"type":"info","text":"Empati adalah memahami perasaan orang lain."},{"type":"value","text":"Dengan empati, kita jadi anak yang peduli 💛"}]'::jsonb,
 '{"question":"Jika temanmu sedih, apa yang kamu lakukan?","options":[{"text":"Menghibur","isCorrect":true,"feedback":"Hebat! Kamu anak yang peduli 💛"},{"text":"Mengejek","isCorrect":false,"feedback":"Tidak boleh ya 😊 Kita harus saling peduli."}]}'::jsonb,
 '[{"question":"Apa itu empati?","options":["Memahami perasaan orang lain","Tidak peduli","Menertawakan teman"],"answer":"Memahami perasaan orang lain","explanation":"Empati berarti kita memahami perasaan orang lain."},{"question":"Saat teman sedih kita harus...","options":["Menghibur","Mengejek","Diam saja"],"answer":"Menghibur","explanation":"Menghibur membuat teman merasa lebih baik."},{"question":"Empati adalah sikap...","options":["Peduli","Jahat","Acuh"],"answer":"Peduli","explanation":"Empati menunjukkan kita peduli kepada orang lain."}]'::jsonb),

-- SILA 3
('s3_m7', 3, 'Bermain bersama', 'Belajar hidup rukun bersama teman', 'Users', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Teman-teman bermain bersama di halaman sekolah 😊"},{"type":"warning","text":"Kita tidak boleh memilih-milih teman."},{"type":"info","text":"Persatuan berarti bersama-sama tanpa membeda-bedakan."},{"type":"action","text":"Semua teman ikut bermain dengan rukun."},{"type":"value","text":"Bersama itu menyenangkan! 🤝"}]'::jsonb,
 '{"question":"Saat bermain, apa yang harus kita lakukan?","options":[{"text":"Bermain bersama","isCorrect":true,"feedback":"Hebat! Bermain bersama membuat kita rukun 🤝"},{"text":"Memilih teman","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita tidak boleh memilih teman."}]}'::jsonb,
 '[{"question":"Apa itu persatuan?","options":["Bersama-sama","Bermain sendiri","Bertengkar"],"answer":"Bersama-sama","explanation":"Persatuan berarti hidup bersama dengan rukun."},{"question":"Bolehkah memilih teman?","options":["Tidak","Boleh","Kadang boleh"],"answer":"Tidak","explanation":"Kita harus berteman dengan semua orang."},{"question":"Bermain bersama membuat kita...","options":["Rukun","Bertengkar","Sendiri"],"answer":"Rukun","explanation":"Kebersamaan membuat kita hidup rukun."}]'::jsonb),

('s3_m8', 3, 'Kerjasama dan gotong royong', 'Bekerja bersama untuk tujuan yang sama', 'Handshake', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Kelas terlihat kotor setelah kegiatan belajar 😟"},{"type":"action","text":"Semua siswa bekerja sama membersihkan kelas."},{"type":"result","text":"Kelas menjadi bersih dan nyaman kembali."},{"type":"info","text":"Kerjasama adalah bekerja bersama untuk tujuan yang sama."},{"type":"value","text":"Dengan gotong royong, pekerjaan jadi ringan 💪"}]'::jsonb,
 '{"question":"Apa yang kamu lakukan saat kelas kotor?","options":[{"text":"Ikut membantu","isCorrect":true,"feedback":"Hebat! Kerjasama membuat pekerjaan lebih ringan 💪"},{"text":"Diam saja","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus ikut membantu."}]}'::jsonb,
 '[{"question":"Apa itu kerjasama?","options":["Bekerja bersama","Bekerja sendiri","Tidak bekerja"],"answer":"Bekerja bersama","explanation":"Kerjasama berarti melakukan sesuatu bersama-sama."},{"question":"Kerjasama membuat pekerjaan menjadi...","options":["Ringan","Berat","Sulit"],"answer":"Ringan","explanation":"Dengan kerjasama, pekerjaan terasa lebih mudah."},{"question":"Gotong royong adalah...","options":["Kerjasama","Permainan","Istirahat"],"answer":"Kerjasama","explanation":"Gotong royong adalah bentuk kerjasama dalam masyarakat."}]'::jsonb),

('s3_m9', 3, 'Cinta Indonesia', 'Bangga dan menjaga budaya bangsa', 'Flag', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Indonesia memiliki banyak budaya yang indah 🇮🇩"},{"type":"example","text":"Seperti tarian, pakaian adat, dan bahasa daerah."},{"type":"info","text":"Kita harus bangga menjadi anak Indonesia."},{"type":"action","text":"Menjaga budaya adalah tanggung jawab kita."},{"type":"value","text":"Aku cinta Indonesia! ❤️🇮🇩"}]'::jsonb,
 '{"question":"Bagaimana sikap kita terhadap Indonesia?","options":[{"text":"Bangga","isCorrect":true,"feedback":"Hebat! Kita harus bangga menjadi anak Indonesia 🇮🇩"},{"text":"Tidak peduli","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus mencintai Indonesia."}]}'::jsonb,
 '[{"question":"Apa itu cinta Indonesia?","options":["Bangga pada negara","Tidak peduli","Meninggalkan budaya"],"answer":"Bangga pada negara","explanation":"Cinta Indonesia berarti bangga dan menjaga negara kita."},{"question":"Budaya Indonesia harus...","options":["Dijaga","Dilupakan","Dibuang"],"answer":"Dijaga","explanation":"Budaya adalah kekayaan bangsa yang harus dijaga."},{"question":"Kita adalah warga...","options":["Indonesia","Negara lain","Tidak punya negara"],"answer":"Indonesia","explanation":"Kita adalah warga negara Indonesia."}]'::jsonb),

-- SILA 4
('s4_m10', 4, 'Musyawarah bersama', 'Berdiskusi untuk mencari kesepakatan', 'MessageSquare', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Teman-teman ingin memilih ketua kelas 😊"},{"type":"action","text":"Mereka berdiskusi bersama untuk menentukan pilihan."},{"type":"info","text":"Dalam musyawarah, semua orang boleh berbicara."},{"type":"value","text":"Kita harus mendengarkan pendapat teman."},{"type":"closing","text":"Musyawarah itu penting untuk mencapai kesepakatan 🤝"}]'::jsonb,
 '{"question":"Saat musyawarah, apa yang harus kamu lakukan?","options":[{"text":"Ikut diskusi","isCorrect":true,"feedback":"Hebat! Musyawarah butuh partisipasi semua orang 🤝"},{"text":"Diam saja","isCorrect":false,"feedback":"Coba lagi ya 😊 Kamu boleh menyampaikan pendapat."}]}'::jsonb,
 '[{"question":"Apa itu musyawarah?","options":["Diskusi bersama","Bermain","Bertengkar"],"answer":"Diskusi bersama","explanation":"Musyawarah adalah berdiskusi bersama untuk mencari solusi."},{"question":"Dalam musyawarah semua orang boleh...","options":["Berpendapat","Diam saja","Pergi"],"answer":"Berpendapat","explanation":"Semua orang berhak menyampaikan pendapat."},{"question":"Musyawarah dilakukan untuk...","options":["Mencari keputusan","Bertengkar","Bermain"],"answer":"Mencari keputusan","explanation":"Musyawarah membantu mencapai keputusan bersama."}]'::jsonb),

('s4_m11', 4, 'Menghargai pendapat teman', 'Mendengarkan dan menghormati pendapat teman', 'Ear', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Temanmu sedang menyampaikan pendapatnya 😊"},{"type":"action","text":"Kamu mendengarkan dengan baik."},{"type":"warning","text":"Kita tidak boleh memotong pembicaraan."},{"type":"info","text":"Menghargai berarti menghormati pendapat orang lain."},{"type":"value","text":"Dengan menghargai, kita bisa hidup rukun 🤝"}]'::jsonb,
 '{"question":"Apa yang kamu lakukan saat teman berbicara?","options":[{"text":"Mendengarkan","isCorrect":true,"feedback":"Hebat! Mendengarkan adalah sikap menghargai 🤝"},{"text":"Mengejek","isCorrect":false,"feedback":"Tidak boleh ya 😊 Kita harus menghargai teman."}]}'::jsonb,
 '[{"question":"Apa itu menghargai?","options":["Menghormati","Mengejek","Mengabaikan"],"answer":"Menghormati","explanation":"Menghargai berarti menghormati orang lain."},{"question":"Saat teman bicara kita harus...","options":["Mendengar","Memotong","Pergi"],"answer":"Mendengar","explanation":"Mendengarkan adalah bentuk menghargai."},{"question":"Mengejek teman adalah sikap...","options":["Salah","Benar","Biasa saja"],"answer":"Salah","explanation":"Mengejek adalah perilaku yang tidak baik."}]'::jsonb),

('s4_m12', 4, 'Memilih dengan voting', 'Cara adil dalam pengambilan keputusan', 'Vote', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Kelas ingin memilih permainan yang akan dimainkan 🎲"},{"type":"action","text":"Mereka melakukan voting untuk menentukan pilihan."},{"type":"result","text":"Pilihan dengan suara terbanyak menjadi keputusan."},{"type":"info","text":"Voting adalah cara memilih secara bersama."},{"type":"value","text":"Voting adalah cara yang adil untuk menentukan pilihan 👍"}]'::jsonb,
 '{"question":"Apa yang kamu lakukan saat voting?","options":[{"text":"Ikut voting","isCorrect":true,"feedback":"Hebat! Voting butuh partisipasi semua orang 👍"},{"text":"Memaksa pilihan","isCorrect":false,"feedback":"Tidak boleh ya 😊 Kita harus mengikuti aturan."}]}'::jsonb,
 '[{"question":"Apa itu voting?","options":["Memilih bersama","Bermain","Diam saja"],"answer":"Memilih bersama","explanation":"Voting adalah cara memilih secara bersama."},{"question":"Hasil terbanyak berarti...","options":["Dipilih","Ditolak","Diulang"],"answer":"Dipilih","explanation":"Pilihan dengan suara terbanyak menjadi keputusan."},{"question":"Voting adalah cara yang...","options":["Adil","Curang","Tidak penting"],"answer":"Adil","explanation":"Voting memberi kesempatan yang sama untuk semua orang."}]'::jsonb),

-- SILA 5
('s5_m13', 5, 'Berbagi dengan adil', 'Membagi sama rata tanpa pilih kasih', 'Scale', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Ada 3 teman dan 3 kue 🍰"},{"type":"action","text":"Setiap anak mendapat 1 kue."},{"type":"result","text":"Semua mendapatkan bagian yang sama."},{"type":"info","text":"Adil berarti membagi sama rata."},{"type":"value","text":"Adil itu tidak pilih kasih 😊"}]'::jsonb,
 '{"question":"Bagaimana cara membagi dengan adil?","options":[{"text":"Dibagi sama rata","isCorrect":true,"feedback":"Hebat! Itu adalah sikap adil 😊"},{"text":"Diambil sendiri","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus berbagi dengan adil."}]}'::jsonb,
 '[{"question":"Apa itu adil?","options":["Sama rata","Memilih teman","Tidak peduli"],"answer":"Sama rata","explanation":"Adil berarti semua mendapat bagian yang sama."},{"question":"Berbagi harus dilakukan dengan cara...","options":["Adil","Sembarangan","Tidak perlu"],"answer":"Adil","explanation":"Berbagi harus dilakukan secara adil."},{"question":"Adil berarti...","options":["Tidak pilih kasih","Memilih teman","Mementingkan diri sendiri"],"answer":"Tidak pilih kasih","explanation":"Adil berarti tidak membedakan orang lain."}]'::jsonb),

('s5_m14', 5, 'Hak dan kewajiban', 'Keseimbangan hak dan tanggung jawab', 'Scale', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"info","text":"Hak adalah sesuatu yang kita dapatkan."},{"type":"example","text":"Contohnya: mendapat belajar di sekolah 📚"},{"type":"info","text":"Kewajiban adalah sesuatu yang harus kita lakukan."},{"type":"example","text":"Contohnya: belajar dengan baik."},{"type":"value","text":"Hak dan kewajiban harus seimbang ⚖️"}]'::jsonb,
 '{"question":"Apa yang harus kamu lakukan sebagai siswa?","options":[{"text":"Belajar","isCorrect":true,"feedback":"Hebat! Itu adalah kewajibanmu 📚"},{"text":"Malas","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus rajin belajar."}]}'::jsonb,
 '[{"question":"Apa itu hak?","options":["Sesuatu yang kita dapatkan","Sesuatu yang kita hindari","Sesuatu yang tidak penting"],"answer":"Sesuatu yang kita dapatkan","explanation":"Hak adalah sesuatu yang menjadi milik kita."},{"question":"Apa itu kewajiban?","options":["Sesuatu yang harus dilakukan","Sesuatu yang diabaikan","Sesuatu yang tidak perlu"],"answer":"Sesuatu yang harus dilakukan","explanation":"Kewajiban harus kita lakukan dengan tanggung jawab."},{"question":"Hak dan kewajiban harus...","options":["Seimbang","Diabaikan","Dipilih salah satu"],"answer":"Seimbang","explanation":"Hak dan kewajiban harus berjalan bersama."}]'::jsonb),

('s5_m15', 5, 'Disiplin itu penting', 'Taat aturan dan tepat waktu', 'Clock', 'Bimo',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A',
 '[{"type":"story","text":"Sekolah memiliki aturan yang harus dipatuhi."},{"type":"info","text":"Disiplin berarti taat pada aturan."},{"type":"example","text":"Contohnya: datang tepat waktu ke sekolah ⏰"},{"type":"warning","text":"Melanggar aturan adalah sikap tidak baik."},{"type":"value","text":"Disiplin membuat kita menjadi anak yang bertanggung jawab 👍"}]'::jsonb,
 '{"question":"Apa yang kamu lakukan agar disiplin?","options":[{"text":"Tepat waktu","isCorrect":true,"feedback":"Hebat! Itu contoh sikap disiplin 👍"},{"text":"Terlambat","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus tepat waktu."}]}'::jsonb,
 '[{"question":"Apa itu disiplin?","options":["Taat aturan","Melanggar aturan","Bermain"],"answer":"Taat aturan","explanation":"Disiplin berarti mengikuti aturan yang ada."},{"question":"Datang tepat waktu adalah contoh...","options":["Disiplin","Malas","Tidak penting"],"answer":"Disiplin","explanation":"Tepat waktu menunjukkan kita disiplin."},{"question":"Melanggar aturan adalah sikap...","options":["Tidak baik","Baik","Biasa saja"],"answer":"Tidak baik","explanation":"Melanggar aturan adalah perilaku yang tidak baik."}]'::jsonb)

on conflict (id) do update set
  sila_id           = excluded.sila_id,
  title             = excluded.title,
  subtitle          = excluded.subtitle,
  icon              = excluded.icon,
  character_name    = excluded.character_name,
  character_img_url = excluded.character_img_url,
  illustration_url  = excluded.illustration_url,
  slides            = excluded.slides,
  interaction       = excluded.interaction,
  quiz              = excluded.quiz;


-- ============================================================
-- DONE ✅
-- Tables:   silas, materis, outfits, profiles,
--           user_progress, user_outfits, missions
-- Views:    v_progress_per_sila, v_leaderboard
-- Functions: handle_new_user, sync_user_points,
--            complete_materi, purchase_outfit
-- RLS:      all tables secured
-- ============================================================
