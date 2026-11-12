import { notFound } from "next/navigation";
import { CategoryCard } from "@/components/CategoryCard";
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

  const topLevel = categories.filter((c) => c.parent_id === null || !categories.some((p) => p.id === c.parent_id));
  const childrenOf = (id: number) => categories.filter((c) => c.parent_id === id);

  return (
    <>
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.shopByCategory}</h1>
        <p className="mt-2 text-muted">{t.tagline}</p>
      </section>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {topLevel.map((category) => (
          <li key={category.id} className="flex">
            <CategoryCard
              category={category}
              label={category.name || t.category(category.id)}
              cta={t.viewProducts}
              subcategories={childrenOf(category.id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
