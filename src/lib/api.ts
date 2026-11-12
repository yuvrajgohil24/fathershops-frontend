import "server-only";

import type {
  Category,
  CategoryProductsResponse,
  Language,
  Product,
} from "@/lib/types";

const API_URL = (process.env.FATHERSHOP_API_URL ?? "http://127.0.0.1:8000/api/v1").replace(/\/+$/, "");
const REVALIDATE_SECONDS = Number(process.env.FATHERSHOP_API_REVALIDATE ?? 300);

/** The requested resource does not exist (API answered 404). */
export class NotFoundError extends Error {
  constructor(message = "Resource not found.") {
    super(message);
    this.name = "NotFoundError";
  }
}

/** The API could not be reached or answered with an unexpected status. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number | null,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type Query = Record<string, string | number | undefined>;

async function request<T>(path: string, query: Query = {}): Promise<T> {
  const url = new URL(`${API_URL}${path}`);

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  let response: Response;

  try {
    response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (cause) {
    throw new ApiError(`Unable to reach the catalogue service (${(cause as Error).message}).`, null);
  }

  if (response.status === 404) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new NotFoundError(body?.message);
  }

  if (!response.ok) {
    throw new ApiError(`Catalogue service responded with ${response.status}.`, response.status);
  }

  return (await response.json()) as T;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await request<{ data: Category[] }>("/categories");
  return data;
}

export function getCategoryProducts(
  categoryId: number,
  { page = 1, perPage = 12, lang }: { page?: number; perPage?: number; lang: Language },
): Promise<CategoryProductsResponse> {
  return request<CategoryProductsResponse>(`/categories/${categoryId}/products`, {
    page,
    per_page: perPage,
    lang,
  });
}

export async function getProduct(productId: number, lang: Language): Promise<Product> {
  const { data } = await request<{ data: Product }>(`/products/${productId}`, { lang });
  return data;
}
