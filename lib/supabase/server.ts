import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Supabase client for use in Server Components, Server Actions, and
 * Route Handlers. Reads/writes the auth session via Next's cookie jar.
 *
 * Server Components cannot write cookies (Next throws if you try), so
 * `setAll` is wrapped in a try/catch there -- middleware.ts is what
 * actually keeps the session cookie refreshed on every request, this
 * client only needs to *read* it in that context. Server Actions and
 * Route Handlers CAN write cookies, and there the try/catch is a no-op.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component -- middleware.ts refreshes
            // the session cookie on every request, so this is safe to
            // ignore here.
          }
        },
      },
    }
  );
}
