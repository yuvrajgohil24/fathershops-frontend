"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/ProductCard";
import { getDictionary } from "@/lib/i18n";
import type { Language, ProductSummary } from "@/lib/types";

interface Props {
  products: ProductSummary[];
  categoryId: number;
  lang: Language;
}

type SortOption = "default" | "price_asc" | "price_desc" | "rating" | "in_stock";

export function CategoryProductList({ products, categoryId, lang }: Props) {
  const t = getDictionary(lang);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q)));
    }

    switch (sort) {
      case "price_asc":
        list.sort((a, b) => (a.price.amount ?? 0) - (b.price.amount ?? 0));
        break;
      case "price_desc":
        list.sort((a, b) => (b.price.amount ?? 0) - (a.price.amount ?? 0));
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "in_stock":
        list.sort((a, b) => (b.in_stock ? 1 : 0) - (a.in_stock ? 1 : 0));
        break;
      default:
        break;
    }

    return list;
  }, [products, search, sort]);

  const sortLabels: Record<SortOption, string> = {
    default: lang === "ar" ? "الترتيب الافتراضي" : "Default sorting",
    price_asc: lang === "ar" ? "السعر: من الأقل للأعلى" : "Price: Low to High",
    price_desc: lang === "ar" ? "السعر: من الأعلى للأقل" : "Price: High to Low",
    rating: lang === "ar" ? "الأعلى تقييماً" : "Top Rated",
    in_stock: lang === "ar" ? "المتوفر أولاً" : "In Stock First",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search and Sort Toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-paper p-3 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Icon name="bag" className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "ar" ? "ابحث بالاسم أو رمز المنتج SKU..." : "Search by product name or SKU..."}
            className="h-9 w-full rounded-lg border border-line bg-paper-2 ps-9 pe-3 text-sm text-ink placeholder:text-muted transition-colors focus:border-blue focus:bg-paper focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="shrink-0 text-xs font-medium text-muted">
            {lang === "ar" ? "الترتيب:" : "Sort:"}
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-9 rounded-lg border border-line bg-paper-2 px-3 text-xs font-semibold text-ink transition-colors focus:border-blue focus:bg-paper focus:outline-hidden"
          >
            <option value="default">{sortLabels.default}</option>
            <option value="price_asc">{sortLabels.price_asc}</option>
            <option value="price_desc">{sortLabels.price_desc}</option>
            <option value="rating">{sortLabels.rating}</option>
            <option value="in_stock">{sortLabels.in_stock}</option>
          </select>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line p-12 text-center text-muted">
          <p className="text-sm font-medium">
            {search.trim()
              ? lang === "ar"
                ? "لا توجد نتائج مطابقة لبحثك في هذه الصفحة."
                : "No products match your search on this page."
              : t.noProducts}
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} categoryId={categoryId} lang={lang} t={t} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
