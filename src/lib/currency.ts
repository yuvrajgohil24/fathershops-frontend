import type { CurrencyCode } from "@/lib/types";

/**
 * Display currencies offered in the header. Must stay within the API's
 * SUPPORTED_CURRENCIES (the API answers 422 for anything else).
 * The store currency (SAR) comes first and is the default.
 */
export const CURRENCIES: CurrencyCode[] = ["SAR", "USD", "INR", "GBP"];
export const DEFAULT_CURRENCY: CurrencyCode = "SAR";
export const CURRENCY_COOKIE = "currency";

export function isCurrency(value: unknown): value is CurrencyCode {
  return typeof value === "string" && (CURRENCIES as string[]).includes(value);
}
