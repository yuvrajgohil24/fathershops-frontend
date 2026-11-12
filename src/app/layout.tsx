import type { Metadata } from "next";
import { Geist, Noto_Sans_Arabic } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { direction } from "@/lib/i18n";
import { getI18n } from "@/lib/language";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const notoArabic = Noto_Sans_Arabic({ variable: "--font-arabic", subsets: ["arabic"] });

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();

  return {
    title: { default: t.brand, template: `%s · ${t.brand}` },
    description: t.tagline,
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { lang, t } = await getI18n();

  return (
    <html lang={lang} dir={direction(lang)} className={`${geistSans.variable} ${notoArabic.variable}`}>
      <body className={`${lang === "ar" ? "font-ar" : "font-sans"} min-h-dvh antialiased`}>
        <SiteHeader lang={lang} t={t} />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
        <footer className="border-t border-line py-8 text-center text-sm text-muted">
          © {new Date().getFullYear()} {t.brand}
        </footer>
      </body>
    </html>
  );
}
