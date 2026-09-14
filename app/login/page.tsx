import { signIn } from "@/app/auth/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; next?: string }>;
}) {
  const { error, message, next } = await searchParams;

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Log in</h1>
        <p className="sub">Enter the companion platform.</p>
        {message && <p className="sub">{message}</p>}
        {error && <div className="error-box">{error}</div>}
        <form action={signIn}>
          <input type="hidden" name="next" value={next ?? "/app"} />
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required autoComplete="current-password" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Log in
          </button>
        </form>
        <div className="auth-switch">
          Need access? <a href="/register">Create an account</a>
        </div>
      </div>
    </div>
  );
}
