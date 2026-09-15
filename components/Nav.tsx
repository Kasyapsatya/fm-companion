import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap">
        <Link href="/" className="nav-title">
          Home
        </Link>
      </div>
    </nav>
  );
}
