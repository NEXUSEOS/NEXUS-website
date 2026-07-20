-- NEXUS Platform — Initial Cloud Schema
-- Sprint 3 Task 1: Authentication + User System

-- Roles
create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  name text unique not null check (name in ('visitor', 'developer', 'sponsor', 'administrator')),
  description text,
  created_at timestamptz not null default now()
);

insert into public.roles (name, description) values
  ('visitor', 'Default unauthenticated or new user role'),
  ('developer', 'Developer portal access and SDK resources'),
  ('sponsor', 'Sponsor program participant'),
  ('administrator', 'Platform administrator')
on conflict (name) do nothing;

-- Organizations
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  organization_id uuid references public.organizations (id) on delete set null,
  role_id uuid references public.roles (id) on delete set null,
  email_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- User settings
create table if not exists public.user_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references auth.users (id) on delete cascade,
  email_notifications boolean not null default true,
  marketing_emails boolean not null default false,
  theme_preference text not null default 'dark',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Downloads tracking
create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product text not null,
  version text,
  downloaded_at timestamptz not null default now()
);

-- Beta programs
create table if not exists public.beta_programs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists profiles_username_idx on public.profiles (username);
create index if not exists profiles_organization_id_idx on public.profiles (organization_id);
create index if not exists downloads_user_id_idx on public.downloads (user_id);
create index if not exists downloads_product_idx on public.downloads (product);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger organizations_updated_at
  before update on public.organizations
  for each row execute function public.set_updated_at();

create trigger user_settings_updated_at
  before update on public.user_settings
  for each row execute function public.set_updated_at();

-- New user handler
create or replace function public.handle_new_user()
returns trigger as $$
declare
  visitor_role_id uuid;
begin
  select id into visitor_role_id from public.roles where name = 'visitor';

  insert into public.profiles (id, full_name, role_id, email_verified)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    visitor_role_id,
    coalesce(new.email_confirmed_at is not null, false)
  );

  insert into public.user_settings (user_id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security
alter table public.roles enable row level security;
alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.downloads enable row level security;
alter table public.beta_programs enable row level security;

-- Roles: readable by authenticated users
create policy "Roles are viewable by authenticated users"
  on public.roles for select
  to authenticated
  using (true);

-- Organizations: readable by authenticated users
create policy "Organizations are viewable by authenticated users"
  on public.organizations for select
  to authenticated
  using (true);

-- Beta programs: readable by everyone authenticated
create policy "Beta programs are viewable by authenticated users"
  on public.beta_programs for select
  to authenticated
  using (active = true);

-- Profiles: users can read all profiles, update own
create policy "Profiles are viewable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- User settings: own only
create policy "Users can view own settings"
  on public.user_settings for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can update own settings"
  on public.user_settings for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Downloads: users can read and insert own
create policy "Users can view own downloads"
  on public.downloads for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can record own downloads"
  on public.downloads for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Storage bucket for avatars (run in Supabase dashboard or via API)
-- insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
