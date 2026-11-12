import "server-only";

import { cookies } from "next/headers";
import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE, getDictionary, isLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/types";

export async function getLanguage(): Promise<Language> {
  const value = (await cookies()).get(LANGUAGE_COOKIE)?.value;
  return isLanguage(value) ? value : DEFAULT_LANGUAGE;
}

export async function getI18n() {
  const lang = await getLanguage();
  return { lang, t: getDictionary(lang) };
}
