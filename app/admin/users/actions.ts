"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();
  if (!profile?.is_admin) redirect("/app");

  return supabase;
}

export async function approveUser(formData: FormData) {
  const userId = String(formData.get("user_id") ?? "");
  const supabase = await requireAdmin();

  // The RLS "profiles: admin update" policy is what actually enforces
  // this is an admin action -- this function's own requireAdmin() check
  // above is a friendlier failure mode (redirect, not a thrown RLS
  // error), not the only gate.
  await supabase.from("profiles").update({ approved: true }).eq("id", userId);

  revalidatePath("/admin/users");
}
