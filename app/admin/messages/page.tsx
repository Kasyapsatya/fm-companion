import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminMessagesPage() {
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

  if (!profile?.is_admin) notFound();

  // RLS also restricts this table to admins (see supabase/schema.sql),
  // so this is defense in depth, not the only gate.
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("id, name, email, body, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="app-shell">
      <h1 className="section-title">Contact messages</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>When</th>
            <th>From</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages && messages.length > 0 ? (
            messages.map((m) => (
              <tr key={m.id}>
                <td>{new Date(m.created_at).toLocaleString("en-GB", { timeZone: "UTC" })} UTC</td>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.body}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No messages yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
