# Agent Prompts — Antonio's Real NY Pizza Shopify Build
> Deploy these prompts to parallel Claude sessions while you work on the front end.
> Each agent has a clearly scoped job. Reference the ROADMAP.md and ARCHITECTURE.md for context.
> All files go in `C:\Projects\AntoniosPizza-Shopify`

---

## AGENT 1 — Pizza Builder Section (Core Feature)

**Prompt:**
```
You are building the pizza configurator for Antonio's Real NY Pizza on Shopify.
The theme is Savor. The project is at C:\Projects\AntoniosPizza-Shopify.

Build: sections/pizza-builder.liquid

This section reads the product metafield custom.pizza_option_set and renders the correct
builder snippet. Route logic:
- "whole-pizza" → render 'pizza-builder-whole'
- "grandma-pizza" → render 'pizza-builder-grandma'
- "appetizer" → render 'pizza-builder-appetizer'
- "calzone" → render 'pizza-builder-calzone'
- "combo" → render 'pizza-builder-combo'
- all others → render 'pizza-builder-simple'

Also build: snippets/pizza-builder-whole.liquid
This is the full multi-step builder for whole pizzas. Steps:
1. Size (already handled by Shopify variant picker above — skip in builder)
2. Sauce: Marinara | Grandma Sauce | White/Garlic Oil | No Sauce
3. Cheese: Grated Mozz | Fresh Mozz | Ricotta | Extra Cheese | No Cheese
4. Toppings: icon grid, multi-select, max 10 items. Use CDN icons from ICONS.md.
   Each topping adds $2.50 shown live. No extra charge for first topping on BYO.
5. Cut Style: Triangle Slices | Square Slices | No Cut
6. Special Instructions: textarea 200 char max
7. Summary + Add to Cart: recap card showing all choices + final price

All choices write to cart as line_item properties via cart.js POST /cart/add.json.
Properties: Sauce, Cheese, Toppings, Cut, Notes, _topping_count, _topping_upcharge

Design: NY pizza vibe. Red (#C8291E) and cream (#F9F5EF). Playfair Display headings.
Each step transitions with a slide animation. Progress indicator at top (step 1 of 6).
Mobile first. Minimum tap target 44px. No frameworks — vanilla JS only.

Write the complete Liquid + JS + CSS. Output all three files.
```

---

## AGENT 2 — Hero Section

**Prompt:**
```
You are building the hero section for Antonio's Real NY Pizza Shopify store.
Theme: Savor. Project: C:\Projects\AntoniosPizza-Shopify

Build: sections/antonio-hero.liquid

Requirements:
- Full-bleed background: NYC brick wall texture or dark background with neon glow effect
- Large headline using Playfair Display: "Real New York Pizza." 
- Subheadline: "Long Island Born & Raised. Made by actual New Yorkers."
- GSAP TextPlugin typewriter effect on the subheadline after page load
- Two CTA buttons: "Order Now" (primary, Marinara Red #C8291E) + "See The Menu" (ghost)
- Animated scroll indicator (bouncing arrow) at bottom
- Section settings in the Shopify theme editor: bg_image, headline, subheadline, cta1_text, cta1_url, cta2_text, cta2_url
- On mobile: stack vertically, headline font size reduces gracefully
- GSAP timeline on load: image clip-path reveal (0.8s) → headline slides up (0.3s delay) → subheadline typewriter → CTAs fade in stagger

Load GSAP from: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js
Load TextPlugin: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/TextPlugin.min.js

Color system:
- Marinara Red: #C8291E
- Mozzarella Gold: #F5A623  
- Deep Black: #1A1A1A
- Dough Cream: #F9F5EF

Write the complete section file with schema at the bottom.
```

---

## AGENT 3 — Specials Marquee Section

**Prompt:**
```
You are building the daily specials ticker section for Antonio's Real NY Pizza on Shopify.
Theme: Savor. Project: C:\Projects\AntoniosPizza-Shopify

Build: sections/antonio-specials-marquee.liquid

Requirements:
- Infinite horizontal GSAP ticker, seamlessly looping
- Dark background (#1A1A1A) with Mozzarella Gold (#F5A623) text
- Font: Bebas Neue (condensed, all-caps energy)
- Content driven by section blocks in theme editor (admin adds/removes specials without code)
- Each block has: emoji, deal_text, price
- Example items: "🍕 FAMILY SPECIAL — $44.99", "🔥 WINGS 10PC — $13.99", "🎉 DATE NIGHT DEAL — $42.99"
- Separator between items: small red diamond or pizza slice icon
- Pause on hover (GSAP pause/resume)
- Speed controllable via section setting (slow/medium/fast)
- On mobile: same behavior, text slightly smaller

Schema: up to 20 blocks, each with emoji (text), deal_text (text), price (text)
Section settings: speed (select: slow/medium/fast), bg_color (color), text_color (color)

GSAP from CDN: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js

Write the complete Liquid section file with inline CSS and JS.
```

---

## AGENT 4 — Menu Category Nav Section

**Prompt:**
```
You are building the sticky menu category navigation for Antonio's Real NY Pizza on Shopify.
Theme: Savor. Project: C:\Projects\AntoniosPizza-Shopify

Build: sections/antonio-menu-nav.liquid

Requirements:
- Horizontal scrollable pill-style nav bar that sticks to top (below main header) when scrolled past it
- Categories: Whole Pies · Starters · Calzones · Pasta · Hot Baked · Heroes & Subs · Salads · Deals · Drinks
- Each category links to its Shopify Collection page
- Active state: Marinara Red (#C8291E) background, white text
- Inactive: cream (#F9F5EF) background, dark text
- On scroll, detect which section/collection is in viewport and auto-highlight active pill
  (use IntersectionObserver if on a page with all categories visible, else just highlight based on current URL)
- GSAP: subtle scale-up on hover (1.05), smooth active indicator slide animation
- Section settings in editor: collection handles for each category (so admin can change URLs)
- Mobile: horizontally scrollable, hide scrollbar, snap scroll behavior
- Smooth-scroll to section on click (if on homepage with all sections) or navigate to collection page

Write complete Liquid section with schema, inline CSS, inline JS.
```

---

## AGENT 5 — Menu Grid Section

**Prompt:**
```
You are building the main menu product grid for Antonio's Real NY Pizza Shopify store.
Theme: Savor. Project: C:\Projects\AntoniosPizza-Shopify

Build: sections/antonio-menu-grid.liquid

Requirements:
- Displays products from a specified collection (set in section settings)
- Layout: 3 columns desktop, 2 columns tablet, 1 column mobile
- Card design (NY menu aesthetic):
  - Product image top (aspect ratio 4:3, cover fit)
  - Category badge top-left (from product.type, colored by category)
  - "Bestseller" / "New" / "Spicy" badge top-right (from product metafield custom.pizza_badge)
  - Product name: Playfair Display, dark, bold
  - Short description: first 80 chars of product description
  - Price: Bebas Neue, Mozzarella Gold (#F5A623)
  - "Customize & Order" button: full width, Marinara Red
  - On hover: card lifts (transform: translateY(-4px)), subtle shadow

- Section settings: collection (collection picker), heading (text), max_products (range 4-24)
- GSAP ScrollTrigger: cards stagger-fade in as they enter viewport (opacity 0→1, y: 20→0)
- Quick-add: clicking card opens product page (not quick-add modal — we need the builder)

Load ScrollTrigger: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js

Write the complete Liquid section with schema, CSS, JS.
```

---

## AGENT 6 — Theme CSS Variables & Base Styles

**Prompt:**
```
You are setting up the base design system for Antonio's Real NY Pizza Shopify store.
Theme: Savor. Project: C:\Projects\AntoniosPizza-Shopify

Build: assets/antonio-theme.css

This file defines all CSS custom properties and base utility classes used across
all custom sections. It is included via the theme layout liquid file.

Color system:
--color-marinara: #C8291E
--color-marinara-dark: #A01F15
--color-marinara-light: #E8453A
--color-gold: #F5A623
--color-gold-dark: #D4880A
--color-basil: #2C5F2E
--color-brick: #8B4513
--color-black: #1A1A1A
--color-charcoal: #3D3D3D
--color-cream: #F9F5EF
--color-cream-dark: #EDE6D8
--color-white: #FFFFFF
--color-red-badge: #C8291E

Typography:
--font-headline: 'Playfair Display', Georgia, serif
--font-accent: 'Bebas Neue', 'Arial Narrow', sans-serif
--font-body: 'Inter', -apple-system, sans-serif

Spacing scale: --space-xs through --space-4xl
Border radius: --radius-sm (4px) --radius-md (8px) --radius-lg (16px) --radius-pill (999px)
Shadows: --shadow-card, --shadow-card-hover, --shadow-button
Transitions: --transition-fast (150ms ease), --transition-base (250ms ease), --transition-slow (400ms ease)

Utility classes needed:
.antonio-badge (base badge style)
.antonio-badge--red, --gold, --green, --new
.antonio-btn (base button)
.antonio-btn--primary (red fill)
.antonio-btn--ghost (outlined)
.antonio-btn--gold
.antonio-card (base card with hover lift)
.antonio-tag (small pill tag)
.antonio-price (gold, Bebas Neue, large)
.antonio-heading (Playfair Display)
.antonio-section-title (centered, with decorative line)

Also add @font-face or Google Fonts import for Playfair Display and Bebas Neue.
Include a prefers-reduced-motion media query that disables all transitions/animations.

Write the complete CSS file.
```

---

## AGENT 7 — Story / Brand Section

**Prompt:**
```
You are building the brand story section for Antonio's Real NY Pizza Shopify store.
Theme: Savor. Project: C:\Projects\AntoniosPizza-Shopify

Build: sections/antonio-story.liquid

Requirements:
- Split layout: image left (60%), text right (40%) on desktop
- On mobile: image full width top, text below
- Image: set via section settings (admin uploads brand photo)
- Text panel:
  - Small eyebrow text: "OUR STORY" (Bebas Neue, Marinara Red, letter-spaced)
  - Large headline: "Born & Raised in Long Island, New York." (Playfair Display, 40px desktop)
  - Body copy: 2-3 paragraphs about Antonio's — authenticity, real New Yorkers, top shelf ingredients
  - Stat row: "25+ Years · Real New Yorkers · Top Shelf Ingredients · Long Island Born"
    Each stat separated by a red bullet. Bebas Neue font.
  - CTA button: "Meet The Team" or custom from settings

- Section settings: image, eyebrow, heading, body (rich text), stat1-4, cta_text, cta_url, layout (image-left/image-right)
- GSAP ScrollTrigger: text panel slides in from right (x: 60px → 0, opacity 0 → 1) as section enters view
- Background: cream (#F9F5EF) with subtle brick texture overlay at 5% opacity

Write the complete Liquid section with schema, CSS, JS.
```

---

## AGENT 8 — Reviews Ticker Section

**Prompt:**
```
You are building the customer reviews ticker for Antonio's Real NY Pizza on Shopify.
Theme: Savor. Project: C:\Projects\AntoniosPizza-Shopify

Build: sections/antonio-reviews.liquid

Requirements:
- Horizontal infinite scroll of customer review cards (GSAP, same engine as specials marquee)
- Each card:
  - 5 gold stars (CSS stars, color: #F5A623)
  - Review quote text (italic, Playfair Display)
  - Customer name + date
  - Width: 280px fixed, white card on dark background (#1A1A1A)
  - Card border-radius: 12px
  - Subtle left border: 3px solid #C8291E

- Reviews driven by section blocks in theme editor (up to 20 blocks)
- Each block: stars (number 1-5), review (text), name (text), date (text), location (text)
- Direction: left scroll (can be reversed by section setting)
- Two rows on desktop (one slightly faster = depth effect)
- One row on mobile
- Pause on hover
- Section heading: "What New York Is Saying" (Playfair Display, centered, with red underline)

GSAP from CDN: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js

Write the complete Liquid section with schema, CSS, JS.
Seed with 6 example reviews in the default schema.
```

---

## AGENT 9 — Floating Cart + Sticky Order Bar

**Prompt:**
```
You are building the floating cart trigger and sticky mobile order bar for Antonio's Real NY Pizza.
Theme: Savor. Project: C:\Projects\AntoniosPizza-Shopify

Build: sections/antonio-floating-cart.liquid + assets/antonio-cart.js

Requirements:

DESKTOP — Floating cart bubble (bottom-right corner):
- Fixed position, bottom: 24px, right: 24px
- Pizza slice icon (SVG, white on Marinara Red circle, 56px)
- Item count badge (top-right of bubble, gold background)
- On click: opens Savor's native cart drawer (trigger existing cart drawer JS)
- GSAP: when item added to cart, bubble pulses (scale 1 → 1.3 → 1, 400ms)
- Slides in from right on page load after 1.5s delay

MOBILE — Sticky bottom bar (full width, above mobile browser nav):
- Fixed bottom: 0, full width
- "VIEW ORDER (3 items) — $49.97" format
- Left: item count pill, Right: total price
- Updates live via cart.js /cart.json polling every time cart changes
- Marinara Red background, white text, Bebas Neue font, 56px height
- Tap: opens cart drawer
- Hidden when cart is empty
- GSAP: slides up from bottom when first item is added

CART JS (assets/antonio-cart.js):
- Listen for add-to-cart events
- Update bubble count + mobile bar total in real-time via fetch('/cart.json')
- Expose window.AntonioCart.refresh() for other scripts to call
- Trigger GSAP pulse animation on add

Write all files. No jQuery. Vanilla JS only.
```

---

## AGENT 10 — Metafield Assignment Script

**Prompt:**
```
Create a reference guide and bulk-assignment plan for setting the custom.pizza_option_set
metafield on all 71 products in the Antonio's Real NY Pizza Shopify store.

The metafield namespace is "custom", key is "pizza_option_set", type is "single_line_text_field".

Provide:
1. A complete product → metafield value mapping table (all 71 products by URL handle)
2. The Shopify Admin steps to create the metafield definition
3. A CSV import file formatted for Shopify's metafield bulk import (if supported)
4. The Liquid code snippet to verify the metafield is working:
   {{ product.metafields.custom.pizza_option_set }}
5. Fallback logic if metafield is missing (default to "whole-pizza" for pizza products)

Products and their handles are listed in _docs/METAFIELDS.md.

Format as a complete markdown document with the CSV as a code block.
```

---

## AGENT 11 — Ingredient Belt Section (Magic Feature)

**Prompt:**
```
You are building the animated ingredient belt section for Antonio's Real NY Pizza.
Theme: Savor. Project: C:\Projects\AntoniosPizza-Shopify

Build: sections/antonio-ingredient-belt.liquid

This is a "magic" visual section — a continuous horizontal belt of floating ingredient
icons that creates visual energy and appetite appeal. Inspired by the actual ingredient
icons that will be used in the pizza builder.

Requirements:
- Two rows of ingredient icons drifting left continuously (GSAP infinite loop)
- Row 1 slightly faster than Row 2 for depth/parallax feel
- Icons: PNG images from Shopify CDN (see ICONS.md for URLs)
- Icons are 80px × 80px, with slight drop shadow, no background
- Random subtle vertical float animation on each icon (+/- 8px, 2-4s random duration)
- Icons slightly rotate back and forth (±5deg, random timing)
- On hover: individual icon scales to 1.2, stops rotating, shows ingredient name tooltip
- Background: dark (#1A1A1A) or transparent (configurable in settings)
- Section is 160px tall on desktop, 120px on mobile
- Fade-in mask on left and right edges (CSS mask-image gradient)
- Section setting: bg_color, show_on_mobile (toggle), speed (slow/medium/fast)

Available icon CDN URLs:
https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Pepperoni-Slide-01.png
https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Mushroom-Slide.png
https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Tomato-Slide.png
https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Tomato-Slide-Top-View.png
https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Black-Olive.png
https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Black-Olive-Slide-01.png
https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Sweet-Pepper.png
https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Cheese.png
https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Oregano-Leaves.png
https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Rocket-Leave.png

GSAP from CDN: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js

Repeat the icon array 3× to ensure seamless infinite loop with no gaps.
Write complete Liquid section with inline CSS and JS.
```

---

## AGENT 12 — Product Page Template

**Prompt:**
```
You are customizing the product page template for Antonio's Real NY Pizza Shopify store.
Theme: Savor. Project: C:\Projects\AntoniosPizza-Shopify

Update: templates/product.json

The product page layout should be:
- TOP: Product image gallery (left, 55% width) + Product info panel (right, 45%)
- Product info panel contains (in order):
  1. Category badge (from product.type)
  2. Product title (Playfair Display, large)
  3. Star rating placeholder (will connect to review app later)
  4. Price display (Bebas Neue, Mozzarella Gold, large — shows variant price)
  5. Short description (first paragraph of product description)
  6. Variant picker (Size) — clean button style, not dropdown
  7. Pizza Builder section (injected here via sections/pizza-builder.liquid)
  8. Allergen/nutrition info (collapsed accordion, from metafields)
  9. "You may also like" product recommendations (below the fold)

- The variant picker should update the price display via JS without page reload
- No accelerated checkout buttons (Apple Pay etc) — just the builder Add to Cart

Also note: the product.json already exists. Read it first, then output an updated version
that slots the pizza-builder section in correctly between the variant picker and buy buttons.

The pizza builder section replaces the standard buy-buttons block for pizza products.
For non-pizza products (drinks, etc.), the standard quantity + add to cart remains.

Output the complete updated product.json.
```

---

## AGENT 13 — Homepage Template

**Prompt:**
```
You are building the homepage template for Antonio's Real NY Pizza Shopify store.
Theme: Savor. Project: C:\Projects\AntoniosPizza-Shopify

Build/Update: templates/index.json

The homepage should have these sections in order:
1. antonio-hero (custom) — full-bleed NY hero
2. antonio-specials-marquee (custom) — daily deals ticker
3. antonio-menu-nav (custom) — sticky category navigation
4. antonio-menu-grid (custom) — featured Whole Pies collection (show 8)
5. antonio-ingredient-belt (custom) — floating ingredients animation
6. antonio-menu-grid again — featured Starters collection (show 6)
7. antonio-story (custom) — brand story split section
8. antonio-menu-grid again — Family Deals collection (show 3)
9. antonio-reviews (custom) — review ticker
10. announcement bar / footer CTA (use existing Savor footer)

Each section instance needs a unique ID in the JSON.
Section settings should be pre-configured with sensible defaults:
- Menu grids pre-pointed to the right collection handles
- Story section with placeholder text about Antonio's

Output the complete index.json file.
```

---

## AGENT 14 — Cart Drawer Customization

**Prompt:**
```
You are customizing the cart drawer for Antonio's Real NY Pizza Shopify store.
Theme: Savor. Project: C:\Projects\AntoniosPizza-Shopify

The Savor theme has a built-in cart drawer. Customize it to display pizza builder
line item properties in a clean, readable format.

Update/create: snippets/antonio-cart-item.liquid

Requirements:
- When a cart item has line_item properties, display them below the product title
- Format:
  🍕 Sauce: Marinara
  🧀 Cheese: Grated Mozzarella + Fresh Mozzarella
  🍕 Toppings: Pepperoni, Mushrooms, Black Olives (+$7.50)
  ✂️ Cut: Triangle Slices
  📝 Notes: Extra crispy please

- Hidden properties (prefixed with _) like _topping_count and _topping_upcharge
  should NOT be displayed (standard Shopify convention)
- Each property line: small, muted text, icon prefix based on property name
- Total price per line item shows base price + topping upcharge combined
- Design: clean list, #3D3D3D text, 13px, line-height 1.6
- Mobile: same layout, slightly tighter spacing

Also suggest any changes needed to hook this snippet into the Savor theme's
existing cart-products.liquid snippet.

Write the complete snippet and integration notes.
```

---

## NOTES FOR ALL AGENTS

- Theme is **Savor** (not Dawn)
- All custom sections go in `sections/` with prefix `antonio-`
- All custom JS goes in `assets/` with prefix `antonio-`
- All custom CSS goes in `assets/` with prefix `antonio-`
- Snippets go in `snippets/` with prefix `pizza-builder-` or `antonio-`
- No jQuery, no React — vanilla JS and Liquid only
- GSAP always loaded from: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/`
- Line item properties use standard Shopify `cart.js` API
- GitHub repo: https://github.com/ccz6ih/Antonio-s-Real-NY-Pizza.git
- Commit after each major section is complete
- Test on mobile (375px) before considering anything done
