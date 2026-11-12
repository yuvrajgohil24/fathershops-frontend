import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { ProductDescription } from "@/components/ProductDescription";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductOptions } from "@/components/ProductOptions";
import { StockBadge } from "@/components/StockBadge";
import { NotFoundError, getCategories, getProduct } from "@/lib/api";
import { LOCALES, formatMoney, formatPrice, parsePositiveInt } from "@/lib/format";
import { getI18n } from "@/lib/language";
import type { CurrencyCode, Language, ProductResponse } from "@/lib/types";

interface Props {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ category?: string | string[] }>;
}

async function load(productId: number, lang: Language, currency: CurrencyCode): Promise<ProductResponse> {
  try {
    return await getProduct(productId, { lang, currency });
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = parsePositiveInt((await params).productId);
  if (!productId) return {};

  const { lang, currency } = await getI18n();
  const { data: product } = await load(productId, lang, currency);

  return {
    title: product.meta.title ?? product.name,
    description: product.meta.description ?? undefined,
    openGraph: product.image ? { images: [product.image] } : undefined,
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  const productId = parsePositiveInt((await params).productId);
  if (!productId) notFound();

  const { lang, t, currency } = await getI18n();
  const { data: product, currency: pricing } = await load(productId, lang, currency);

  const crumbs: Crumb[] = [{ label: t.home, href: "/" }];
  const fromCategory = parsePositiveInt((await searchParams).category);
  if (fromCategory) {
    const categories = await getCategories().catch(() => []);
    const category = categories.find((c) => c.id === fromCategory);
    crumbs.push({ label: category?.name ?? t.category(fromCategory), href: `/categories/${fromCategory}` });
  }
  crumbs.push({ label: product.name });

  const price = formatPrice(product.price, lang);
  const { dimensions: d } = product;
  const size = [d.length, d.width, d.height].filter((v): v is number => v !== null);
  // [label, value, isCode] — codes are set in mono so digits are easy to read back.
  const specs: [string, string | null, boolean][] = [
    [t.sku, product.sku, true],
    [t.model, product.model, true],
    [t.type, product.type, false],
    [t.source, product.source, false],
    [t.weight, d.weight !== null ? `${d.weight} ${d.weight_class ?? ""}`.trim() : null, false],
    [t.dimensions, size.length ? `${size.join(" × ")} ${d.length_class ?? ""}`.trim() : null, false],
  ];
  const images = product.images.length ? product.images : product.image ? [product.image] : [];
  const rating = product.rating.toFixed(1);

  return (
    <article>
      <Breadcrumbs items={crumbs} />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <ProductGallery
          images={images}
          name={product.name}
          labels={images.map((_, i) => t.imageOf(product.name, i + 1))}
        />

        <div className="flex flex-col gap-7 lg:sticky lg:top-24 lg:self-start">
          <header className="flex flex-col gap-3">
            <h1 className="text-balance text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-[1.75rem]">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <StockBadge inStock={product.in_stock} quantity={product.quantity} t={t} />
              <span className="inline-flex items-center gap-1 tabular-nums" aria-label={t.ratingOutOf(rating)}>
                <Icon name="star" className="size-3.5" />
                {rating}
              </span>
              <span className="tabular-nums">{t.reviews(product.reviews)}</span>
            </div>
          </header>

          {price && (
            <div className="rounded-2xl border border-line bg-paper-2 p-5 shadow-2xs">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
                {lang === "ar" ? "السعر" : "Price"}
              </span>
              <p className="text-4xl font-extrabold tracking-tight tabular-nums text-ink sm:text-5xl">
                {pricing.approximate && <span className="me-1 font-semibold text-muted">{t.approxPrefix}</span>}
                {price}
              </p>
              {pricing.approximate && (
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {t.approxNote(pricing.store_currency)}{" "}
                  <span className="font-semibold tabular-nums text-ink-2">
                    ({formatMoney(product.price.store_amount, product.price.store_currency, lang)})
                  </span>
                  {pricing.rates_updated_at && (
                    <>
                      {" · "}
                      {t.ratesAsOf(
                        new Intl.DateTimeFormat(LOCALES[lang], { dateStyle: "medium" }).format(
                          new Date(pricing.rates_updated_at),
                        ),
                      )}
                    </>
                  )}
                </p>
              )}
            </div>
          )}

          <ProductOptions
            options={product.options}
            basePrice={product.price.amount}
            currency={product.price.currency}
            locale={LOCALES[lang]}
            requiredLabel={t.required}
            priceLabel={t.withOptions}
            inStock={product.in_stock}
            addToCartLabel={t.addToCart}
            addedToCartLabel={t.addedToCart}
          />

          <section className="rounded-2xl border border-line bg-paper p-5 shadow-2xs">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">{t.specifications}</h2>
            <dl className="text-sm">
              {specs
                .filter((spec): spec is [string, string, boolean] => Boolean(spec[1]))
                .map(([label, value, isCode]) => (
                  <div key={label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line/60 py-2.5 last:border-0">
                    <dt className="text-muted">{label}</dt>
                    <dd className={`break-all ${isCode ? "font-mono text-[0.8125rem] text-ink-2" : "font-medium text-ink"}`}>{value}</dd>
                  </div>
                ))}
            </dl>
          </section>
        </div>
      </div>

      <section className="mt-14 rounded-2xl border border-line bg-paper p-6 shadow-2xs sm:p-8">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{t.description}</h2>
        {product.description_html ? (
          <ProductDescription html={product.description_html} />
        ) : (
          <p className="text-muted">{t.noDescription}</p>
        )}
      </section>
    </article>
  );
}
