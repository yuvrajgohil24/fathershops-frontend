"use client";

import { useEffect, useRef } from "react";

/**
 * Renders the API's sanitised description HTML. Upstream description images
 * are frequently dead (the CDN image proxy answers 502), so broken images are
 * hidden instead of showing the browser's broken-image icon.
 */
export function ProductDescription({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const hide = (img: HTMLImageElement) => {
      img.hidden = true;
    };

    // Images that already failed before hydration.
    root.querySelectorAll("img").forEach((img) => {
      if (img.complete && img.naturalWidth === 0) hide(img);
    });

    // `error` does not bubble, so listen in the capture phase.
    const onError = (event: Event) => {
      if (event.target instanceof HTMLImageElement) hide(event.target);
    };
    root.addEventListener("error", onError, true);

    return () => root.removeEventListener("error", onError, true);
  }, [html]);

  return (
    <div
      ref={ref}
      className="product-description"
      // Sanitised server-side by the Laravel API (symfony/html-sanitizer).
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
