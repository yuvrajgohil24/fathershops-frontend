"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = Omit<ImageProps, "src"> & { src: string | null };

/**
 * next/image with a neutral placeholder when the URL is missing or the
 * remote host fails to serve the file.
 */
export function RemoteImage({ src, alt, className, ...props }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex size-full items-center justify-center bg-subtle text-muted ${className ?? ""}`}
      >
        <svg aria-hidden viewBox="0 0 24 24" className="size-10 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="2" />
          <path d="m21 16-5-5-9 9" />
        </svg>
      </div>
    );
  }

  return <Image src={src} alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
