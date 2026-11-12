"use client";

import { useTransition } from "react";
import { setCurrency } from "@/app/actions";
import { CURRENCIES } from "@/lib/currency";
import type { CurrencyCode } from "@/lib/types";

interface Props {
  current: CurrencyCode;
  label: string;
}

/** Native select: keyboard and screen-reader friendly, and opens the OS picker on mobile. */
export function CurrencySwitcher({ current, label }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={current}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value;
          startTransition(() => setCurrency(next));
        }}
        className="h-9 cursor-pointer appearance-none rounded-[4px] border border-white/25 bg-transparent pe-7 ps-3 text-sm font-semibold tabular-nums text-white transition-colors hover:border-white disabled:cursor-wait disabled:opacity-50"
      >
        {CURRENCIES.map((code) => (
          <option key={code} value={code} className="bg-ink text-white">
            {code}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="pointer-events-none absolute end-2 top-1/2 size-3.5 -translate-y-1/2 text-white/70"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}
