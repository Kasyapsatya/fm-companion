import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PARTS, GITHUB_REPO_URL, AGENTIC_OS_URL } from "@/lib/content";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Belt and braces: proxy.ts / middleware already redirects
  // signed-out (and not-yet-approved) visitors away from /app, but a
  // page that renders account data should never trust that alone.
  if (!user) redirect("/login");

  const displayName = (user.user_metadata?.full_name as string | undefined) || user.email;

  return (
    <div className="app-shell">
      <div className="app-header">
        <h1>Welcome, {displayName}</h1>
        <a href={GITHUB_REPO_URL} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
          Repository &amp; notebooks
        </a>
      </div>

      <p style={{ color: "var(--slate)", fontSize: 15, maxWidth: 640, marginTop: -20, marginBottom: 32 }}>
        Four parts, twenty-one chapters. Pick a part to see its chapters, or jump straight into one below.
      </p>

      <div className="part-cards">
        {PARTS.map((part) => (
          <Link key={part.roman} href={`/app/parts/${part.roman}`} className="part-card">
            <div className="part-card-num">{part.roman}</div>
            <h3>{part.title}</h3>
            <p>{part.blurb}</p>
            <span className="part-card-count">
              {part.chapters.length} chapter{part.chapters.length === 1 ? "" : "s"}
            </span>
          </Link>
        ))}
      </div>

      <div className="agentos-banner">
        <div>
          <h3>Agentic OS</h3>
          <p>
            A separate platform for running the book&apos;s agents beyond the page — in development. This
            companion shows you the code; Agentic OS is where it runs.
          </p>
        </div>
        <a href={AGENTIC_OS_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Learn more ↗
        </a>
      </div>
    </div>
  );
}
