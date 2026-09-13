import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Paths that require a signed-in AND admin-approved user. /contact is
 * deliberately NOT here -- it's a public "email the authors" form open
 * to anyone, logged in or not (see app/contact/actions.ts and the
 * matching RLS policy in supabase/schema.sql).
 */
const PROTECTED_PREFIXES = ["/app", "/admin"];

/**
 * Runs on every request (see proxy.ts at the repo root).
 *
 * Three jobs: (1) refresh the Supabase auth cookie so it never silently
 * expires mid-session, (2) redirect signed-out visitors away from
 * gated routes (and from /pending, which only makes sense once signed
 * in) before any page code runs, and (3) redirect signed-in-but-not-
 * yet-approved visitors to /pending instead of the gated routes --
 * confirming your email is step one, an admin approving your account
 * at /admin/users is step two, and only both together unlock /app,
 * /contact and /admin.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not remove this call: it both refreshes the token and, as a
  // side effect of the getAll/setAll above, keeps the cookie in sync
  // with Supabase's rotation of it. Skipping it causes intermittent
  // sign-outs.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isPending = pathname === "/pending";

  if ((isProtected || isPending) && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtected && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("approved, is_admin")
      .eq("id", user.id)
      .single();

    const allowed = Boolean(profile?.approved || profile?.is_admin);
    if (!allowed) {
      const pendingUrl = request.nextUrl.clone();
      pendingUrl.pathname = "/pending";
      pendingUrl.search = "";
      return NextResponse.redirect(pendingUrl);
    }
  }

  return supabaseResponse;
}
