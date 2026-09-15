import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BOOK_META } from "@/lib/content";

export const metadata: Metadata = {
  title: BOOK_META.title,
  description: BOOK_META.subtitle,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          Loaded via a stylesheet link rather than next/font/google
          deliberately: next/font fetches font files at BUILD time, which
          fails the build in any environment without outbound internet
          (this sandbox included) and is one more way a Vercel build can
          break. A <link> fetches at the BROWSER instead, exactly like
          any ordinary website -- slightly less optimal loading, much
          harder to break.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;1,300&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
