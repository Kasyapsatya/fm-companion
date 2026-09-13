# Applications of Agentic AI in Financial Mathematics — companion app

Next.js (App Router) companion site for the book, published under the AI
Actuaries initiative of the Sri Sathya Sai Institute of Actuaries
(SSSIA). Public landing page (cover, Foreword-derived why/what/how, the
four parts and 21 chapters, authors, link to sssia.org) plus an
account-gated area (chapter/notebook index, a "contact the authors"
form), with Supabase handling both authentication and the database.

No Docker, no server to manage: deploys straight from GitHub to Vercel's
free tier, with Supabase's free tier as the backend.

## Stack

- **Framework**: Next.js 16 (App Router, Server Components, Server
  Actions) — no separate backend process; auth and form handling are
  Server Actions that call Supabase directly.
- **Auth + database**: Supabase — email/password accounts via Supabase
  Auth, contact-form messages in Supabase's built-in Postgres, both
  behind Row Level Security policies (`supabase/schema.sql`) rather than
  hand-rolled password hashing or a custom session cookie.
- **Design**: colors and type taken directly from the approved book
  cover (dark ink-brown, cream, a teal "agent" accent, an amber accent)
  plus the platform's locked Saffron/ink-brown/cream/slate tokens for
  the light reading sections. See `app/globals.css`.

This is v1: real accounts and a real database, but no password-reset UI
beyond what Supabase Auth gives for free, and no in-browser notebook
execution — chapters link out to the book's GitHub repository until
that exists.

### Access model: two steps to get in

Getting into `/app` (and `/contact`, `/admin`) takes both of these,
enforced in `proxy.ts` on every request:

1. **Email confirmation** — automatic, Supabase Auth sends this itself
   the moment someone registers; the app does nothing here.
2. **Admin approval** — every new account starts `approved = false`. An
   admin approves it at `/admin/users` (linked from the nav for admin
   accounts). Until then, a confirmed-but-unapproved user who signs in
   is sent to `/pending` instead of the companion area.

Being an admin always counts as approved (see "Promoting yourself to
admin" below) — you don't wait on a second admin to let you in.

## One-time setup

### 1. Create the Supabase project

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL editor, run everything in `supabase/schema.sql`. This
   creates the `profiles` table (auto-populated on signup via a
   trigger) and `contact_messages` table, with Row Level Security
   policies so: any signed-in user can submit a contact message as
   themselves, and only an admin can read the submitted messages.
3. Settings → API: copy the **Project URL** and the **anon/public key**.

By default Supabase requires email confirmation before a new account
can log in. For a closed group of readers you already control, you can
turn this off (Authentication → Providers → Email → "Confirm email") so
registration is immediate — otherwise Supabase sends the confirmation
email itself, no extra code needed either way.

### 2. Local development

```bash
npm install
cp .env.local.example .env.local   # paste in the Project URL + anon key
npm run dev
```

Visit http://localhost:3000.

### 3. Promote yourself to admin

Register an account through the running app and confirm it by email,
then in the Supabase SQL editor:

```sql
update public.profiles
set is_admin = true, approved = true
where id = (select id from auth.users where email = 'you@example.com');
```

Admins see two extra nav links: **Registrations** (`/admin/users` —
approve new signups) and **Messages** (`/admin/messages` — read
contact-form submissions).

### Upgrading an existing database

If you ran an earlier version of `schema.sql` before the approval step
existed, just run the current `schema.sql` again in full — every
`create` in it is guarded (`if not exists` / `or replace` /
`drop ... if exists` first) so re-running it only adds what's missing
(the `approved` and `email` columns, the new policies) without
touching existing rows.

## Deploying (free, from GitHub)

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the GitHub repo. Vercel
   detects Next.js automatically — no build configuration needed.
3. Add the two environment variables from `.env.local.example`
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) under
   **Project → Settings → Environment Variables**.
4. Deploy. The site is live at the `*.vercel.app` URL Vercel gives you.
5. When sssia.org's DNS is ready to hand off `fm.sssia.org`: add it as a
   custom domain in the same Vercel project (Settings → Domains) and
   point its DNS at Vercel per the CNAME/A record Vercel shows you.
   Nothing in the app changes — only the domain in front of it.

## What's stubbed for later

Named directly in the code (`TODO(KK)` comments) rather than silently
faked:

- **Author bios** (`lib/content.ts`) — names are as printed on the
  manuscript title page; nothing else about the authors is stated until
  you provide it, per the project's "do not fabricate" rule.
- **GitHub repo URL** (`lib/content.ts`) — placeholder until the real
  notebooks repo exists.
- **Notebook execution** — chapter list links out to GitHub/Colab; an
  in-browser runner is future work per the book's own Chapter 17-20
  production arc, not part of this v1.
- **Rejecting a registration** — there's currently no "reject" button,
  only "approve". To turn away a signup, delete the user from
  Authentication → Users in the Supabase dashboard.
- **Supabase's free-tier confirmation email** is slow and can land in
  spam. Fine for a handful of early readers; before promoting the site
  more widely, connect a real provider (e.g. Resend) under
  Authentication → Settings → SMTP Settings in Supabase — no code
  change needed.
