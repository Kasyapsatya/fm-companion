import { BOOK_META } from "@/lib/content";

export default function Footer() {
  return (
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
  );
}
