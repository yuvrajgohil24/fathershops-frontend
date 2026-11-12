/**
 * Curated high-resolution imagery for catalog categories.
 *
 * Upstream FatherStock categorisation frequently points to generic
 * "no_image-250x250.png" placeholders. This utility resolves categories
 * to tasteful, professional e-commerce visuals matching the category's theme.
 */

interface CategoryMatcher {
  match: RegExp;
  url: string;
}

const CATEGORY_IMAGE_MAP: CategoryMatcher[] = [
  {
    // Women's clothing / fashion
    match: /women|woman|ladies|female|نساء|نسائي/i,
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
  },
  {
    // Men's apparel & fashion
    match: /men|man|gentlemen|male|رجال|رجالي/i,
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
  },
  {
    // Kids / Children / Baby
    match: /kid|child|baby|toddler|infant|boy|girl|أطفال|اطفال|طفل/i,
    url: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=600&q=80",
  },
  {
    // Sportswear / Activewear / Fitness
    match: /sport|fitness|activewear|gym|athletic|workout|رياض/i,
    url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
  },
  {
    // Shoes & Footwear
    match: /shoe|footwear|sneaker|boot|أحذية|احذية|حذاء/i,
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    // Bags & Luggage
    match: /bag|handbag|backpack|luggage|purse|حقائب|شنط/i,
    url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
  },
  {
    // Watches
    match: /watch|timepiece|ساعات|ساعة/i,
    url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
  },
  {
    // Jewelry & Accessories
    match: /jewel|necklace|ring|earring|bracelet|مجوهرات|حلي/i,
    url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
  },
  {
    // Beauty & Personal Care
    match: /beauty|cosmetic|skincare|makeup|perfume|عناية|جمال|مكياج/i,
    url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
  },
  {
    // Electronics & Tech
    match: /electronic|gadget|phone|audio|tech|إلكترونيات|الكترونيات/i,
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    // Home & Living
    match: /home|garden|furniture|kitchen|decor|منزل|ديكور|أثاث/i,
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
  },
  {
    // Underwear & Sleepwear
    match: /underwear|sleepwear|lingerie|sock/i,
    url: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=600&q=80",
  },
];

const DEFAULT_CATEGORY_IMAGE =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80";

/**
 * Returns true if the image is missing, empty, or points to a generic
 * FatherStock / ceddropshipper placeholder image.
 */
export function isPlaceholderImage(url?: string | null): boolean {
  if (!url || typeof url !== "string") return true;
  const s = url.toLowerCase().trim();
  if (s === "") return true;

  return (
    s.includes("no_image") ||
    s.includes("ceddropshipper") ||
    s.includes("placeholder")
  );
}

/**
 * Resolves an appropriate image URL for a category.
 * If the current image is an authentic custom photo, it is preserved.
 * If it is missing or a placeholder, a category-relevant photo is chosen.
 */
export function getCategoryImage(
  name?: string | null,
  currentImage?: string | null,
): string {
  if (currentImage && !isPlaceholderImage(currentImage)) {
    return currentImage;
  }

  const query = (name ?? "").trim();
  if (!query) return DEFAULT_CATEGORY_IMAGE;

  for (const entry of CATEGORY_IMAGE_MAP) {
    if (entry.match.test(query)) {
      return entry.url;
    }
  }

  return DEFAULT_CATEGORY_IMAGE;
}
