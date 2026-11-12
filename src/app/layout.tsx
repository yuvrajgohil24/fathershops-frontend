import type { Metadata } from "next";
import { Archivo, Noto_Kufi_Arabic } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { direction } from "@/lib/i18n";
import { getI18n } from "@/lib/language";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const kufi = Noto_Kufi_Arabic({ variable: "--font-kufi", subsets: ["arabic"] });

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();

  return {
    title: { default: t.brand, template: `%s · ${t.brand}` },
    description: t.tagline,
    icons: {
      icon: "/fathershops_img.png",
      apple: "/fathershops_img.png",
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { lang, t, currency } = await getI18n();

  return (
    <html lang={lang} dir={direction(lang)} className={`${archivo.variable} ${kufi.variable}`}>
      <body className={`${lang === "ar" ? "font-ar" : "font-sans"} flex min-h-dvh flex-col antialiased`}>
        <SiteHeader lang={lang} t={t} currency={currency} />
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 pb-20 pt-8 sm:px-8 sm:pt-12">{children}</main>
        <SiteFooter t={t} />
      </body>
    </html>
  );
}
