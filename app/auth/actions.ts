"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Server Actions for auth. Each one talks to Supabase Auth directly --
 * no custom password hashing or session-cookie code, Supabase's client
 * libraries own that end to end and @supabase/ssr wires the resulting
 * session into Next's cookies (see lib/supabase/server.ts).
 */

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();

  if (password.length < 8) {
    redirect(`/register?error=${encodeURIComponent("Password must be at least 8 characters")}`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });

  if (error) {
    redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }

  // With "Confirm email" on (Supabase's default) there's no session until
  // the link in the email is clicked -- say so, rather than sending them
  // to /app and having the proxy silently bounce them back to /login.
  if (!data.session) {
    redirect(
      `/login?message=${encodeURIComponent(
        "Check your email to confirm your account, then log in. An admin will also need to approve it."
      )}`
    );
  }

  redirect("/app");
}

/** Only same-site paths, so ?next= can't be used as an open redirect. */
function safeNext(value: FormDataEntryValue | null) {
  const next = String(value ?? "");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/app";
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Same message regardless of whether the account exists -- Supabase's
    // own error text for bad credentials is already generic ("Invalid
    // login credentials"), so it's passed through as-is.
    redirect(`/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`);
  }

  redirect(next);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
