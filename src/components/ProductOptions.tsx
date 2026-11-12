"use client";

import { useMemo, useState } from "react";
import { RemoteImage } from "@/components/RemoteImage";
import type { ProductOption } from "@/lib/types";

interface Props {
  options: ProductOption[];
  basePrice: number | null;
  currency: string | null;
  locale: string;
  requiredLabel: string;
  priceLabel: string;
}

/**
 * Lets the shopper pick option values and shows the resulting price
 * (each value carries a +/- price adjustment).
 */
export function ProductOptions({ options, basePrice, currency, locale, requiredLabel, priceLabel }: Props) {
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
    <div className="flex flex-col gap-6">
      {options.map((option) => {
        const chosen = option.values.find((v) => v.id === selected[option.id]);
        return (
          <fieldset key={option.id}>
            <legend className="mb-2.5 flex flex-wrap gap-x-2 text-sm">
              <span className="font-semibold">{option.name}</span>
              {chosen && <span className="text-ink-2">{chosen.name}</span>}
              {option.required && <span className="text-muted">· {requiredLabel}</span>}
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
                    className={`flex min-h-11 items-center gap-2 rounded-[4px] border px-3 text-sm transition-colors duration-150 ${
                      value.image ? "ps-1" : ""
                    } ${isActive ? "border-ink bg-ink text-white" : "border-line-strong hover:border-ink"}`}
                  >
                    {value.image && (
                      <span className="relative size-9 shrink-0 overflow-hidden rounded-[2px] bg-paper-2">
                        <RemoteImage src={value.image} alt="" fill sizes="36px" className="object-cover" />
                      </span>
                    )}
                    <span>{value.name}</span>
                    {value.price > 0 && (
                      <span className="tabular-nums opacity-75">
                        {value.price_prefix}
                        {format(value.price)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}
      {total !== null && total !== basePrice && (
        <p className="flex items-baseline gap-2 text-sm text-muted">
          {priceLabel}
          <span className="display text-2xl tabular-nums text-ink">{format(total)}</span>
        </p>
      )}
    </div>
  );
}
