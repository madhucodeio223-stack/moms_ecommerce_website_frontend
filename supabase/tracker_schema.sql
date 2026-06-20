-- Tracker-related tables

create table if not exists pregnancy_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  lmp date,
  due_date date,
  baby_size text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists growth_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  week int,
  weight numeric,
  length numeric,
  notes text,
  created_at timestamptz default now()
);

create table if not exists symptom_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  symptoms text,
  created_at timestamptz default now()
);

create table if not exists kick_counts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  count int,
  session_started_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists contractions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  start_at timestamptz,
  end_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  doctor_name text,
  date timestamptz,
  notes text,
  created_at timestamptz default now()
);

create table if not exists nutrition_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  calories int,
  protein int,
  iron int,
  calcium int,
  water_ml int,
  created_at timestamptz default now()
);

create table if not exists exercise_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  type text,
  minutes int,
  created_at timestamptz default now()
);

create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  body text,
  photos text[],
  created_at timestamptz default now()
);

create table if not exists photo_timeline (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  url text,
  caption text,
  taken_at timestamptz,
  created_at timestamptz default now()
);
