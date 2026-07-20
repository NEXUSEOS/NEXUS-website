-- NEXUS Platform — Portal Analytics
-- Sprint 3 Task 2: Portal usage tracking

create table if not exists public.portal_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  portal text not null,
  event_type text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists portal_events_user_id_idx on public.portal_events (user_id);
create index if not exists portal_events_portal_idx on public.portal_events (portal);
create index if not exists portal_events_created_at_idx on public.portal_events (created_at desc);

alter table public.portal_events enable row level security;

create policy "Users can view own portal events"
  on public.portal_events for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own portal events"
  on public.portal_events for insert
  to authenticated
  with check (auth.uid() = user_id);
