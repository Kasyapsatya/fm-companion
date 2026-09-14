import Link from "next/link";
import { AGENTIC_OS_URL, AUTHORS, BOOK_META, GITHUB_REPO_URL, PARTS, WHY_WHAT_HOW } from "@/lib/content";
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
            <a href={GITHUB_REPO_URL} className="btn btn-outline-light-bg" target="_blank" rel="noopener noreferrer">
              Repository &amp; notebooks
            </a>
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
            <a href={AGENTIC_OS_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Learn more ↗
            </a>
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
                {a.bio ? <p>{a.bio}</p> : <p className="author-todo">Bio coming soon.</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap">
          <div className="collab-line">
            <img src="/sssia-seal.jpg" alt="SSSIA seal" />
            <span>
              Published under the AI Actuaries initiative, in collaboration with{" "}
              <a
                href="https://sssia.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--cream)", textDecoration: "underline" }}
              >
                sssia.org
              </a>
            </span>
          </div>
          <span>&copy; {BOOK_META.imprint}</span>
        </div>
      </footer>
    </>
  );
}
