# Icon Registry — Antonio's Real NY Pizza
> All custom ingredient/topping icons hosted on Shopify CDN
> Store ID: 1/0974/8693/0226

---

## CDN Base URL
`https://cdn.shopify.com/s/files/1/0974/8693/0226/files/`

---

## Uploaded Icons

| Icon Name | CDN URL | Topping Label | Use in Builder |
|---|---|---|---|
| Pepperoni | `Pepperoni-Slide-01.png` | Pepperoni | ✅ Yes |
| Mushroom | `Mushroom-Slide.png` | Mushrooms | ✅ Yes |
| Tomato Slice | `Tomato-Slide.png` | Tomatoes | ✅ Yes |
| Tomato Top View | `Tomato-Slide-Top-View.png` | Fresh Tomato | ✅ Yes |
| Black Olive | `Black-Olive.png` | Black Olives | ✅ Yes |
| Black Olive Slice | `Black-Olive-Slide-01.png` | Black Olive Slices | ✅ Yes |
| Sweet Pepper | `Sweet-Pepper.png` | Peppers | ✅ Yes |
| Cheese | `Cheese.png` | Extra Cheese | ✅ Yes |
| Oregano | `Oregano-Leaves.png` | Fresh Herbs | ✅ Yes |
| Rocket / Arugula | `Rocket-Leave.png` | Arugula | ✅ Yes |

---

## Full CDN URLs (Copy-Paste Ready)

```
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
```

---

## Icons Still Needed (Upload to Shopify Files)

| Topping | Suggested Filename | Priority |
|---|---|---|
| Sausage | `Sausage-Slice.png` | 🔥 High |
| Onion | `Onion-Slice.png` | 🔥 High |
| Green Pepper | `Green-Pepper.png` | 🔥 High |
| Jalapeño | `Jalapeno.png` | Medium |
| Broccoli | `Broccoli.png` | Medium |
| Spinach | `Spinach-Leaf.png` | Medium |
| Garlic | `Garlic-Clove.png` | Medium |
| Anchovy | `Anchovy.png` | Low |
| Pineapple | `Pineapple-Chunk.png` | Low |
| Ham | `Ham-Slice.png` | Low |
| Salami | `Salami-Slice.png` | Medium |
| Prosciutto | `Prosciutto-Slice.png` | Medium |
| Chicken | `Chicken-Piece.png` | 🔥 High |
| Basil | `Basil-Leaf.png` | 🔥 High |
| Red Onion | `Red-Onion-Slice.png` | Medium |
| Sun-dried Tomato | `Sundried-Tomato.png` | Low |
| Eggplant | `Eggplant-Slice.png` | Low |
| Ricotta | `Ricotta-Dollop.png` | Medium |

---

## Icon Usage in Code

### Pizza Builder Topping Grid
```liquid
{% assign topping_icons = shop.metafields.custom.topping_icons.value %}
```

```html
<!-- Topping button with icon -->
<button class="topping-btn" data-topping="Pepperoni" data-price="2.50">
  <img 
    src="https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Pepperoni-Slide-01.png"
    alt="Pepperoni"
    width="60"
    height="60"
    loading="lazy"
  >
  <span>Pepperoni</span>
  <span class="topping-price">+$2.50</span>
</button>
```

### Ingredient Belt (GSAP animation)
```js
const TOPPING_ICONS = [
  { src: 'https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Pepperoni-Slide-01.png', name: 'Pepperoni' },
  { src: 'https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Mushroom-Slide.png', name: 'Mushrooms' },
  { src: 'https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Tomato-Slide.png', name: 'Tomato' },
  { src: 'https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Black-Olive.png', name: 'Black Olives' },
  { src: 'https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Sweet-Pepper.png', name: 'Sweet Peppers' },
  { src: 'https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Cheese.png', name: 'Extra Cheese' },
  { src: 'https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Oregano-Leaves.png', name: 'Oregano' },
  { src: 'https://cdn.shopify.com/s/files/1/0974/8693/0226/files/Rocket-Leave.png', name: 'Arugula' },
];
```

---

## Naming Convention for Future Icons
- Format: `Ingredient-Type.png` (PascalCase with hyphen)
- All PNGs with transparent background
- Recommended size: 200×200px minimum (displayed at 60-80px, retina-ready at 2x)
- File size target: under 50KB each
- Style should match existing icons (isometric/3D illustrated style)
