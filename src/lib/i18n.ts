import type { Language } from "@/lib/types";

export const LANGUAGES: Language[] = ["en", "ar"];
export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_COOKIE = "lang";

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && (LANGUAGES as string[]).includes(value);
}

export function direction(lang: Language): "ltr" | "rtl" {
  return lang === "ar" ? "rtl" : "ltr";
}

const dictionaries = {
  en: {
    brand: "FatherShops",
    tagline: "The FatherShops wholesale catalogue, by department.",
    home: "Home",
    categories: "Categories",
    categoryCount: (n: number) => `${n} ${n === 1 ? "category" : "categories"}`,
    inStockCount: (n: number) => `${n.toLocaleString("en")} in stock`,
    soldOut: "Sold out",
    pageShort: (page: number, total: number) => `${page} / ${total}`,
    ratingOutOf: (r: string) => `${r} out of 5`,
    withOptions: "With selected options",
    products: "Products",
    productCount: (n: number) => `${n} ${n === 1 ? "product" : "products"}`,
    noProducts: "This category has no products yet.",
    reviews: (n: number) => `${n} ${n === 1 ? "review" : "reviews"}`,
    sku: "SKU",
    model: "Model",
    type: "Type",
    source: "Source",
    weight: "Weight",
    dimensions: "Dimensions",
    description: "Description",
    specifications: "Specifications",
    noDescription: "No description available for this product.",
    required: "Required",
    previous: "Previous",
    next: "Next",
    pageOf: (page: number, total: number) => `Page ${page} of ${total}`,
    notFoundTitle: "Not found",
    notFoundBody: "We couldn't find what you were looking for. It may have been removed or never existed.",
    backHome: "Back to categories",
    errorTitle: "Something went wrong",
    errorBody: "We couldn't load this page right now. Please try again.",
    retry: "Try again",
    language: "Language",
    switchTo: "العربية",
    category: (id: number) => `Category #${id}`,
    imageOf: (name: string, i: number) => `${name} – image ${i}`,
  },
  ar: {
    brand: "فاذر شوبس",
    tagline: "كتالوج فاذر شوبس للجملة، حسب القسم.",
    home: "الرئيسية",
    categories: "الفئات",
    categoryCount: (n: number) => `${n} فئات`,
    inStockCount: (n: number) => `${n.toLocaleString("ar")} في المخزون`,
    soldOut: "نفدت الكمية",
    pageShort: (page: number, total: number) => `${page} / ${total}`,
    ratingOutOf: (r: string) => `${r} من 5`,
    withOptions: "مع الخيارات المحددة",
    products: "المنتجات",
    productCount: (n: number) => `${n} منتج`,
    noProducts: "لا توجد منتجات في هذه الفئة بعد.",
    reviews: (n: number) => `${n} تقييم`,
    sku: "رمز المنتج",
    model: "الموديل",
    type: "النوع",
    source: "المصدر",
    weight: "الوزن",
    dimensions: "الأبعاد",
    description: "الوصف",
    specifications: "المواصفات",
    noDescription: "لا يوجد وصف لهذا المنتج.",
    required: "مطلوب",
    previous: "السابق",
    next: "التالي",
    pageOf: (page: number, total: number) => `صفحة ${page} من ${total}`,
    notFoundTitle: "غير موجود",
    notFoundBody: "لم نتمكن من العثور على ما تبحث عنه. ربما تمت إزالته أو أنه غير موجود.",
    backHome: "العودة إلى الفئات",
    errorTitle: "حدث خطأ ما",
    errorBody: "تعذر تحميل هذه الصفحة الآن. يرجى المحاولة مرة أخرى.",
    retry: "إعادة المحاولة",
    language: "اللغة",
    switchTo: "English",
    category: (id: number) => `الفئة رقم ${id}`,
    imageOf: (name: string, i: number) => `${name} – صورة ${i}`,
  },
} satisfies Record<Language, Record<string, unknown>>;

export type Dictionary = (typeof dictionaries)["en"];

export function getDictionary(lang: Language): Dictionary {
  return dictionaries[lang];
}
