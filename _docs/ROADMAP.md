# Antonio's Real NY Pizza — Shopify Build Roadmap
**GitHub:** https://github.com/ccz6ih/Antonio-s-Real-NY-Pizza.git  
**Theme:** Savor (base) + custom sections  
**Stack:** Shopify Liquid · GSAP · Vanilla JS · Metafields · Line Item Properties  
**Last Updated:** 2025

---

## Legend
- ✅ Done
- 🔄 In Progress
- 🔲 Not Started
- 🔥 High Priority
- 💡 Magic Feature

---

## PHASE 1 — Foundation & Architecture ✅

### Completed
- ✅ Shopify store created
- ✅ Savor theme installed and set as active theme
- ✅ Dawn theme removed from project
- ✅ GitHub repo initialized: https://github.com/ccz6ih/Antonio-s-Real-NY-Pizza.git
- ✅ Project folder: `C:\Projects\AntoniosPizza-Shopify`
- ✅ Architecture decision: Size = Shopify variant (drives price), Toppings/customizations = Line Item Properties
- ✅ Architecture decision: `custom.pizza_option_set` metafield routes products to different builder UIs
- ✅ Architecture decision: No third-party apps for the pizza builder — pure Liquid + JS
- ✅ Product CSV created and imported (71 SKUs, 10 categories, v4 clean)
- ✅ Custom icon set uploading to Shopify CDN (toppings + ingredients)
- ✅ _docs folder created with ROADMAP, AGENT-PROMPTS, METAFIELDS, ICONS, ARCHITECTURE

### Option Set Metafield Values (`custom.pizza_option_set`)
| Value | Products |
|---|---|
| `whole-pizza` | Classic, Margherita, Pepperoni, BBQ, Buffalo, White, Veggie, Build Your Own |
| `grandma-pizza` | Grandma/Sicilian (fixed size) |
| `appetizer` | Wings, Knots, Arancini, Mozz Sticks, Zucchini Fries, Tenders, Focaccia |
| `calzone` | Classic, Grandma, Veggie Calzones |
| `pasta` | Marinara, Vodka, Alfredo, Bolognese, Baked Ziti |
| `hot-baked` | Eggplant Parm, Chicken Parm, Sausage & Peppers, Shrimp Parm |
| `sandwich` | Meatball Sub, Chicken Parm Sub, Philly, Italian Sub |
| `salad` | Caesar, House, Greek, Antipasto |
| `combo` | Weekend Family Special, Peetey Deal, Sicilian Date Night |
| `drink` | Soda 2-Liter (all flavors) |

---

## PHASE 2 — Shopify Admin Setup 🔄

### Metafield Definitions (set in Shopify Admin → Settings → Custom Data)
- 🔲 Create `custom.pizza_option_set` on Products (Single line text)
- 🔲 Assign metafield values to all 71 imported products (see METAFIELDS.md)
- 🔲 Create `custom.topping_icons` on Products (JSON — maps toppings to CDN icon URLs)
- 🔲 Create `custom.pizza_badge` on Products (Single line text — "Bestseller", "New", "Spicy", etc.)
- 🔲 Create `custom.allergens` on Products (Multi-line text)
- 🔲 Create `custom.calories_base` on Products (Integer — base calories before toppings)
- 🔲 Create `custom.prep_time_mins` on Products (Integer — displayed on product page)
- 🔲 Set up Collections: Whole Pies, Starters, Calzones, Pasta, Hot Baked, Heroes & Subs, Salads, Deals, Drinks

### Collection Automation Rules
- 🔲 "Whole Pies" → tag contains `whole-pie`
- 🔲 "Starters" → tag contains `appetizer` OR `starters`
- 🔲 "Calzones" → tag contains `calzone`
- 🔲 "Pasta" → tag contains `pasta`
- 🔲 "Hot Baked" → tag contains `hot-baked`
- 🔲 "Heroes & Subs" → tag contains `sub` OR `hero`
- 🔲 "Salads" → tag contains `salad`
- 🔲 "Family Deals" → tag contains `combo`
- 🔲 "Drinks" → tag contains `beverage`

---

## PHASE 3 — Pizza Builder (The Main Event) 🔥

### Files to Create
- 🔲 `sections/pizza-builder.liquid` — master section, routes by option set
- 🔲 `snippets/pizza-builder-whole.liquid` — full builder (size → sauce → cheese → toppings → cut → notes → confirm)
- 🔲 `snippets/pizza-builder-grandma.liquid` — simplified (sauce → cheese → toppings → notes → confirm)
- 🔲 `snippets/pizza-builder-appetizer.liquid` — sauce picker + quantity only
- 🔲 `snippets/pizza-builder-calzone.liquid` — filling picker + notes
- 🔲 `snippets/pizza-builder-combo.liquid` — sub-item selections per combo
- 🔲 `snippets/pizza-builder-simple.liquid` — quantity only (pasta, hot baked, salads, drinks)
- 🔲 `assets/pizza-builder.js` — step logic, topping toggles, live price calc, cart.js POST
- 🔲 `assets/pizza-builder.css` — builder UI styles

### Builder Steps (whole-pizza)
1. **Size** → Shopify variant selector (drives base price)
2. **Sauce** → Button group: Marinara / Grandma / White / No Sauce
3. **Cheese** → Button group: Grated Mozz / Fresh Mozz / Ricotta / Extra Cheese / No Cheese
4. **Toppings** → Icon grid (CDN icons), multi-select, max 10, +$2.50 each shown live
5. **Cut Style** → Button group: Triangle / Square / No Cut
6. **Special Instructions** → Textarea, 200 char max
7. **Confirm** → Visual summary card + animated Add to Cart

### Cart Line Item Properties Written
```
"Sauce": "Marinara"
"Cheese": "Grated Mozzarella + Fresh Mozzarella"
"Toppings": "Pepperoni, Mushrooms, Black Olives"
"Cut": "Triangle"
"Notes": "Extra crispy please"
"_topping_count": "3"
"_topping_upcharge": "7.50"
```

---

## PHASE 4 — Custom Sections (8 Sections) 🔥

- 🔲 `sections/antonio-hero.liquid` — full-bleed NY brick wall hero, GSAP text reveal, animated tagline
- 🔲 `sections/antonio-menu-nav.liquid` — sticky horizontal category scroll nav with icons
- 🔲 `sections/antonio-specials-marquee.liquid` — GSAP infinite ticker for daily deals
- 🔲 `sections/antonio-menu-grid.liquid` — product grid with filter tabs, menu card style
- 🔲 `sections/antonio-story.liquid` — "Born in New York" split image + text story section
- 🔲 `sections/antonio-reviews.liquid` — horizontal GSAP scroll review ticker
- 🔲 `sections/antonio-floating-cart.liquid` — sticky cart drawer trigger with item count badge
- 🔲 `sections/antonio-ingredients-belt.liquid` — 💡 animated ingredient icons belt (GSAP)

---

## PHASE 5 — Front End Styling 🔄

### Color System
| Name | Hex | Use |
|---|---|---|
| Marinara Red | `#C8291E` | Primary CTA, accents, headings |
| Mozzarella Gold | `#F5A623` | Prices, badges, highlights |
| Basil Green | `#2C5F2E` | Fresh/healthy tags, success states |
| Brick Brown | `#8B4513` | Textures, borders, secondary elements |
| Deep Black | `#1A1A1A` | Backgrounds, text |
| Dough Cream | `#F9F5EF` | Light background, cards |
| Charcoal | `#3D3D3D` | Body text |
| White | `#FFFFFF` | Contrast text on dark |

### Typography Stack
| Role | Font | Weight | Use |
|---|---|---|---|
| Headlines | Playfair Display | 700 | Hero titles, product names |
| Accent / Deals | Bebas Neue | 400 | Price callouts, specials ticker, deal labels |
| Body / UI | Inter | 400/500 | Descriptions, nav, buttons, cart |

### CSS Variables File
- 🔲 `assets/antonio-theme.css` — all CSS custom properties, utility classes
- 🔲 `assets/antonio-animations.css` — keyframes, transition utilities

### GSAP Animation Plan
- 🔲 Hero: clip-path reveal on image, TextPlugin typewriter on tagline, stagger on nav items
- 🔲 Menu grid: ScrollTrigger stagger reveal as cards enter viewport
- 🔲 Pizza builder: Flip plugin when toppings added/removed on visual preview
- 🔲 Specials marquee: Infinite GSAP horizontal ticker, pause on hover
- 🔲 Cart drawer: Slide-in from right, item fly-to-cart animation, price counter tick
- 🔲 Ingredient belt: Continuous floating scroll of ingredient icons
- 🔲 Add to Cart: Pulse + scale morph, haptic-style micro-interaction
- 🔲 Page transitions: GSAP timeline on load

---

## PHASE 6 — Topping Icon System 💡

### Icons Uploaded to CDN (Shopify Files)
See `_docs/ICONS.md` for full registry and CDN URLs.

### Icon Naming Convention
`{ingredient-name}.png` — lowercase, hyphenated  
Example: `pepperoni-slide.png`, `black-olive.png`, `sweet-pepper.png`

### Icon Usage
- Pizza builder topping grid: 80×80px display
- Ingredient belt animation: 60×60px floating
- Cart line item summary: 24×24px inline
- Product page "contains" badges: 32×32px

---

## PHASE 7 — Performance & SEO 🔲

- 🔲 Schema.org `Restaurant` JSON-LD in theme layout
- 🔲 Schema.org `Menu` + `MenuItem` JSON-LD per product
- 🔲 Local Business markup (address, hours, phone)
- 🔲 Google Maps embed section
- 🔲 Canonical URLs verified
- 🔲 Image lazy loading on all product cards
- 🔲 GSAP loaded async (defer, not blocking render)
- 🔲 Fonts preloaded via `<link rel="preload">`
- 🔲 Lighthouse targets: LCP < 2.5s · CLS = 0 · FID < 100ms
- 🔲 WebP images for all product photos

---

## PHASE 8 — Launch Checklist 🔲

- 🔲 All products have `custom.pizza_option_set` metafield set
- 🔲 All products have images uploaded
- 🔲 Pizza builder tested on mobile (375px viewport)
- 🔲 Line item properties visible on order confirmation email
- 🔲 Cart → Checkout flow tested end-to-end
- 🔲 Payment methods configured
- 🔲 Shipping settings confirmed (or pickup-only configured)
- 🔲 Google Analytics / GTM installed
- 🔲 GTM events: `pizza_configured`, `topping_selected`, `add_to_cart`, `combo_viewed`
- 🔲 robots.txt verified
- 🔲 Sitemap submitted to Google Search Console
- 🔲 Custom 404 page styled
- 🔲 Password removed / store live

---

## 💡 Magic Features (Make It Unforgettable)

1. **Live Pizza Preview Canvas** — As toppings are selected, a CSS/canvas pizza illustration updates in real-time with ingredient icons floating onto the pizza. GSAP Flip for smooth placement.
2. **Topping Counter Badge** — Floating badge on the pizza preview: "3 toppings — +$7.50". Updates live.
3. **Ingredient Floating Belt** — Section below hero: all ingredient icons slowly drift left in a continuous GSAP loop, feels alive.
4. **"The Fold" Test** — Every product card has a subtle paper-fold texture on hover, mimicking a real pizza box being opened.
5. **Urgency Ticker** — Small strip: "🔥 12 people ordered tonight · Last Peetey Deal sold 4 mins ago" (driven by metafield updated daily).
6. **Combo Builder Modal** — Combos open a modal that lets you customize each sub-item (which wings sauce, which salad, etc.) before add to cart.
7. **NY Chalk Board Special** — Daily specials section styled as a chalkboard with handwritten font. Staff can update via metafield.
8. **Scroll-Jacked Story Section** — "Born in New York" section with horizontal scroll on desktop, telling the Antonio's story panel by panel via GSAP ScrollTrigger pinning.
9. **Order History Personalization** — "You ordered this before" badge on returning visitors via localStorage.
10. **Sound Design** — Optional: subtle pizza-slide SFX on add to cart (muted by default, toggle in header).
