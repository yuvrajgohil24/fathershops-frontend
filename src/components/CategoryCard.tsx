import Link from "next/link";
import { RemoteImage } from "@/components/RemoteImage";
import type { Category } from "@/lib/types";

interface Props {
  category: Category;
  label: string;
  cta: string;
  subcategories?: Category[];
}

export function CategoryCard({ category, label, cta, subcategories = [] }: Props) {
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[4/3] bg-subtle">
        <RemoteImage
          src={category.image}
          alt={label}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold">
          <Link href={`/categories/${category.id}`} className="after:absolute after:inset-0">
            {label}
          </Link>
        </h3>
        {subcategories.length > 0 && (
          <ul className="relative z-10 flex flex-wrap gap-2">
            {subcategories.map((sub) => (
              <li key={sub.id}>
                <Link
                  href={`/categories/${sub.id}`}
                  className="rounded-full bg-subtle px-3 py-1 text-xs font-medium text-muted hover:bg-accent hover:text-white"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <span className="mt-auto text-sm font-medium text-accent">{cta} →</span>
      </div>
    </article>
  );
}
