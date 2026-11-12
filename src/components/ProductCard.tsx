import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RemoteImage } from "@/components/RemoteImage";
import { StockBadge } from "@/components/StockBadge";
import { formatPrice, isConverted } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n";
import type { Language, ProductSummary } from "@/lib/types";

interface Props {
  product: ProductSummary;
  categoryId: number;
  lang: Language;
  t: Dictionary;
}

export function ProductCard({ product, categoryId, lang, t }: Props) {
  const price = formatPrice(product.price, lang);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper p-3 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-bright/60 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-paper-2">
        <RemoteImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
        <div className="absolute start-2.5 top-2.5 z-10">
          <StockBadge inStock={product.in_stock} quantity={product.quantity} t={t} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-1.5 pt-3">
        {product.rating > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted">
            <span className="flex items-center gap-0.5 font-semibold text-amber-500">
              <Icon name="star" className="size-3.5 fill-amber-400 text-amber-400" />
              {product.rating.toFixed(1)}
            </span>
            <span>({product.reviews})</span>
          </div>
        )}

        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-blue">
          <Link
            href={`/products/${product.id}?category=${categoryId}`}
            className="after:absolute after:inset-0"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto flex items-baseline justify-between gap-2 border-t border-line/60 pt-2.5">
          {price && (
            <span className="text-xl font-bold tabular-nums tracking-tight text-ink">
              {isConverted(product.price) && <span className="me-0.5 font-medium text-muted">{t.approxPrefix}</span>}
              {price}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
            {lang === "ar" ? "عرض" : "View"}
            <Icon name="arrow" className="size-3 rtl:-scale-x-100" />
          </span>
        </div>
      </div>
    </article>
  );
}
