import type { Dictionary } from "@/lib/i18n";

/** Stock as a data line: status dot plus the real quantity. */
export function StockBadge({ inStock, quantity, t }: { inStock: boolean; quantity: number; t: Dictionary }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium tabular-nums ${inStock ? "text-success" : "text-danger"}`}>
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {inStock ? t.inStockCount(quantity) : t.soldOut}
    </span>
  );
}
