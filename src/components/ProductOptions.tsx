"use client";

import { useMemo, useState } from "react";
import type { ProductOption } from "@/lib/types";

interface Props {
  options: ProductOption[];
  basePrice: number | null;
  currency: string | null;
  locale: string;
  requiredLabel: string;
}

/**
 * Lets the shopper pick option values and shows the resulting price
 * (each value carries a +/- price adjustment).
 */
export function ProductOptions({ options, basePrice, currency, locale, requiredLabel }: Props) {
  const [selected, setSelected] = useState<Record<number, number>>(() =>
    Object.fromEntries(options.filter((o) => o.values.length > 0).map((o) => [o.id, o.values[0].id])),
  );

  const total = useMemo(() => {
    if (basePrice === null) return null;

    return options.reduce((sum, option) => {
      const value = option.values.find((v) => v.id === selected[option.id]);
      if (!value) return sum;
      return value.price_prefix === "-" ? sum - value.price : sum + value.price;
    }, basePrice);
  }, [basePrice, options, selected]);

  const format = (n: number) =>
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...(currency ? { style: "currency", currency } : {}),
    }).format(n);

  if (options.length === 0) return null;

  return (
    <div className="flex flex-col gap-5">
      {options.map((option) => (
        <fieldset key={option.id}>
          <legend className="mb-2 text-sm font-medium">
            {option.name}
            {option.required && <span className="ms-2 text-xs text-muted">({requiredLabel})</span>}
          </legend>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isActive = selected[option.id] === value.id;
              return (
                <button
                  key={value.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelected((s) => ({ ...s, [option.id]: value.id }))}
                  className={`rounded-full border px-4 py-1.5 text-sm transition ${
                    isActive ? "border-accent bg-accent text-white" : "border-line hover:border-ink"
                  }`}
                >
                  {value.name}
                  {value.price > 0 && (
                    <span className="ms-1 opacity-80">
                      ({value.price_prefix}
                      {format(value.price)})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
      {total !== null && total !== basePrice && (
        <p className="text-sm text-muted">
          = <span className="font-semibold text-ink">{format(total)}</span>
        </p>
      )}
    </div>
  );
}
