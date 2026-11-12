import type { Dictionary } from "@/lib/i18n";

export function StockBadge({ inStock, t }: { inStock: boolean; t: Dictionary }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        inStock ? "bg-success-soft text-success" : "bg-danger-soft text-danger"
      }`}
    >
      {inStock ? t.inStock : t.outOfStock}
    </span>
  );
}
