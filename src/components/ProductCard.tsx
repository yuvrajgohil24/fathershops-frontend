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

/** A cell of the hairline catalogue grid (borders come from the grid). */
export function ProductCard({ product, categoryId, lang, t }: Props) {
  const price = formatPrice(product.price, lang);

  return (
    <article className="group relative flex h-full flex-col bg-paper transition-colors duration-200 hover:bg-paper-2">
      <div className="relative m-3 aspect-square overflow-hidden bg-paper-2">
        <RemoteImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-1">
        <h3 className="line-clamp-2 text-[0.9375rem] font-medium leading-snug">
          <Link
            href={`/products/${product.id}?category=${categoryId}`}
            className="decoration-1 after:absolute after:inset-0 group-hover:underline"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
          {price && <span className="display text-3xl tabular-nums">{price}</span>}
          <StockBadge inStock={product.in_stock} quantity={product.quantity} t={t} />
        </div>
      </div>
    </article>
  );
}
