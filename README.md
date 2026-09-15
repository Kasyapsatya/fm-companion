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

No Docker, no server to manage: deploys straight from GitHub to Vercel's
free tier.

## Stack

- **Framework**: Next.js 16 (App Router, Server Components).
- **Database**: Supabase Postgres (`supabase/schema.sql`). Not used by
  any page right now — kept, along with the `lib/supabase/server.ts`
  client, for future features. It still holds the `contact_messages`
  table from the removed contact form.
- **Design**: colors and type taken directly from the approved book
  cover (dark ink-brown, cream, a teal "agent" accent, an amber accent)
  plus the platform's locked Saffron/ink-brown/cream/slate tokens for
  the light reading sections. See `app/globals.css`.

## Project layout

```
app/layout.tsx          shared shell: Nav + page + Footer on every page
app/page.tsx            home page
app/parts/...           part and chapter pages
components/             Nav, Footer, CoverBlock, CoverSpread
lib/content.ts          book metadata, parts/chapters, authors, links
lib/chapterBodies.tsx   transcribed chapter content
lib/supabase/server.ts  server-side Supabase client (currently unused)
supabase/schema.sql     tables + RLS policies
```

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000. No environment variables are needed while
no page talks to Supabase. When a feature uses it again, copy
`.env.local.example` to `.env.local` and paste in the Supabase Project
URL and anon key (Settings → API).

## Deploying (free, from GitHub)

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the GitHub repo. Vercel
   detects Next.js automatically — no build configuration needed.
3. Deploy. The site is live at the `*.vercel.app` URL Vercel gives you.
4. When sssia.org's DNS is ready to hand off `fm.sssia.org`: add it as a
   custom domain in the same Vercel project (Settings → Domains) and
   point its DNS at Vercel per the CNAME/A record Vercel shows you.
   Nothing in the app changes — only the domain in front of it.

## What's stubbed for later

- **Repository & notebooks** — the home-page button was removed until
  the notebooks repo exists; an in-browser notebook runner is future
  work per the book's own Chapter 17-20 production arc.
- **Agentic OS** — the home-page banner is shown without a link until
  the platform is live.
- **Chapter content** — chapters without a body in
  `lib/chapterBodies.tsx` show a "being transcribed" placeholder.
- **Contact form** — removed for now. The `contact_messages` table and
  its RLS policies remain in `supabase/schema.sql`; recover the page from
  git history (`app/contact/`) to bring it back.
- **Leftover auth tables** — `supabase/schema.sql` still creates the
  `profiles` table and admin/approval policies from the earlier
  login-gated version.
