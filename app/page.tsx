import Link from "next/link";
import { AUTHORS, BOOK_META, PARTS, WHY_WHAT_HOW } from "@/lib/content";
import CoverBlock from "@/components/CoverBlock";

export default function LandingPage() {
  return (
    <>
      {/*
        THE COVER IMAGE: to swap in your own cover photo/scan, either
        (a) replace the file at public/cover-spread.png with your image,
            keeping the same filename -- nothing else needs to change, or
        (b) drop your file in /public under a different name (e.g.
            public/cover.jpg) and change the src below to match, e.g.
            src="/cover.jpg".
        Any image format works (jpg/png/webp); it scales to fit the left
        column while keeping its own aspect ratio. The title/subtitle
        below it live in components/CoverBlock.tsx, which grows them as
        you scroll -- see the comment there for why.
      */}
      <section className="cover-why-hero">
        <div className="wrap cover-why-grid">
          <CoverBlock
            src="/cover-spread.png"
            alt={`${BOOK_META.title} — cover`}
            title={BOOK_META.title}
            subtitle={BOOK_META.subtitle}
          />

          <div className="why-col">
            <div className="section-kicker">Why · What · How</div>
            <h2 className="section-title">The philosophy behind this book</h2>
            <p className="section-lede" style={{ marginBottom: 24 }}>
              From the Foreword.
            </p>
            <div className="why-stack">
              <div className="why-card">
                <h3>Why</h3>
                <p>{WHY_WHAT_HOW.why}</p>
              </div>
              <div className="why-card">
                <h3>Who it&apos;s for</h3>
                <p>{WHY_WHAT_HOW.who}</p>
              </div>
              <div className="why-card">
                <h3>How it&apos;s built</h3>
                <p>{WHY_WHAT_HOW.how}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="companion">
        <div className="wrap">
          <div className="app-header">
            <div>
              <div className="section-kicker">Companion</div>
              <h2 className="section-title">Explore the book</h2>
            </div>
          </div>

          <p style={{ color: "var(--slate)", fontSize: 15, maxWidth: 640, marginTop: -20, marginBottom: 32 }}>
            Four parts, twenty-one chapters. Pick a part to see its chapters.
          </p>

          <div className="part-cards">
            {PARTS.map((part) => (
              <Link key={part.roman} href={`/parts/${part.roman}`} className="part-card">
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
          </div>
        </div>
      </section>

      <section className="section-alt" id="authors">
        <div className="wrap">
          <div className="section-kicker">Authors</div>
          {/*<h2 className="section-title">Written by</h2>*/}
          <div className="authors-grid">
            {AUTHORS.map((a) => (
              <div className="author-card" key={a.name}>
                <h3>{a.name}</h3>
                <a
                  href={a.linkedin}
                  className="author-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${a.name} on LinkedIn`}
                  title={`${a.name} on LinkedIn`}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
