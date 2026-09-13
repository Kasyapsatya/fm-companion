import { AUTHORS, BOOK_META, WHY_WHAT_HOW } from "@/lib/content";
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

      <section className="section-alt" id="authors">
        <div className="wrap">
          <div className="section-kicker">Authors</div>
          <h2 className="section-title">Written by</h2>
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
