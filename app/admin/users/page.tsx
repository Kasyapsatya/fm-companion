import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { approveUser } from "./actions";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: me } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!me?.is_admin) notFound();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, full_name, is_admin, approved, created_at")
    .order("created_at", { ascending: false });

  const pending = (profiles ?? []).filter((p) => !p.approved && !p.is_admin);
  const approved = (profiles ?? []).filter((p) => p.approved || p.is_admin);

  return (
    <div className="app-shell">
      <h1 className="section-title">Registrations</h1>

      <h2 className="section-title" style={{ fontSize: 20, marginTop: 8 }}>
        Awaiting approval ({pending.length})
      </h2>
      <table className="admin-table" style={{ marginBottom: 40 }}>
        <thead>
          <tr>
            <th>Registered</th>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pending.length > 0 ? (
            pending.map((p) => (
              <tr key={p.id}>
                <td>{new Date(p.created_at).toLocaleDateString()}</td>
                <td>{p.full_name || "—"}</td>
                <td>{p.email}</td>
                <td>
                  <form action={approveUser}>
                    <input type="hidden" name="user_id" value={p.id} />
                    <button type="submit" className="btn btn-primary" style={{ padding: "6px 14px", fontSize: 13 }}>
                      Approve
                    </button>
                  </form>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Nobody is waiting on approval.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="section-title" style={{ fontSize: 20 }}>
        Approved ({approved.length})
      </h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Registered</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {approved.length > 0 ? (
            approved.map((p) => (
              <tr key={p.id}>
                <td>{new Date(p.created_at).toLocaleDateString()}</td>
                <td>{p.full_name || "—"}</td>
                <td>{p.email}</td>
                <td>{p.is_admin ? "Admin" : "Reader"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No approved accounts yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
