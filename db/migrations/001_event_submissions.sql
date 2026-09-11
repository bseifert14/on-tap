-- 001_event_submissions.sql
-- Public event submission queue. Reviewed by admins; approved submissions
-- are copied into the `events` table. RLS locks the table down to the
-- service role; all reads and writes go through /api endpoints.

create table if not exists public.event_submissions (
  id uuid primary key default gen_random_uuid(),

  -- Submitter (not a logged-in user)
  submitter_name  text not null,
  submitter_email text not null,

  -- Event fields (mirror of `events`, minus recurrence + created_by)
  event_name             text not null,
  event_location         text not null,
  event_business_name    text not null,
  event_type_slug        text not null,
  event_date             date not null,
  event_start_timestamp  timestamptz,
  event_end_timestamp    timestamptz,
  event_description      text,
  event_url              text,
  event_photo_path       text,
  is_kid_friendly        boolean not null default true,
  is_18_plus             boolean not null default false,
  is_21_plus             boolean not null default false,
  event_min_age          integer not null default 0,

  -- Payment (Phase 2 populates these; Phase 1 leaves them null)
  payment_intent_id text unique,
  amount_cents      integer,

  -- Review lifecycle
  status             text not null default 'pending_review'
    check (status in ('pending_review', 'approved', 'rejected')),
  rejection_reason   text,
  published_event_id uuid references public.events(id) on delete set null,
  reviewed_at        timestamptz,
  reviewed_by        text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Case-insensitive email storage
create index if not exists event_submissions_status_idx
  on public.event_submissions (status);

create index if not exists event_submissions_created_at_idx
  on public.event_submissions (created_at desc);

create index if not exists event_submissions_submitter_email_idx
  on public.event_submissions (lower(submitter_email));

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_event_submissions_updated_at on public.event_submissions;
create trigger set_event_submissions_updated_at
  before update on public.event_submissions
  for each row execute function public.set_updated_at();

-- RLS: deny everything for anon/authenticated. Service role (used by /api
-- endpoints) bypasses RLS, so all access goes through server-side code.
alter table public.event_submissions enable row level security;
