"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The cover image (left column of the landing page's hero) plus the
 * title/subtitle caption beneath it. This is a client component
 * specifically because the caption's font size is scroll-driven: the
 * column is sticky (see .cover-col in globals.css), so as the page is
 * scrolled the visible gap between the bottom of the cover image and
 * the bottom of the viewport changes -- small at first (the image is
 * still low in the viewport), growing as scrolling carries the image
 * up toward its pinned position, then holding steady once pinned. The
 * title/subtitle scale with that gap, filling more of it as more of it
 * opens up, instead of sitting at one fixed size regardless of how
 * much space is actually free underneath the image.
 */
export default function CoverBlock({
  src,
  alt,
  title,
  subtitle,
}: {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [titleSize, setTitleSize] = useState(19);
  const [subSize, setSubSize] = useState(10.5);

  useEffect(() => {
    const TITLE_MIN = 18;
    const TITLE_MAX = 36;
    const SUB_MIN = 10;
    const SUB_MAX = 14;
    // How much visible whitespace (px) below the image counts as
    // "fully open" -- past this, the caption stops growing.
    const GAP_FOR_MAX = 340;

    let raf = 0;

    function measure() {
      const el = frameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const gap = window.innerHeight - rect.bottom;
      const t = Math.max(0, Math.min(1, gap / GAP_FOR_MAX));
      setTitleSize(TITLE_MIN + (TITLE_MAX - TITLE_MIN) * t);
      setSubSize(SUB_MIN + (SUB_MAX - SUB_MIN) * t);
    }

    function onScrollOrResize() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cover-col">
      <div className="cover-frame" ref={frameRef}>
        <img src={src} alt={alt} />
      </div>
      <div className="cover-caption">
        <div className="cover-caption-title" style={{ fontSize: titleSize }}>
          {title}
        </div>
        <div className="cover-caption-sub" style={{ fontSize: subSize }}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}
