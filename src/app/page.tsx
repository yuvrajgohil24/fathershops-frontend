import { notFound } from "next/navigation";
import { CategoryRow } from "@/components/CategoryRow";
import { NotFoundError, getCategories } from "@/lib/api";
import { getI18n } from "@/lib/language";
import type { Category } from "@/lib/types";

export default async function HomePage() {
  const { t } = await getI18n();

  let categories: Category[];
  try {
    categories = await getCategories();
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }

  const label = (c: Category) => c.name || t.category(c.id);
  const isRoot = (c: Category) => c.parent_id === null || !categories.some((p) => p.id === c.parent_id);
  const roots = categories.filter(isRoot);

  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b-2 border-ink pb-6">
        <h1 className="display text-6xl sm:text-8xl lg:text-9xl">{t.categories}</h1>
        <p className="max-w-xs pb-2 text-muted sm:text-end">
          {t.tagline}
          <span className="mt-1 block font-semibold tabular-nums text-ink">{t.categoryCount(categories.length)}</span>
        </p>
      </header>

      <ul>
        {roots.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            label={label(category)}
            subcategories={categories
              .filter((c) => c.parent_id === category.id)
              .map((c) => ({ id: c.id, label: label(c) }))}
          />
        ))}
      </ul>
    </>
  );
}
