import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "@/components/ProductCard";
import { NotFoundError, getCategories, getCategoryProducts } from "@/lib/api";
import { parsePositiveInt } from "@/lib/format";
import { getI18n } from "@/lib/language";
import type { Category, CategoryProductsResponse, Language } from "@/lib/types";

const PER_PAGE = 12;

interface Props {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}

async function load(categoryId: number, page: number, lang: Language): Promise<CategoryProductsResponse> {
  try {
    return await getCategoryProducts(categoryId, { page, perPage: PER_PAGE, lang });
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryId = parsePositiveInt((await params).categoryId);
  if (!categoryId) return {};

  const { lang, t } = await getI18n();
  const { category } = await load(categoryId, 1, lang);

  return { title: category.name ?? t.category(categoryId) };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const categoryId = parsePositiveInt((await params).categoryId);
  const rawPage = (await searchParams).page;
  const page = rawPage === undefined ? 1 : parsePositiveInt(rawPage);

  if (!categoryId || !page) notFound();

  const { lang, t } = await getI18n();
  const { data: products, meta, category } = await load(categoryId, page, lang);

  if (page > 1 && page > meta.last_page) notFound();

  // The sidebar is a convenience: a failure here must not break the page.
  const allCategories: Category[] = await getCategories().catch(() => []);
  const title = category.name ?? t.category(categoryId);
  const parent = allCategories.find((c) => c.id === category.parent_id);

  // Order the sidebar as a tree: each root followed by its children.
  const isRoot = (c: Category) => c.parent_id === null || !allCategories.some((p) => p.id === c.parent_id);
  const sidebar = allCategories
    .filter(isRoot)
    .flatMap((root) => [root, ...allCategories.filter((c) => c.parent_id === root.id)]);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: t.home, href: "/" },
          ...(parent ? [{ label: parent.name ?? t.category(parent.id), href: `/categories/${parent.id}` }] : []),
          { label: title },
        ]}
      />

      <header className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b-2 border-ink pb-5">
        <h1 className="display text-6xl sm:text-8xl">{title}</h1>
        <p className="pb-1 text-sm font-semibold tabular-nums text-muted">
          {t.productCount(meta.total)}
          {meta.last_page > 1 && <span className="ms-3 font-normal">{t.pageOf(meta.current_page, meta.last_page)}</span>}
        </p>
      </header>

      <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[200px_1fr]">
        {sidebar.length > 0 && (
          <nav aria-label={t.categories} className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="mb-2 hidden text-sm font-semibold lg:block">{t.categories}</h2>
            <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
              {sidebar.map((c) => {
                const active = c.id === categoryId;
                return (
                  <li key={c.id} className="shrink-0">
                    <Link
                      href={`/categories/${c.id}`}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-2 rounded-[4px] px-3 py-2 text-sm transition-colors lg:px-2 ${
                        c.parent_id ? "lg:ps-6" : ""
                      } ${
                        active
                          ? "bg-ink font-semibold text-white"
                          : "border border-line text-ink-2 hover:border-ink lg:border-transparent lg:hover:border-transparent lg:hover:bg-paper-2"
                      }`}
                    >
                      {c.name ?? t.category(c.id)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        <section aria-label={t.products}>
          {products.length === 0 ? (
            <p className="border border-dashed border-line-strong p-10 text-center text-muted">{t.noProducts}</p>
          ) : (
            <ul className="grid grid-cols-2 border-s border-t border-line md:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <li key={product.id} className="border-b border-e border-line">
                  <ProductCard product={product} categoryId={categoryId} lang={lang} t={t} />
                </li>
              ))}
            </ul>
          )}

          <Pagination basePath={`/categories/${categoryId}`} page={meta.current_page} lastPage={meta.last_page} t={t} />
        </section>
      </div>
    </>
  );
}
