import Link from "next/link";
import { notFound } from "next/navigation";
import { findChapter, PARTS, type Depth } from "@/lib/content";
import { getChapterBody } from "@/lib/chapterBodies";

const DEPTH_LABEL: Record<Depth, string> = {
  concept: "Conceptual foundation",
  example: "Concept + example code",
  full: "Concept → math → code → tool → agent",
  production: "Production: guardrails & evaluation",
};

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ roman: string; slug: string }>;
}) {
  const { roman, slug } = await params;
  const found = findChapter(roman, slug);
  if (!found) notFound();
  const { part, chapter } = found;

  const body = getChapterBody(roman, slug);

  const allChapters = PARTS.flatMap((p) => p.chapters.map((c) => ({ part: p, chapter: c })));
  const idx = allChapters.findIndex((x) => x.part.roman === roman && x.chapter.slug === slug);
  const prev = idx > 0 ? allChapters[idx - 1] : undefined;
  const next = idx < allChapters.length - 1 ? allChapters[idx + 1] : undefined;

  return (
    <div className="app-shell">
      <div className="breadcrumb">
        <Link href="/#companion">Companion</Link> / <Link href={`/parts/${part.roman}`}>Part {part.roman}</Link>{" "}
        / Chapter {String(chapter.number).padStart(2, "0")}
      </div>
      <div className="app-header" style={{ marginBottom: 8 }}>
        <h1>
          {String(chapter.number).padStart(2, "0")} — {chapter.title}
        </h1>
      </div>
      <span className="depth-badge">{DEPTH_LABEL[chapter.depth]}</span>

      {body ?? (
        <div className="chapter-placeholder">
          <p style={{ margin: "0 0 10px", color: "var(--ink-brown)" }}>{chapter.blurb}</p>
          <p style={{ margin: 0 }}>
            Full content for this chapter is being transcribed from the manuscript and will appear here
            soon. In the meantime, the level of detail planned for this chapter is:{" "}
            <strong>{DEPTH_LABEL[chapter.depth]}</strong>.
          </p>
        </div>
      )}

      <div className="chapter-nav">
        {prev ? (
          <Link href={`/parts/${prev.part.roman}/${prev.chapter.slug}`}>
            ← {String(prev.chapter.number).padStart(2, "0")} — {prev.chapter.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/parts/${next.part.roman}/${next.chapter.slug}`}>
            {String(next.chapter.number).padStart(2, "0")} — {next.chapter.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
