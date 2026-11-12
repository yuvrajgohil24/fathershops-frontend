import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { ProductDescription } from "@/components/ProductDescription";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductOptions } from "@/components/ProductOptions";
import { StockBadge } from "@/components/StockBadge";
import { NotFoundError, getCategories, getProduct } from "@/lib/api";
import { LOCALES, formatPrice, parsePositiveInt } from "@/lib/format";
import { getI18n } from "@/lib/language";
import type { Language, Product } from "@/lib/types";

interface Props {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ category?: string | string[] }>;
}

async function load(productId: number, lang: Language): Promise<Product> {
  try {
    return await getProduct(productId, lang);
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = parsePositiveInt((await params).productId);
  if (!productId) return {};

  const { lang } = await getI18n();
  const product = await load(productId, lang);

  return {
    title: product.meta.title ?? product.name,
    description: product.meta.description ?? undefined,
    openGraph: product.image ? { images: [product.image] } : undefined,
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  const productId = parsePositiveInt((await params).productId);
  if (!productId) notFound();

  const { lang, t } = await getI18n();
  const product = await load(productId, lang);

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

          {price && <p className="display border-y-2 border-ink py-4 text-6xl tabular-nums">{price}</p>}

          <ProductOptions
            options={product.options}
            basePrice={product.price.amount}
            currency={product.price.currency}
            locale={LOCALES[lang]}
            requiredLabel={t.required}
            priceLabel={t.withOptions}
          />

          <section>
            <h2 className="mb-1 text-sm font-semibold">{t.specifications}</h2>
            <dl className="text-sm">
              {specs
                .filter((spec): spec is [string, string, boolean] => Boolean(spec[1]))
                .map(([label, value, isCode]) => (
                  <div key={label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-2.5">
                    <dt className="text-muted">{label}</dt>
                    <dd className={`break-all ${isCode ? "font-mono text-[0.8125rem]" : "font-medium"}`}>{value}</dd>
                  </div>
                ))}
            </dl>
          </section>
        </div>
      </div>

      <section className="mt-16 border-t-2 border-ink pt-6">
        <h2 className="display mb-6 text-4xl">{t.description}</h2>
        {product.description_html ? (
          <ProductDescription html={product.description_html} />
        ) : (
          <p className="text-muted">{t.noDescription}</p>
        )}
      </section>
    </article>
  );
}
