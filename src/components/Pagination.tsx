import Link from "next/link";
import { Icon } from "@/components/Icon";
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

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-between gap-4 border-t-2 border-ink pt-6">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className="btn btn-outline">
          <Icon name="arrow" className="size-4 -scale-x-100 rtl:scale-x-100" />
          {t.previous}
        </Link>
      ) : (
        <span aria-disabled="true" className="btn btn-outline">
          <Icon name="arrow" className="size-4 -scale-x-100 rtl:scale-x-100" />
          {t.previous}
        </span>
      )}
      <span className="display text-2xl tabular-nums" aria-label={t.pageOf(page, lastPage)}>
        {t.pageShort(page, lastPage)}
      </span>
      {page < lastPage ? (
        <Link href={href(page + 1)} rel="next" className="btn btn-primary">
          {t.next}
          <Icon name="arrow" className="size-4 rtl:-scale-x-100" />
        </Link>
      ) : (
        <span aria-disabled="true" className="btn btn-primary">
          {t.next}
          <Icon name="arrow" className="size-4 rtl:-scale-x-100" />
        </span>
      )}
    </nav>
  );
}
