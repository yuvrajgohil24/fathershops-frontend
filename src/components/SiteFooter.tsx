import Link from "next/link";
import { Wordmark } from "@/components/SiteHeader";
import type { Dictionary } from "@/lib/i18n";

export function SiteFooter({ t }: { t: Dictionary }) {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div className="flex flex-col gap-2">
          <Link href="/" aria-label={t.home} className="w-fit">
            <Wordmark t={t} />
          </Link>
          <p className="text-sm text-white/65">{t.tagline}</p>
        </div>
        <p className="text-sm text-white/65">
          © {new Date().getFullYear()} {t.brand}
        </p>
      </div>
    </footer>
  );
}
