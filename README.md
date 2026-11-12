# FatherShops Storefront (Next.js)

Frontend for the FatherShops technical task. A Next.js 15 (App Router) storefront that
shows categories, category products and product details using the
[Laravel API](../backend).

## Stack

- Next.js 15 · React 19 · TypeScript (strict)
- Tailwind CSS v4
- Server Components for all data fetching, with small client components for interactivity

## Requirements

- Node.js 18.18+ (tested on Node 24)
- The Laravel API running (default `http://127.0.0.1:8000`)

## Setup

```bash
npm install
cp .env.example .env.local     # adjust FATHERSHOP_API_URL if needed
npm run dev                    # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Quality checks:

```bash
npm run typecheck
npm run lint
```

## Pages

| Route | Description |
| --- | --- |
| `/` | Categories with images; subcategories are shown as chips on their parent |
| `/categories/[categoryId]` | Paginated product grid (`?page=`), category sidebar, breadcrumbs |
| `/products/[productId]` | Image gallery, price, stock, selectable options with price adjustment, specifications, sanitised description |

## Error handling

- **Not found**: when the API answers 404 (unknown or unavailable category/product,
  non-numeric id, out-of-range page), the page calls `notFound()`. The response has
  a real **HTTP 404** status and shows a localised 404 page.
- **API unavailable / unexpected error**: `ApiError` is thrown and caught by
  `app/error.tsx` (HTTP 500), which offers "Try again". Retry re-fetches the server
  components (`router.refresh()` + `reset()`).
- **Broken images**: product and category images fall back to a placeholder.
  Description images that the upstream image proxy fails to serve are hidden.
- The category sidebar and breadcrumbs degrade gracefully if the categories call fails.

## Architecture

```
src/
├─ app/
│  ├─ layout.tsx                    # <html lang/dir>, fonts, header
│  ├─ page.tsx                      # categories
│  ├─ categories/[categoryId]/      # category products
│  ├─ products/[productId]/         # product details
│  ├─ actions.ts                    # server action: set language cookie
│  ├─ error.tsx · not-found.tsx
├─ components/                      # UI components (client ones marked "use client")
└─ lib/
   ├─ api.ts                        # server-only typed API client (NotFoundError / ApiError)
   ├─ types.ts                      # API contract types
   ├─ i18n.ts · language.ts         # dictionaries, cookie-based language
   └─ format.ts                     # price formatting, id parsing
```

- `lib/api.ts` is `server-only`: the API URL never reaches the browser, and
  responses are cached in the Next.js data cache (`FATHERSHOP_API_REVALIDATE`,
  5 minutes by default) on top of the Laravel cache.
- **English / Arabic**: the language switcher sets an httpOnly `lang` cookie through
  a server action. Pages pass `lang` to the API, and the layout switches
  `dir="rtl"` and the Arabic font. Category names have no upstream translation,
  so they stay as provided.
- **Currency**: the header dropdown (SAR, USD, INR, GBP) sets an httpOnly `currency`
  cookie the same way. Pages pass `currency` to the API, which returns prices already
  converted, so the frontend never guesses a currency or does conversion maths. Each
  currency is a separate URL and so a separate cache entry. Converted prices show `≈`, and the
  product page notes the original SAR price, that the store charges in SAR, and the
  rates date. The list in `lib/currency.ts` must stay within the API's
  `SUPPORTED_CURRENCIES`.
- Images use `next/image` (optimised, lazy loaded); allowed hosts are listed in
  `next.config.ts`.

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `FATHERSHOP_API_URL` | `http://127.0.0.1:8000/api/v1` | Laravel API base URL (server-side only) |
| `FATHERSHOP_API_REVALIDATE` | `300` | Seconds to cache API responses |
