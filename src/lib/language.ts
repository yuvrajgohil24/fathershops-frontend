import "server-only";

import { cookies } from "next/headers";
import { CURRENCY_COOKIE, DEFAULT_CURRENCY, isCurrency } from "@/lib/currency";
import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE, getDictionary, isLanguage } from "@/lib/i18n";
import type { CurrencyCode, Language } from "@/lib/types";

export async function getLanguage(): Promise<Language> {
  const value = (await cookies()).get(LANGUAGE_COOKIE)?.value;
  return isLanguage(value) ? value : DEFAULT_LANGUAGE;
}

export async function getCurrency(): Promise<CurrencyCode> {
  const value = (await cookies()).get(CURRENCY_COOKIE)?.value;
  return isCurrency(value) ? value : DEFAULT_CURRENCY;
}

/** Visitor preferences: language, its dictionary and the display currency. */
export async function getI18n() {
  const [lang, currency] = await Promise.all([getLanguage(), getCurrency()]);
  return { lang, t: getDictionary(lang), currency };
}
