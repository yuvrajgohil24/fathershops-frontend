"use client";

import { useState } from "react";
import { RemoteImage } from "@/components/RemoteImage";

interface Props {
  images: string[];
  name: string;
  /** Accessible label for each thumbnail, same order as images. */
  labels: string[];
}

export function ProductGallery({ images, name, labels }: Props) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? null;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-subtle">
        <RemoteImage
          key={current ?? "empty"}
          src={current}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
      {images.length > 1 && (
        <ul className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={labels[i]}
                aria-pressed={i === active}
                className={`relative block aspect-square w-full overflow-hidden rounded-lg border-2 bg-subtle transition ${
                  i === active ? "border-accent" : "border-transparent hover:border-line"
                }`}
              >
                <RemoteImage src={src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
