# FatherShops storefront — design system

## Direction

**The wholesale catalogue sheet.** FatherShops is a wholesale / dropshipping hub, so the
storefront reads like a printed trade catalogue set in the company's own colours
(black, white, electric blue — taken from fathershops.com). Products sit in a shared
hairline grid like catalogue pages, headings are condensed price-tag capitals, and real
catalogue data (SKU, model, stock count) is shown as data rather than hidden.

It deliberately refuses the generic storefront template: cream background, rounded
floating cards with hover lift, pill buttons, and a single warm accent.

Mode: **Operate** (browsing and comparing products). Ambition shows as precision and
consistency, not decoration.

## Colour

Restrained strategy: neutrals plus one accent with a fixed job.

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0a0a0b` | Text, header/footer bands, heavy rules, selected states |
| `--ink-2` | `#2b2e34` | Secondary body text |
| `--muted` | `#5b616b` | Meta text (≥ 4.5:1 on white) |
| `--paper` | `#ffffff` | Page ground |
| `--paper-2` | `#f3f4f6` | Image wells, hover fill |
| `--line` / `--line-strong` | `#e2e4e8` / `#c4c8cf` | Hairlines / control borders |
| `--blue` | `#0062cc` | Primary buttons, links, hover text (5.6:1, text-safe) |
| `--blue-bright` | `#037ef3` | Brand blue: selection, logo mark, the 404 numeral, button hover. Large type and fills only (3.9:1) |
| `--success` / `--danger` | `#0f7a43` / `#c0262d` | Stock status |

Blue never decorates: it marks actions, links, selection and the brand mark.

## Type

- **Archivo** (variable, `wdth` axis) for everything Latin. **Noto Kufi Arabic** for Arabic.
- `.display`: Archivo at `font-stretch: 72%`, weight 800, uppercase, `-0.015em`
  tracking, `0.92` line height. Used for page titles, category names, prices, the
  page counter and the 404 numeral. Arabic keeps Kufi's own proportions.
- Product names stay sentence case at weight 500 to 700. They are long marketplace titles,
  and capitals would make them unreadable.
- SKU and model codes use the system monospace stack. Prices and counts use
  `tabular-nums`.

## Shape and structure

- Radius: `0` for grid cells and image wells, `4px` for controls (matching the brand's
  buttons), `2px` for option swatches. No pills, and no rounded cards.
- Elevation: none. Structure comes from rules. A **2px ink rule** closes every page
  header and opens pagination and the description. **1px hairlines** separate rows and
  grid cells.
- The product grid is a single bordered sheet (`border-s/t` on the list and `border-e/b` on
  the cells), so uneven rows never leave gaps.

## Components

| Component | Notes |
| --- | --- |
| `SiteHeader` / `SiteFooter` | Black bands with the bag mark plus a condensed wordmark |
| `CategoryRow` | Catalogue index line: thumbnail, display-size name, subcategory chips, arrow. The whole row is a link |
| `ProductCard` | Grid cell: image well, 2-line name, display price, stock line |
| `ProductGallery` | Main image (`object-contain`) with a thumbnail rail (vertical ≥ lg, horizontal on mobile). The active thumb gets an inset 2px ink ring |
| `ProductOptions` | Square buttons with the option's own image as a swatch. Selected = ink fill |
| `StockBadge` | Status dot plus the real quantity ("3,496 in stock" / "Sold out") |
| `Pagination` | Outline "Previous", primary "Next", display-size `n / total` counter |
| `.btn`, `.btn-primary`, `.btn-outline` | 44px tall, 4px radius, 160ms colour transitions |
| `Icon` | One authored SVG set (1.75px stroke): arrow, chevron, star, image, bag |

## Motion

State only, 150 to 300ms, ease-out: colour changes, a 1.03 image scale on product
hover, and a 4px arrow nudge on category rows. There are no entrance animations.

## Browser surfaces

`::selection` in brand blue, `caret-color` blue, a 2px blue `:focus-visible` ring with
offset, a themed `scrollbar-color`, and `text-underline-offset: 0.2em`.

## RTL

Layout uses logical properties (`ms-`, `ps-`, `border-s/e`, `text-end`). Directional
icons flip with `rtl:-scale-x-100`.
