# Antonio's Real NY Pizza — Shopify Build Roadmap
**GitHub:** https://github.com/ccz6ih/Antonio-s-Real-NY-Pizza.git
**Theme:** Savor (base) + custom sections
**Stack:** Shopify Liquid · GSAP · Vanilla JS · Metafields · Line Item Properties

---

## About The Restaurant
**Antonio's Real NY Pizza** — Colorado's #1 New York Pizzeria (Washington Post, Sept 2023)
- Locations: Estes Park CO (1560 Big Thompson Ave) + Longmont CO (325 Main St)
- Founded 2014 by Antonio & Tracey — 4th generation Italian New Yorkers from Long Island NY
- Competed in Parma, Italy 2023. 2nd place World's Best Cheese Slice — International Pizza Expo 2024
- Styles: NY Round, Sicilian, Grandma, Detroit Red Top, Chicago Tavern, Neapolitan
- Also: House-made NY bagels, cannoli (Tracey's family recipe), pasta, heros, wings

---

## Legend
- ✅ Done  |  🔄 In Progress  |  🔲 Not Started  |  🔥 High Priority

---

## PHASE 1 — Foundation ✅

- ✅ Shopify store created
- ✅ Savor theme installed (Dawn removed)
- ✅ GitHub repo: https://github.com/ccz6ih/Antonio-s-Real-NY-Pizza.git
- ✅ Architecture: Size = variant (price), Customizations = Line Item Properties
- ✅ Metafield router pattern: `custom.pizza_option_set`
- ✅ _docs folder: ROADMAP, AGENT-PROMPTS, METAFIELDS, ICONS, ARCHITECTURE, QUICKREF
- ✅ Custom topping icons uploaded to Shopify CDN

---

## PHASE 2 — Products & Data ✅

- ✅ Full menu scraped live from antonios.pizza via Chrome automation
- ✅ 58 menu items with real names, prices, descriptions, images confirmed
- ✅ All 52 product images found on Weebly CDN (129193170.cdn6.editmysite.com)
- ✅ Final product CSV built: `antonios_final_v1.csv`
  - 52 unique products, 120 variant rows, 0 column errors
  - Every product has a real image URL pointing to actual Antonio's photos
- ✅ _scraper/scrape.js updated with confirmed image map for all 52 products

### Real Menu Categories (from live site)
| Category | Count | Products |
|---|---|---|
| Pizza — NY Round | 4 | 10", 14", 18", 26" Thin Crust |
| Pizza — Margherita | 1 | 4 sizes (10/14/18/26") |
| Pizza — Specialty | 10 | Grandma Lita, Spicy Calabrian, Pesto Chicken, GOAT Tony G, Colors of Italy, Godfather, Greek, Johnny Pizza Guy, Vegan, Campania Veggie |
| Pizza — Neapolitan | 1 | 3 styles + XL |
| Pizza — Keto | 1 | Cast iron no-crust |
| Pizza — Chicago Tavern | 1 | 14" only |
| Pizza — Sicilian | 2 | Small 12x12, XL 26x18 |
| Pizza — Detroit Red Top | 2 | Small 10x14, Large 12x17 |
| Pizza — Grandma | 1 | SM + LG |
| Calzones | 4 | Personal, Regular 14", Godfather, Monster |
| Dessert | 4 | Tiramisu, XL Cookie, Fudge Brownie, Monkey Bread |
| Wings | 1 | Jumbo Chicken Wings (5 sauce variants) |
| Beverages | 1 | Cans of Soda (5 flavors) |
| Pasta | 5 | Marinara/Meat, di Antonio, Penne Alfredo, Campania, Tikka Masala |
| Salads | 4 | Antipasto, House, Italian, Mozzarella Caprese |
| Sides | 5 | Garlic Knots, Garlic Bread, Meatballs, Italian Bread, Pretzels |
| Bagels | 1 | NY Bagels (5 styles) |
| Heros | 4 | Meatball Parm, Caprese Cold, Sausage Pepper, Ham Cheese |

---

## PHASE 3 — Shopify Admin Setup 🔥

- 🔲 Import `antonios_final_v1.csv` → Shopify Admin → Products → Import
- 🔲 Create metafield definition: `custom.pizza_option_set` (single line text)
- 🔲 Assign metafields to all products (bulk CSV in METAFIELDS.md)
- 🔲 Create Collections (9): Pizzas, Calzones, Desserts, Wings, Beverages, Pasta, Salads, Sides, Bagels, Heros
- 🔲 Add product images (Shopify will fetch from CDN URLs in CSV on import)
- 🔲 Create `custom.pizza_badge` metafield (Bestseller, New, Spicy, Signature, etc.)

### Option Set Values (`custom.pizza_option_set`)
| Value | Products |
|---|---|
| `whole-pizza` | All NY Round, Margherita, Specialty, Neapolitan, Keto, Chicago, Sicilian, Detroit, Grandma |
| `calzone` | All Calzones |
| `appetizer` | Wings, Garlic Knots, Garlic Bread, Meatballs, Pretzels, Bagels |
| `pasta` | All Pasta |
| `salad` | All Salads |
| `sandwich` | All Heros |
| `dessert` | Tiramisu, Cookie, Brownie, Monkey Bread |
| `drink` | Cans of Soda |

---

## PHASE 4 — Pizza Builder (Core Feature) 🔥

### Files to Create
- 🔲 `sections/pizza-builder.liquid` — routes by `custom.pizza_option_set`
- 🔲 `snippets/pizza-builder-whole.liquid` — full multi-step builder
- 🔲 `snippets/pizza-builder-calzone.liquid` — filling selector
- 🔲 `snippets/pizza-builder-simple.liquid` — quantity + notes only

### Builder Steps (whole-pizza)
1. **Size** → Shopify variant (drives price)
2. **Sauce** → Red / White Garlic / Red and White Striped / No Sauce
3. **Cheese** → Bacio Mozz / Fresh Mozz / Extra Cheese / No Cheese
4. **Toppings** → Icon grid, multi-select, +$1.50 each shown live
5. **Cut Style** → Triangle / Square / No Cut
6. **Special Instructions** → 200 char textarea
7. **Confirm** → Summary + Add to Cart

---

## PHASE 5 — Custom Sections 🔲

- 🔲 `sections/antonio-hero.liquid` — full-bleed hero, GSAP text reveal
- 🔲 `sections/antonio-menu-nav.liquid` — sticky category nav
- 🔲 `sections/antonio-specials-marquee.liquid` — GSAP infinite ticker
- 🔲 `sections/antonio-menu-grid.liquid` — product grid with filter tabs
- 🔲 `sections/antonio-story.liquid` — "Long Island Born" brand story
- 🔲 `sections/antonio-reviews.liquid` — horizontal scroll review ticker
- 🔲 `sections/antonio-floating-cart.liquid` — sticky cart trigger
- 🔲 `sections/antonio-ingredient-belt.liquid` — floating ingredient icons

---

## PHASE 6 — Design System 🔲

### Color Palette
| Name | Hex | Usage |
|---|---|---|
| Marinara Red | `#C8291E` | Primary CTA, accents |
| Mozzarella Gold | `#F5A623` | Prices, badges |
| Basil Green | `#2C5F2E` | Fresh/healthy labels |
| Deep Black | `#1A1A1A` | Backgrounds |
| Dough Cream | `#F9F5EF` | Light backgrounds, cards |
| Brick Brown | `#8B4513` | Borders, textures |

### Typography
| Role | Font | Usage |
|---|---|---|
| Headlines | Playfair Display 700 | Hero, product titles |
| Accent | Bebas Neue | Prices, deals, specials |
| Body | Inter 400/500 | Descriptions, nav, UI |

---

## PHASE 7 — Launch 🔲

- 🔲 LCP < 2.5s · CLS = 0 · FID < 100ms
- 🔲 Schema.org Restaurant + Menu JSON-LD
- 🔲 Local Business markup (both locations)
- 🔲 Google Maps embed (Estes Park + Longmont)
- 🔲 GTM events wired
- 🔲 Mobile pizza builder tested (375px)
- 🔲 Checkout flow tested end-to-end

---

## Magic Features To Build

1. **Live Pizza Preview** — Toppings selected = ingredient icons appear on pizza illustration (GSAP Flip)
2. **Ingredient Belt** — Floating CDN icons drift continuously below hero
3. **Dual Location Toggle** — "Estes Park" / "Longmont" — menu filtered by availability (XL Sicilian = Longmont only)
4. **"Tuesday Pasta Day" Dynamic Badge** — Shows on pasta section every Tuesday
5. **Award Winner Badges** — Washington Post #1 · World's Best Cheese Slice 2nd Place banners
6. **Story Section** — "From Long Island to the Rockies" scroll-jacked horizontal panels
7. **Spice Level Indicator** — Chili icons on Spicy Calabrian and Black Eye sauce items
8. **Keto / Vegan Filter Tags** — Quick filter pills on menu grid
