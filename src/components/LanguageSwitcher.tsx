"use client";

import { useTransition } from "react";
import { setLanguage } from "@/app/actions";
import type { Language } from "@/lib/types";

interface Props {
  current: Language;
  label: string;
  switchToLabel: string;
}

export function LanguageSwitcher({ current, label, switchToLabel }: Props) {
  const [pending, startTransition] = useTransition();
  const next: Language = current === "en" ? "ar" : "en";

  return (
    <button
      type="button"
      lang={next}
      aria-label={`${label}: ${switchToLabel}`}
      disabled={pending}
      onClick={() => startTransition(() => setLanguage(next))}
      className="rounded-full border border-line px-4 py-1.5 text-sm font-medium transition hover:border-ink hover:bg-ink hover:text-surface disabled:cursor-wait disabled:opacity-60"
    >
      {switchToLabel}
    </button>
  );
}
