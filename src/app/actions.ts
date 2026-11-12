"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { LANGUAGE_COOKIE, isLanguage } from "@/lib/i18n";

export async function setLanguage(lang: string): Promise<void> {
  if (!isLanguage(lang)) return;

  (await cookies()).set(LANGUAGE_COOKIE, lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: true,
  });

  revalidatePath("/", "layout");
}
