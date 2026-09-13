import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { findPart } from "@/lib/content";

export default async function PartPage({ params }: { params: Promise<{ roman: string }> }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { roman } = await params;
  const part = findPart(roman);
  if (!part) notFound();

  return (
    <div className="app-shell">
      <div className="breadcrumb">
        <Link href="/app">Companion</Link> / Part {part.roman}
      </div>
      <div className="app-header">
        <h1>
          Part {part.roman} — {part.title}
        </h1>
      </div>
      <p style={{ color: "var(--slate)", fontSize: 15, maxWidth: 640, marginTop: -20, marginBottom: 24 }}>
        {part.blurb}
      </p>

      <ul className="chapter-list chapter-list-link">
        {part.chapters.map((ch) => (
          <li key={ch.slug}>
            <Link href={`/app/parts/${part.roman}/${ch.slug}`}>
              <span className="chapter-list-num">{String(ch.number).padStart(2, "0")}</span>
              <span className="chapter-list-body">
                <span className="chapter-list-title">{ch.title}</span>
                <p className="chapter-list-blurb">{ch.blurb}</p>
              </span>
              <span className="chapter-list-arrow">Read →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
