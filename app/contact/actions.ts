"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Open to anyone -- logged in or not. When there IS a session, the
 * message is tagged with user_id so an admin can see who sent it;
 * when there isn't, user_id is left null. The database policy
 * (supabase/schema.sql) enforces the same rule server-side: an insert
 * is only accepted if user_id is null, or matches the caller's own id.
 */
export async function submitContactMessage(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  const { error } = await supabase.from("contact_messages").insert({
    user_id: user?.id ?? null,
    name,
    email,
    body,
  });

  if (error) {
    redirect(`/contact?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/contact?sent=true");
}
