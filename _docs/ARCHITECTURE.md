# Architecture Decisions — Antonio's Real NY Pizza
> Technical decisions, rationale, and patterns for the build

---

## Core Architecture

### Why No App for the Pizza Builder?
The CowLot hat builder pattern proves this works with pure Liquid + JS.
Apps add monthly fees, slow page loads, and break on theme updates.
Our builder writes to Shopify's native `line_item.properties` via the cart.js API.
These properties show on orders, packing slips, and emails natively.

### Variant vs Line Item Property Decision
| Data Type | Method | Reason |
|---|---|---|
| Pizza Size | Shopify Variant | Drives price — must be a variant |
| Sauce Choice | Line Item Property | Not price-driving, infinite combos |
| Cheese Choice | Line Item Property | Same |
| Toppings (20+) | Line Item Property (comma-separated list) | Would explode to thousands of variants |
| Cut Style | Line Item Property | No price impact |
| Special Notes | Line Item Property | Free text, can't be variant |
| Wing Sauce | Line Item Property | 4 options, same price |
| Combo Sub-choices | Line Item Properties | Nested selections |

### Metafield Router Pattern
Identical to CowLot's `custom.hat_option_set` pattern.
One metafield per product → routes to the right Liquid snippet.
No app required. Editable by store staff in Shopify Admin.
Default fallback: `whole-pizza` if metafield not set.

---

## File Naming Conventions

### Sections (custom)
`antonio-{section-name}.liquid`
Examples: `antonio-hero.liquid`, `antonio-menu-grid.liquid`

### Snippets (custom)
`pizza-builder-{type}.liquid` for builder variants
`antonio-{name}.liquid` for other custom snippets

### Assets (custom)
`antonio-{name}.js` / `antonio-{name}.css`
Examples: `antonio-theme.css`, `antonio-cart.js`, `pizza-builder.js`

---

## GSAP Loading Strategy
Always load from Cloudflare CDN, async, in section file or layout:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/TextPlugin.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Flip.min.js" defer></script>
```
Guard all GSAP code: `if (typeof gsap !== 'undefined') { ... }`

---

## Cart.js API Pattern (Line Item Properties)

```js
// Adding to cart with line item properties
const cartData = {
  id: variantId,        // Shopify variant ID (number)
  quantity: 1,
  properties: {
    'Sauce': 'Marinara',
    'Cheese': 'Grated Mozzarella',
    'Toppings': 'Pepperoni, Mushrooms',
    'Cut': 'Triangle Slices',
    'Notes': 'Extra crispy',
    '_topping_count': '2',      // underscore = hidden in cart display
    '_topping_upcharge': '5.00' // underscore = hidden in cart display
  }
};

fetch('/cart/add.json', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(cartData)
})
.then(r => r.json())
.then(data => {
  window.AntonioCart.refresh(); // update cart bubble + mobile bar
  // GSAP celebrate animation
});
```

### Displaying Properties in Cart/Orders
Shopify natively shows `line_item.properties` on:
- Cart page / drawer
- Order confirmation page
- Order confirmation email
- Packing slips
- Order details in Admin

Hidden properties (prefixed with `_`) are excluded from customer-facing display
but visible in Admin order details.

---

## Price Calculation for Toppings

```js
// Base price comes from selected Shopify variant
// Topping upcharge calculated in JS and added to display

const BASE_TOPPING_PRICE = 2.50;
const FREE_TOPPINGS = 0; // 0 free toppings on specialty pizzas
const BYO_FREE_TOPPINGS = 0; // also 0 — consistent pricing

function calcToppingUpcharge(count) {
  return (count * BASE_TOPPING_PRICE).toFixed(2);
}

// Important: Shopify price = variant price only
// Topping upcharge is captured in _topping_upcharge property
// A separate "customization fee" product can be added to cart for the upcharge
// OR: use a draft order / discount code approach
// RECOMMENDED: Add a hidden "Topping Upcharge" product variant at the upcharge price
// and add it to cart alongside the pizza as a separate line item
```

### Recommended Topping Upcharge Product Setup
1. Create product: "Pizza Topping" (hidden, not on store)
2. Variants: $2.50, $5.00, $7.50, ... up to $25.00 (10 toppings × $2.50)
3. Add this as a second cart item when toppings are selected
4. Link it to the pizza line item via a matching `_pizza_ref` property

---

## Savor Theme Integration Points

### product.json — where to inject builder
The pizza builder section sits between the variant picker and buy buttons in the
`_product-details` static block. The buy buttons block is hidden for pizza products
(CSS: `display: none`) — the builder has its own Add to Cart button.

### header.liquid — where to add fonts
Fonts loaded via Google Fonts `<link>` in `layout/theme.liquid`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Bebas+Neue&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

### cart drawer — Savor uses `main-cart.liquid`
The cart snippet to customize is `snippets/cart-products.liquid`.
Inject `antonio-cart-item.liquid` for line item property display.

---

## Git Workflow
- Branch: `main` — production-ready code only
- Branch: `dev` — active development
- Commit convention: `[section] Add antonio-hero.liquid with GSAP entry animation`
- Deploy via: Shopify CLI `shopify theme push` or GitHub Actions (TBD)

## Shopify CLI Commands
```bash
# Push theme to Shopify (development)
shopify theme push --development

# Pull latest from Shopify
shopify theme pull

# Preview in browser
shopify theme dev
```
