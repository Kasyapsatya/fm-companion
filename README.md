# Applications of Agentic AI in Financial Mathematics — companion app

Next.js (App Router) companion site for the book, published under the AI
Actuaries initiative of the Sri Sathya Sai Institute of Actuaries
(SSSIA). Everything is public — no accounts or login:

- **Home** (`/`) — cover, Foreword-derived why/who/how, the four parts,
  the Agentic OS banner, and the authors (each linked to LinkedIn).
- **Parts & chapters** (`/parts/[roman]`, `/parts/[roman]/[slug]`) —
  chapter index per part and a page per chapter, with prev/next
  navigation. Chapter bodies live in `lib/chapterBodies.tsx`; chapters
  without one show a placeholder.
- **Contact** (`/contact`) — "contact the authors" form; submissions are
  stored in Supabase.

No Docker, no server to manage: deploys straight from GitHub to Vercel's
free tier, with Supabase's free tier as the backend for contact messages.

## Stack

- **Framework**: Next.js 16 (App Router, Server Components, Server
  Actions) — the contact form is a Server Action that inserts into
  Supabase directly; no separate backend process.
- **Database**: Supabase Postgres, behind Row Level Security policies
  (`supabase/schema.sql`) — anyone may insert a contact message, only
  an admin may read them.
- **Design**: colors and type taken directly from the approved book
  cover (dark ink-brown, cream, a teal "agent" accent, an amber accent)
  plus the platform's locked Saffron/ink-brown/cream/slate tokens for
  the light reading sections. See `app/globals.css`.

## Project layout

```
app/layout.tsx          shared shell: Nav + page + Footer on every page
app/page.tsx            home page
app/parts/...           part and chapter pages
app/contact/            contact form + its Server Action
components/             Nav, Footer, CoverBlock, CoverSpread
lib/content.ts          book metadata, parts/chapters, authors, links
lib/chapterBodies.tsx   transcribed chapter content
lib/supabase/server.ts  server-side Supabase client
supabase/schema.sql     tables + RLS policies
```

## One-time setup

### 1. Create the Supabase project

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL editor, run everything in `supabase/schema.sql`. It is
   safe to re-run in full whenever it changes.
3. Settings → API: copy the **Project URL** and the **anon/public key**.

### 2. Local development

```bash
npm install
cp .env.local.example .env.local   # paste in the Project URL + anon key
npm run dev
```

Visit http://localhost:3000.

### 3. Reading contact messages

There is no in-app admin UI. Read submissions in the Supabase dashboard
(Table Editor → `contact_messages`), which bypasses RLS.

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

- **GitHub repo URL** (`lib/content.ts`) — placeholder until the real
  notebooks repo exists.
- **Agentic OS URL** (`lib/content.ts`) — placeholder until the
  platform is live.
- **Chapter content** — chapters without a body in
  `lib/chapterBodies.tsx` show a "being transcribed" placeholder.
- **Notebook execution** — chapters link out to GitHub/Colab; an
  in-browser runner is future work per the book's own Chapter 17-20
  production arc.
- **Leftover auth tables** — `supabase/schema.sql` still creates the
  `profiles` table and admin/approval policies from the earlier
  login-gated version. They are unused by the app now, but the
  `contact_messages` read policy still relies on `public.is_admin()`.
