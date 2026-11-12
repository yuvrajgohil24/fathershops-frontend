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
      className="h-9 rounded-[4px] border border-white/25 px-3 text-sm font-semibold text-white transition-colors hover:border-white disabled:cursor-wait disabled:opacity-50"
    >
      {switchToLabel}
    </button>
  );
}
