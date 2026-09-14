-- Run this in the Supabase project's SQL editor. Safe to re-run in
-- full any time the schema changes (every create is guarded with
-- if-not-exists / or-replace / drop-if-exists-then-create) -- if you
-- already ran an earlier version of this file, just run the whole
-- thing again rather than hand-picking the new lines.

-- ---------------------------------------------------------------------
-- profiles: one row per auth.users row, holding the app-specific bits
-- auth.users doesn't have (full_name is also in auth.users' metadata
-- already, kept here too for easy SQL querying/joins).
--
-- Access model: signup requires BOTH an emailed confirmation (Supabase
-- Auth handles that step entirely on its own) AND an admin explicitly
-- approving the account (`approved`). A brand-new row is
-- approved = false, is_admin = false -- signed in, but every gated
-- route bounces them to /pending until an admin approves them at
-- /admin/users. Being an admin always counts as approved, so promoting
-- your own account to admin (see the bottom of this file) is enough to
-- get yourself in without waiting on a second row.
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  is_admin boolean not null default false,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Re-running this file against a database created before `approved`
-- or `email` existed adds the columns without touching existing
-- rows/policies. `email` is copied from auth.users purely so
-- /admin/users can display it without needing the service-role key;
-- Supabase Auth (not this column) remains the source of truth for it.
alter table public.profiles add column if not exists approved boolean not null default false;
alter table public.profiles add column if not exists email text;
update public.profiles p set email = u.email
  from auth.users u where u.id = p.id and p.email is null;

alter table public.profiles enable row level security;

-- Is the current caller an admin? Policies must use this rather than
-- querying public.profiles inline: a policy ON profiles that selects
-- FROM profiles re-triggers its own RLS check and Postgres aborts every
-- query with "infinite recursion detected in policy for relation
-- profiles" (42P17) -- which the app sees as "no profile", bouncing
-- even admins to /pending. SECURITY DEFINER runs the lookup as the
-- function owner, which bypasses RLS, so there is no recursion.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

drop policy if exists "profiles: read own" on public.profiles;
drop policy if exists "profiles: admin read all" on public.profiles;
drop policy if exists "profiles: admin update" on public.profiles;

-- Everyone can read their own profile (needed so the app can check its
-- own approved/is_admin flags).
create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id);

-- Admins can read every profile (needed for the /admin/users approval
-- list). Combined with "read own" above via OR, per Postgres RLS
-- semantics for multiple policies on the same command.
create policy "profiles: admin read all" on public.profiles
  for select using (public.is_admin());

-- Only admins may write approved/is_admin on ANY row (including their
-- own) -- never the app on a user's own behalf, and never a plain
-- user. The WITH CHECK is intentionally permissive (true): the app
-- only ever writes the `approved` column from /admin/users, and only
-- an admin's session can pass the USING clause to begin with.
create policy "profiles: admin update" on public.profiles
  for update using (public.is_admin()) with check (true);

-- Auto-create a profile row whenever a new auth user signs up, copying
-- the full_name they registered with. New rows start unapproved.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill: anyone who signed up before the trigger above existed has
-- no profile row, which leaves them stuck at /pending AND invisible on
-- /admin/users. Give them one (unapproved) so an admin can see them.
insert into public.profiles (id, full_name, email)
select u.id, u.raw_user_meta_data ->> 'full_name', u.email
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);

-- ---------------------------------------------------------------------
-- contact_messages: submissions from the "Contact the authors" form.
-- ---------------------------------------------------------------------
create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users (id) on delete set null,
  name text not null,
  email text not null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "contact_messages: insert own" on public.contact_messages;
drop policy if exists "contact_messages: insert" on public.contact_messages;
drop policy if exists "contact_messages: admin read" on public.contact_messages;

-- /contact is a public page (see proxy.ts) -- anyone may submit a
-- message. A signed-in visitor's message is tagged with their user_id
-- (must match their own session, never someone else's); an anonymous
-- visitor's message carries user_id = null.
create policy "contact_messages: insert" on public.contact_messages
  for insert with check (
    user_id is null or auth.uid() = user_id
  );

-- Only admins may read the submitted messages (checked against the
-- profiles table, not a client-supplied flag).
create policy "contact_messages: admin read" on public.contact_messages
  for select using (public.is_admin());

-- ---------------------------------------------------------------------
-- Making yourself the first admin (run manually, once, after
-- registering and confirming your own account by email):
--
--   insert into public.profiles (id, full_name, email, is_admin, approved)
--   select id, raw_user_meta_data ->> 'full_name', email, true, true
--   from auth.users where email = 'you@example.com'
--   on conflict (id) do update set is_admin = true, approved = true;
--
-- (No need to register through the app first if you'd rather not wait
-- on the confirmation email: Supabase dashboard -> Authentication ->
-- Users -> Add user -> Create new user, tick "Auto Confirm User", then
-- run the statement above.)
--
-- Every admin you promote after that is automatically approved too
-- (is_admin counts as approved -- see proxy.ts); everyone else waits
-- at /pending until an admin approves them at /admin/users.
-- ---------------------------------------------------------------------
