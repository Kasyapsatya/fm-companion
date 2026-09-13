import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export default async function Nav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    isAdmin = Boolean(profile?.is_admin);
  }

  return (
    <nav className="nav">
      <div className="wrap">
        <Link href="/" className="nav-title">
          Home
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              {isAdmin && (
                <>
                  <Link href="/admin/users" className="btn btn-outline">
                    Registrations
                  </Link>
                  <Link href="/admin/messages" className="btn btn-outline">
                    Messages
                  </Link>
                </>
              )}
              <Link href="/contact" className="btn btn-outline">
                Contact
              </Link>
              <form action={signOut} style={{ display: "contents" }}>
                <button type="submit" className="btn btn-outline">
                  Log out
                </button>
              </form>
              <Link href="/app" className="btn btn-primary">
                Companion
              </Link>
            </>
          ) : (
            <>
              <Link href="/contact" className="btn btn-outline">
                Contact
              </Link>
              <Link href="/login" className="btn btn-primary">
                Log in / Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
