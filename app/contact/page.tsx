import { createClient } from "@/lib/supabase/server";
import { submitContactMessage } from "./actions";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { sent, error } = await searchParams;

  // Best-effort prefill for a signed-in visitor -- the form works
  // identically for someone who isn't signed in at all.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fullName = (user?.user_metadata?.full_name as string | undefined) || "";

  return (
    <div className="auth-shell">
      <div className="auth-card wide">
        <h1>Contact the authors</h1>
        <p className="sub">Questions, corrections, or feedback on the book — no account needed.</p>
        {sent && <div className="success-box">Thank you — your message has been sent.</div>}
        {error && <div className="error-box">{error}</div>}
        <form action={submitContactMessage}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required defaultValue={fullName} />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required defaultValue={user?.email ?? ""} />
          </div>
          <div className="field">
            <label htmlFor="body">Message</label>
            <textarea id="body" name="body" required />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
