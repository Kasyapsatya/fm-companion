import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap">
        <Link href="/" className="nav-title">
          Home
        </Link>
        <div className="nav-links">
          <Link href="/contact" className="btn btn-outline">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
