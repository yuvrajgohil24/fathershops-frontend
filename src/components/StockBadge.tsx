import type { Dictionary } from "@/lib/i18n";

/** Stock as a modern rounded pill badge. */
export function StockBadge({ inStock, quantity, t }: { inStock: boolean; quantity: number; t: Dictionary }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums border backdrop-blur-xs ${
        inStock
          ? "border-emerald-200 bg-emerald-50/90 text-emerald-700"
          : "border-rose-200 bg-rose-50/90 text-rose-700"
      }`}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
      {inStock ? t.inStockCount(quantity) : t.soldOut}
    </span>
  );
}
