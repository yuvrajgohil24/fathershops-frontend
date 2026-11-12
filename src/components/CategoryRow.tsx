import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RemoteImage } from "@/components/RemoteImage";
import type { Category } from "@/lib/types";

interface Props {
  category: Category;
  label: string;
  subcategories: { id: number; label: string }[];
}

/**
 * One line of the catalogue index: thumbnail, condensed name, subcategory
 * links. The whole row links to the category; subcategory links sit above it.
 */
export function CategoryRow({ category, label, subcategories }: Props) {
  return (
    <li className="group relative grid grid-cols-[64px_1fr_auto] items-center gap-x-4 gap-y-3 border-b border-line py-5 transition-colors duration-200 hover:bg-paper-2 sm:grid-cols-[96px_1fr_auto] sm:gap-x-8 sm:px-4 sm:py-7 lg:grid-cols-[96px_minmax(0,1fr)_minmax(0,1fr)_auto]">
      <div className="relative aspect-square overflow-hidden bg-paper-2">
        <RemoteImage src={category.image} alt="" fill sizes="96px" className="object-cover mix-blend-multiply" />
      </div>

      <h2 className="display text-5xl sm:text-7xl">
        <Link
          href={`/categories/${category.id}`}
          className="transition-colors duration-200 after:absolute after:inset-0 group-hover:text-blue"
        >
          {label}
        </Link>
      </h2>

      <Icon
        name="arrow"
        className="col-start-3 row-start-1 size-8 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue lg:col-start-4 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
      />

      {subcategories.length > 0 && (
        <ul className="relative z-10 col-span-full flex flex-wrap gap-2 sm:col-start-2 lg:col-span-1 lg:col-start-3 lg:row-start-1">
          {subcategories.map((sub) => (
            <li key={sub.id}>
              <Link
                href={`/categories/${sub.id}`}
                className="inline-flex h-8 items-center rounded-[4px] border border-line-strong bg-paper px-3 text-sm font-medium transition-colors hover:border-blue hover:text-blue"
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
