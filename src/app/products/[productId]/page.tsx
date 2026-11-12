import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
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
  const specs: [string, string | null][] = [
    [t.sku, product.sku],
    [t.model, product.model],
    [t.type, product.type],
    [t.source, product.source],
    [t.weight, d.weight !== null ? `${d.weight} ${d.weight_class ?? ""}`.trim() : null],
    [t.dimensions, size.length ? `${size.join(" × ")} ${d.length_class ?? ""}`.trim() : null],
  ];
  const images = product.images.length ? product.images : product.image ? [product.image] : [];

  return (
    <article>
      <Breadcrumbs items={crumbs} />

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery
          images={images}
          name={product.name}
          labels={images.map((_, i) => t.imageOf(product.name, i + 1))}
        />

        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <StockBadge inStock={product.in_stock} t={t} />
              {product.in_stock && <span>{t.available(product.quantity)}</span>}
              <span>★ {product.rating.toFixed(1)}</span>
              <span>{t.reviews(product.reviews)}</span>
            </div>
          </header>

          {price && <p className="text-3xl font-semibold">{price}</p>}

          <ProductOptions
            options={product.options}
            basePrice={product.price.amount}
            currency={product.price.currency}
            locale={LOCALES[lang]}
            requiredLabel={t.required}
          />

          <section className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="mb-3 font-semibold">{t.specifications}</h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
              {specs
                .filter((spec): spec is [string, string] => Boolean(spec[1]))
                .map(([label, value]) => (
                  <div key={label} className="contents">
                    <dt className="text-muted">{label}</dt>
                    <dd className="break-all font-medium">{value}</dd>
                  </div>
                ))}
            </dl>
          </section>
        </div>
      </div>

      <section className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-semibold">{t.description}</h2>
        {product.description_html ? (
          <ProductDescription html={product.description_html} />
        ) : (
          <p className="text-muted">{t.noDescription}</p>
        )}
      </section>
    </article>
  );
}
