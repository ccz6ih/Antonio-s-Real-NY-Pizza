# Quick Reference — Antonio's Real NY Pizza
> The one page you open first. Everything critical in one place.

---

## 🔗 Key Links
| Resource | URL |
|---|---|
| GitHub Repo | https://github.com/ccz6ih/Antonio-s-Real-NY-Pizza.git |
| Shopify Admin | https://admin.shopify.com |
| CDN Files Base | `https://cdn.shopify.com/s/files/1/0974/8693/0226/files/` |
| Store Front | (set your .myshopify.com URL here) |

---

## 📁 Project Structure
```
C:\Projects\AntoniosPizza-Shopify\
├── _docs\                    ← YOU ARE HERE
│   ├── QUICKREF.md           ← This file
│   ├── ROADMAP.md            ← Full build roadmap with status
│   ├── AGENT-PROMPTS.md      ← 14 agent prompts ready to deploy
│   ├── METAFIELDS.md         ← Metafield definitions + bulk CSV
│   ├── ICONS.md              ← CDN icon registry
│   └── ARCHITECTURE.md       ← Technical decisions + code patterns
├── assets\                   ← CSS, JS (Savor base + custom antonio-*)
├── sections\                 ← Liquid sections (Savor base + custom antonio-*)
├── snippets\                 ← Liquid snippets (Savor base + pizza-builder-*)
├── templates\                ← product.json, index.json, etc.
├── config\                   ← settings_schema.json, settings_data.json
├── layout\                   ← theme.liquid
└── locales\                  ← translation files
```

---

## ✅ What's Done
- [x] Shopify store + Savor theme
- [x] GitHub repo
- [x] Product CSV (71 SKUs, all categories, clean import)
- [x] Custom topping icons uploading to CDN
- [x] Architecture decisions locked
- [x] _docs folder with full roadmap + agent prompts

---

## 🔥 Do Next (Priority Order)
1. **Assign metafields** — Set `custom.pizza_option_set` on all products (use bulk CSV in METAFIELDS.md)
2. **Create Collections** — Whole Pies, Starters, Calzones, Pasta, Hot Baked, Heroes & Subs, Salads, Deals, Drinks
3. **Upload product images** — Use Shopify Admin → Products → [each product]
4. **Run AGENT 6** — Build `assets/antonio-theme.css` (design system foundation)
5. **Run AGENT 2** — Build `sections/antonio-hero.liquid`
6. **Run AGENT 1** — Build `sections/pizza-builder.liquid` + snippets (the main event)
7. **Run AGENT 11** — Build `sections/antonio-ingredient-belt.liquid` (magic section)

---

## 🎨 Design System At A Glance
| Token | Value |
|---|---|
| Primary Red | `#C8291E` |
| Gold | `#F5A623` |
| Black | `#1A1A1A` |
| Cream | `#F9F5EF` |
| Headline Font | Playfair Display 700 |
| Accent Font | Bebas Neue |
| Body Font | Inter 400/500 |

---

## 🍕 Icon CDN (Quick Copy)
```
Pepperoni:   https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Pepperoni-Slide-01.png
Mushroom:    https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Mushroom-Slide.png
Tomato:      https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Tomato-Slide.png
Black Olive: https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Black-Olive.png
Pepper:      https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Sweet-Pepper.png
Cheese:      https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Cheese.png
Oregano:     https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Oregano-Leaves.png
Arugula:     https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Rocket-Leave.png
```

---

## 🤖 How to Use Agent Prompts
1. Open `_docs\AGENT-PROMPTS.md`
2. Pick an agent (1–14) based on what you want built
3. Copy the prompt block
4. Open a new Claude conversation
5. Paste the prompt — Claude will build the complete file
6. Save output to the correct path in this project
7. `git add . && git commit -m "[section] Add {filename}"`

Agents can run in parallel — they each have isolated, non-conflicting scopes.

---

## 🧠 Key Code Patterns

### Read option set metafield in Liquid
```liquid
{% assign option_set = product.metafields.custom.pizza_option_set | default: 'whole-pizza' %}
```

### Add to cart with line item properties
```js
fetch('/cart/add.json', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: variantId,
    quantity: 1,
    properties: { 'Sauce': 'Marinara', 'Toppings': 'Pepperoni, Mushrooms' }
  })
});
```

### GSAP ScrollTrigger stagger (menu cards)
```js
gsap.from('.antonio-card', {
  scrollTrigger: { trigger: '.antonio-menu-grid', start: 'top 80%' },
  opacity: 0, y: 20, duration: 0.5, stagger: 0.1
});
```
