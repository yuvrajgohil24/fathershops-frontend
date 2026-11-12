import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  basePath: string;
  page: number;
  lastPage: number;
  t: Dictionary;
}

export function Pagination({ basePath, page, lastPage, t }: Props) {
  if (lastPage <= 1) return null;

  const href = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);
  const linkClass =
    "rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:border-ink hover:bg-ink hover:text-surface";
  const disabledClass = "rounded-full border border-line px-4 py-2 text-sm font-medium opacity-40";

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-4">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className={linkClass}>
          {t.previous}
        </Link>
      ) : (
        <span aria-disabled className={disabledClass}>
          {t.previous}
        </span>
      )}
      <span className="text-sm text-muted">{t.pageOf(page, lastPage)}</span>
      {page < lastPage ? (
        <Link href={href(page + 1)} rel="next" className={linkClass}>
          {t.next}
        </Link>
      ) : (
        <span aria-disabled className={disabledClass}>
          {t.next}
        </span>
      )}
    </nav>
  );
}
