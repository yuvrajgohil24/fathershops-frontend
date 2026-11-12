import Image from "next/image";
import Link from "next/link";
import { CurrencySwitcher } from "@/components/CurrencySwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n";
import type { CurrencyCode, Language } from "@/lib/types";

export function Wordmark({ t }: { t: Dictionary }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/fathershops_img.png"
        alt="FatherShops"
        width={26}
        height={26}
        className="size-6.5 shrink-0 object-contain rounded"
        priority
      />
      <span className="text-xl font-extrabold tracking-[-0.02em] [font-stretch:85%]">{t.brand}</span>
    </span>
  );
}

export function SiteHeader({ lang, t, currency }: { lang: Language; t: Dictionary; currency: CurrencyCode }) {
  return (
    <header className="sticky top-0 z-30 bg-ink text-white">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-8">
        <Link href="/" aria-label={t.home}>
          <Wordmark t={t} />
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link href="/" className="hidden rounded-[4px] px-3 py-2 text-white/80 transition-colors hover:text-white sm:block">
            {t.categories}
          </Link>
          <CurrencySwitcher current={currency} label={t.currency} />
          <LanguageSwitcher current={lang} label={t.language} switchToLabel={t.switchTo} />
        </nav>
      </div>
    </header>
  );
}
