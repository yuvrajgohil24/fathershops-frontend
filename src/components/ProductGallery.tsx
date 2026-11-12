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
    <div className="flex flex-col gap-3 lg:flex-row-reverse">
      <div className="relative aspect-square flex-1 overflow-hidden bg-paper-2">
        <RemoteImage
          key={current ?? "empty"}
          src={current}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain mix-blend-multiply"
        />
      </div>
      {images.length > 1 && (
        <ul className="flex gap-2 overflow-x-auto pb-1 lg:max-h-[min(70vh,640px)] lg:w-20 lg:flex-col lg:overflow-y-auto lg:overflow-x-visible lg:pb-0">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={labels[i]}
                aria-pressed={i === active}
                className={`relative block size-16 overflow-hidden bg-paper-2 outline-offset-0 transition-[box-shadow] duration-150 lg:size-20 ${
                  i === active ? "shadow-[inset_0_0_0_2px_var(--ink)]" : "hover:shadow-[inset_0_0_0_1px_var(--line-strong)]"
                }`}
              >
                <RemoteImage src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
