import type { Language, Price } from "@/lib/types";

export const LOCALES: Record<Language, string> = { en: "en-GB", ar: "ar" };

export function formatPrice(price: Price | number | null, lang: Language, currency?: string | null): string | null {
  const amount = typeof price === "number" || price === null ? price : price.amount;
  const code = typeof price === "object" && price !== null ? price.currency : currency;

  if (amount === null || Number.isNaN(amount)) return null;

  return new Intl.NumberFormat(LOCALES[lang], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...(code ? { style: "currency", currency: code } : {}),
  }).format(amount);
}

/** Parse a route segment / query value into a positive integer, or null when invalid. */
export function parsePositiveInt(value: string | string[] | undefined): number | null {
  if (typeof value !== "string" || !/^\d+$/.test(value)) return null;
  const n = Number(value);
  return Number.isSafeInteger(n) && n > 0 ? n : null;
}
