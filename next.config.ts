import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The companion used to live behind a login under /app; keep old
  // links and bookmarks working now that it's public.
  async redirects() {
    return [
      { source: "/app", destination: "/#companion", permanent: true },
      { source: "/app/parts/:path*", destination: "/parts/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
