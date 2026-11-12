import type { Language, Price } from "@/lib/types";

export const LOCALES: Record<Language, string> = { en: "en-US", ar: "ar" };

/** Format an amount in the currency the API reported for it (never guessed client-side). */
export function formatMoney(amount: number | null, currency: string, lang: Language): string | null {
  if (amount === null || Number.isNaN(amount)) return null;

  return new Intl.NumberFormat(LOCALES[lang] ?? "en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPrice(price: Price, lang: Language): string | null {
  return formatMoney(price.amount, price.currency, lang);
}

/** True when the price was converted from the store currency (shown as approximate). */
export function isConverted(price: Price): boolean {
  return price.currency !== price.store_currency;
}

/** Parse a route segment / query value into a positive integer, or null when invalid. */
export function parsePositiveInt(value: string | string[] | undefined): number | null {
  if (typeof value !== "string" || !/^\d+$/.test(value)) return null;
  const n = Number(value);
  return Number.isSafeInteger(n) && n > 0 ? n : null;
}
