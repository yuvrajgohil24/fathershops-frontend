import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n";
import type { Language } from "@/lib/types";

export function SiteHeader({ lang, t }: { lang: Language; t: Dictionary }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-accent text-sm font-bold text-white">
            F
          </span>
          <span className="text-lg">{t.brand}</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hidden text-muted hover:text-ink sm:inline">
            {t.categories}
          </Link>
          <LanguageSwitcher current={lang} label={t.language} switchToLabel={t.switchTo} />
        </nav>
      </div>
    </header>
  );
}
