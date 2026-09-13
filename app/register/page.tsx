import { signUp } from "@/app/auth/actions";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Get access</h1>
        <p className="sub">Create an account to enter the companion platform.</p>
        {error && <div className="error-box">{error}</div>}
        <form action={signUp}>
          <div className="field">
            <label htmlFor="full_name">Name</label>
            <input id="full_name" name="full_name" type="text" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Create account
          </button>
        </form>
        <div className="auth-switch">
          Already have access? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
}
