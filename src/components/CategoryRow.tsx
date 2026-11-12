import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RemoteImage } from "@/components/RemoteImage";
import { getCategoryImage } from "@/lib/categoryImages";
import type { Category } from "@/lib/types";

interface Props {
  category: Category;
  label: string;
  subcategories: { id: number; label: string }[];
}

/**
 * Modern category card/row with rounded borders, soft hover shadow, and chips.
 */
export function CategoryRow({ category, label, subcategories }: Props) {
  const imageUrl = getCategoryImage(category.name || label, category.image);

  return (
    <li className="group relative grid grid-cols-[64px_1fr_auto] items-center gap-x-4 gap-y-3 rounded-2xl border border-line bg-paper p-4 mb-4 shadow-2xs transition-all duration-300 hover:border-blue-bright/60 hover:shadow-md sm:grid-cols-[96px_1fr_auto] sm:gap-x-8 sm:p-6 lg:grid-cols-[96px_minmax(0,1fr)_minmax(0,1fr)_auto]">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-paper-2">
        <RemoteImage
          src={imageUrl}
          alt={label}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-blue sm:text-3xl lg:text-4xl">
        <Link
          href={`/categories/${category.id}`}
          className="after:absolute after:inset-0"
        >
          {label}
        </Link>
      </h2>

      <div className="col-start-3 row-start-1 flex size-10 items-center justify-center rounded-full bg-paper-2 text-muted transition-all duration-200 group-hover:bg-blue group-hover:text-white lg:col-start-4">
        <Icon
          name="arrow"
          className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
        />
      </div>

      {subcategories.length > 0 && (
        <ul className="relative z-10 col-span-full flex flex-wrap gap-2 sm:col-start-2 lg:col-span-1 lg:col-start-3 lg:row-start-1">
          {subcategories.map((sub) => (
            <li key={sub.id}>
              <Link
                href={`/categories/${sub.id}`}
                className="inline-flex h-8 items-center rounded-full border border-line bg-paper-2 px-3.5 text-xs font-medium text-ink-2 transition-colors hover:border-blue hover:bg-blue hover:text-white"
              >
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
