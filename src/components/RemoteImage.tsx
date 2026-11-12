"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Icon } from "@/components/Icon";

type Props = Omit<ImageProps, "src"> & { src: string | null };

/**
 * next/image with a neutral placeholder when the URL is missing or the
 * remote host fails to serve the file.
 */
export function RemoteImage({ src, alt, className, ...props }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div role="img" aria-label={alt} className="flex size-full items-center justify-center bg-paper-2 text-line-strong">
        <Icon name="image" className="size-1/4 max-h-12 max-w-12" />
      </div>
    );
  }

  return <Image src={src} alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
