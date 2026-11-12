import Link from "next/link";
import { RemoteImage } from "@/components/RemoteImage";
import { StockBadge } from "@/components/StockBadge";
import { formatPrice } from "@/lib/format";
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
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-square bg-subtle">
        <RemoteImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">
          <Link href={`/products/${product.id}?category=${categoryId}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          {price && <span className="text-base font-semibold">{price}</span>}
          <StockBadge inStock={product.in_stock} t={t} />
        </div>
      </div>
    </article>
  );
}
