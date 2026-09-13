import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function PendingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // If this account has since been approved (or made admin), send it
  // straight through rather than showing a stale "waiting" screen.
  const { data: profile } = await supabase
    .from("profiles")
    .select("approved, is_admin")
    .eq("id", user.id)
    .single();
  if (profile?.approved || profile?.is_admin) redirect("/app");

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Almost there</h1>
        <p className="sub">
          Your email is confirmed. Your account is now waiting on an admin to approve access to the
          companion platform — you&apos;ll be able to sign in here once that happens, no action needed
          from you.
        </p>
      </div>
    </div>
  );
}
