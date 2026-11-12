"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CURRENCY_COOKIE, isCurrency } from "@/lib/currency";
import { LANGUAGE_COOKIE, isLanguage } from "@/lib/i18n";

const PREFERENCE_COOKIE = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax",
  httpOnly: true,
} as const;

export async function setLanguage(lang: string): Promise<void> {
  if (!isLanguage(lang)) return;

  (await cookies()).set(LANGUAGE_COOKIE, lang, PREFERENCE_COOKIE);
  revalidatePath("/", "layout");
}

export async function setCurrency(currency: string): Promise<void> {
  if (!isCurrency(currency)) return;

  (await cookies()).set(CURRENCY_COOKIE, currency, PREFERENCE_COOKIE);
  revalidatePath("/", "layout");
}
