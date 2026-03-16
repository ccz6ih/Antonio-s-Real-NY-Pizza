# Metafield Reference — Antonio's Real NY Pizza
> Store: https://antonios-real-ny-pizza.myshopify.com
> Locations: Estes Park, CO and Longmont, CO
> Last updated: 2026-03-15

---

## 1. Creating the Metafield Definition in Shopify Admin

1. Go to **Shopify Admin → Settings → Custom Data → Products**
2. Click **Add definition**
3. Fill in the fields exactly as follows:

| Field | Value |
|---|---|
| Name | Pizza Option Set |
| Namespace and key | `custom.pizza_option_set` |
| Description | Routes each product to the correct ordering UI (pizza builder, calzone builder, simple checkout, etc.) |
| Type | **Single line text** |
| Validations | None required |

4. Click **Save**

> This definition must exist before any CSV import or Liquid metafield reads will work.

---

## 2. Option Set Values

| Value | UI Rendered | Used By |
|---|---|---|
| `whole-pizza` | Full pizza builder: size (if applicable) → sauce → cheese → toppings → cut style → notes → Add to Cart | All round NY-style, specialty, Detroit, Chicago, Neapolitan, and Keto Bowl pizzas |
| `grandma-pizza` | Grandma/Sicilian builder: fixed pan size → sauce → cheese → toppings → notes → Add to Cart | Grandma Pizza, Sicilian Small, Sicilian XL |
| `calzone` | Calzone builder: filling picker → extras → notes → Add to Cart | All calzones |
| `appetizer` | Appetizer builder: sauce picker (wings) or simple quantity + notes | Wings, Garlic Knots, Pretzels, Keto Bowl |
| `simple` | Simple: quantity + notes → Add to Cart | Garlic Bread, Meatballs, Italian Bread Loaf, NY Bagels |
| `pasta` | Simple: quantity + notes | All pasta dishes |
| `salad` | Simple: quantity + notes | All salads |
| `sandwich` | Simple: quantity + notes | All heros / sandwiches |
| `dessert` | Simple: quantity (no notes) | Tiramisu, XL Cookie, Fudge Brownie, Monkey Bread |
| `drink` | Simple: quantity (no notes) | Cans of Soda |

---

## 3. Product → Metafield Mapping (All Products)

### Pizzas → `whole-pizza`

| Product | Handle |
|---|---|
| NY 10" Thin Crust Pizza | `ny-10-thin-crust-pizza` |
| NY 14" Thin Crust Pizza | `ny-14-thin-crust-pizza` |
| NY 18" Thin Crust Pizza | `ny-18-thin-crust-pizza` |
| NY 26" Thin Crust Pizza — The Mega Don | `ny-26-thin-crust-pizza-mega-don` |
| Margherita Pizza | `margherita-pizza` |
| The Grandma Lita! *(specialty; uses size variants)* | `the-grandma-lita` |
| The Spicy Calabrian | `the-spicy-calabrian` |
| Pesto Chicken Alfredo Pizza | `pesto-chicken-alfredo-pizza` |
| The G.O.A.T. aka Tony G. | `the-goat-tony-g` |
| Colors of Italy | `colors-of-italy` |
| The Godfather Pizza | `the-godfather-pizza` |
| Greek Pizza | `greek-pizza` |
| The Johnny Pizza Guy | `the-johnny-pizza-guy` |
| Vegan 14" Round Thin Crust Pizza | `vegan-pizza-14` |
| Campania Veggie Pie | `campania-veggie-pie` |
| Neapolitan Specialty Pizzas | `neapolitan-specialty-pizzas` |
| Chicago Tavern Style Thin Pizza | `chicago-tavern-style-pizza` |
| Detroit Red Top Pizza 10"x14" (Small) | `detroit-red-top-pizza-small` |
| Detroit Red Top Pizza 12"x17" (Large) | `detroit-red-top-pizza-large` |

### Grandma / Sicilian → `grandma-pizza`

| Product | Handle |
|---|---|
| Sicilian Pizza Small 12"x12" | `sicilian-pizza-small` |
| Sicilian Pizza XL 26"x18" | `sicilian-pizza-xl` |
| Grandma Pizza | `grandma-pizza` |

### Keto → `appetizer`

| Product | Handle |
|---|---|
| Keto Bowl | `keto-bowl` |

### Calzones → `calzone`

| Product | Handle |
|---|---|
| Calzone Personal | `calzone-personal` |
| Calzone Regular 14" | `calzone-regular` |
| Calzone Godfather | `calzone-godfather` |
| Calzone Monster 4-Topping Max | `calzone-monster` |

### Wings / Appetizers → `appetizer`

| Product | Handle |
|---|---|
| Jumbo Chicken Wings | `jumbo-chicken-wings` |
| Garlic Knots | `garlic-knots` |
| Pretzels | `pretzels` |

### Sides / Simple → `simple`

| Product | Handle |
|---|---|
| Garlic Bread | `garlic-bread` |
| Meatballs in Sauce | `meatballs-in-sauce` |
| Italian Bread Loaf | `italian-bread-loaf` |
| New York Bagels | `new-york-bagels` |

### Pasta → `pasta`

| Product | Handle |
|---|---|
| Pasta with Marinara or Meat Sauce | `pasta-marinara-meat` |
| Pasta di Antonio | `pasta-di-antonio` |
| Penne with Alfredo Sauce | `penne-alfredo` |
| Pasta alla Campania | `pasta-alla-campania` |
| Tikka Masala Pasta | `tikka-masala-pasta` |

### Salads → `salad`

| Product | Handle |
|---|---|
| Antipasto Salad | `antipasto-salad` |
| House Salad | `house-salad` |
| Italian Salad | `italian-salad` |
| Mozzarella Caprese Salad | `mozzarella-caprese-salad` |

### Heros / Sandwiches → `sandwich`

| Product | Handle |
|---|---|
| Hot Hero Meatball Parmigiana | `hot-hero-meatball-parm` |
| Cold Hero Mozzarella Caprese | `cold-hero-mozzarella-caprese` |
| Hot Hero Spicy Italian Sausage and Pepper | `hot-hero-sausage-pepper` |
| Hot Hero Ham and Cheese | `hot-hero-ham-cheese` |

### Desserts → `dessert`

| Product | Handle |
|---|---|
| Tiramisu | `tiramisu` |
| XL Cookie | `xl-cookie` |
| Fudge Brownie | `fudge-brownie` |
| Monkey Bread | `monkey-bread` |

### Drinks → `drink`

| Product | Handle |
|---|---|
| Cans of Soda | `cans-of-soda` |

---

## 4. Bulk Metafield Import CSV

Import via **Shopify Admin → Apps → Matrixify (Excelify)** or any Shopify-compatible CSV importer that supports metafield columns.

The column header format `Metafield: custom.pizza_option_set [single_line_text_field]` is the Matrixify standard. The metafield definition (Section 1 above) must already exist in Shopify before importing.

```csv
Handle,Metafield: custom.pizza_option_set [single_line_text_field]
ny-10-thin-crust-pizza,whole-pizza
ny-14-thin-crust-pizza,whole-pizza
ny-18-thin-crust-pizza,whole-pizza
ny-26-thin-crust-pizza-mega-don,whole-pizza
margherita-pizza,whole-pizza
the-grandma-lita,whole-pizza
the-spicy-calabrian,whole-pizza
pesto-chicken-alfredo-pizza,whole-pizza
the-goat-tony-g,whole-pizza
colors-of-italy,whole-pizza
the-godfather-pizza,whole-pizza
greek-pizza,whole-pizza
the-johnny-pizza-guy,whole-pizza
vegan-pizza-14,whole-pizza
campania-veggie-pie,whole-pizza
neapolitan-specialty-pizzas,whole-pizza
chicago-tavern-style-pizza,whole-pizza
detroit-red-top-pizza-small,whole-pizza
detroit-red-top-pizza-large,whole-pizza
sicilian-pizza-small,grandma-pizza
sicilian-pizza-xl,grandma-pizza
grandma-pizza,grandma-pizza
keto-bowl,appetizer
calzone-personal,calzone
calzone-regular,calzone
calzone-godfather,calzone
calzone-monster,calzone
jumbo-chicken-wings,appetizer
garlic-knots,appetizer
pretzels,appetizer
garlic-bread,simple
meatballs-in-sauce,simple
italian-bread-loaf,simple
new-york-bagels,simple
pasta-marinara-meat,pasta
pasta-di-antonio,pasta
penne-alfredo,pasta
pasta-alla-campania,pasta
tikka-masala-pasta,pasta
antipasto-salad,salad
house-salad,salad
italian-salad,salad
mozzarella-caprese-salad,salad
hot-hero-meatball-parm,sandwich
cold-hero-mozzarella-caprese,sandwich
hot-hero-sausage-pepper,sandwich
hot-hero-ham-cheese,sandwich
tiramisu,dessert
xl-cookie,dessert
fudge-brownie,dessert
monkey-bread,dessert
cans-of-soda,drink
```

---

## 5. Liquid Verification Snippet

Use this in any product template or section to confirm the metafield is being read correctly. Add it temporarily during development and remove before going live.

```liquid
{% comment %} --- DEBUG: pizza_option_set metafield --- {% endcomment %}
{% assign option_set = product.metafields.custom.pizza_option_set.value | downcase | strip %}

{% if option_set == blank %}
  <p style="color:red;font-weight:bold;">WARNING: pizza_option_set metafield is missing for {{ product.handle }}</p>
{% else %}
  <p style="color:green;">option_set = <strong>{{ option_set }}</strong></p>
{% endif %}
{% comment %} --- END DEBUG --- {% endcomment %}
```

### Routing Switch (production use in `product-form.liquid` or equivalent)

```liquid
{% assign option_set = product.metafields.custom.pizza_option_set.value | downcase | strip %}

{% case option_set %}
  {% when 'whole-pizza' %}
    {% render 'pizza-builder-whole', product: product %}
  {% when 'grandma-pizza' %}
    {% render 'pizza-builder-grandma', product: product %}
  {% when 'calzone' %}
    {% render 'pizza-builder-calzone', product: product %}
  {% when 'appetizer' %}
    {% render 'pizza-builder-appetizer', product: product %}
  {% when 'simple' %}
    {% render 'pizza-builder-simple', product: product %}
  {% when 'pasta' %}
    {% render 'pizza-builder-simple', product: product %}
  {% when 'salad' %}
    {% render 'pizza-builder-simple', product: product %}
  {% when 'sandwich' %}
    {% render 'pizza-builder-simple', product: product %}
  {% when 'dessert' %}
    {% render 'pizza-builder-simple', product: product %}
  {% when 'drink' %}
    {% render 'pizza-builder-simple', product: product %}
  {% else %}
    {% comment %} Fallback: render default Shopify add-to-cart if metafield is missing {% endcomment %}
    {{ form | payment_button }}
{% endcase %}
```

---

## 6. Builder vs. Simple Checkout — Notes

### Products that use the full Pizza Builder (`whole-pizza`, `grandma-pizza`, `calzone`)

These products require a multi-step customization UI before the customer can add to cart. The builder collects:

- **whole-pizza**: sauce selection, cheese selection, toppings (up to the product's topping limit), cut style (triangle / square / no cut), and order notes.
- **grandma-pizza**: same as whole-pizza but the pan size is fixed per product (no size picker needed in the builder — size is determined by the product variant selected on the PDP).
- **calzone**: filling / ingredient picker, extras, and order notes.

> Special case — **The Grandma Lita** (`the-grandma-lita`): this is listed as `whole-pizza` because it offers size variants (like the standard round pizzas). Do not reclassify it to `grandma-pizza` unless the variant structure changes.

### Products that use Simple Checkout (`simple`, `pasta`, `salad`, `sandwich`, `dessert`, `drink`)

These products only need a quantity selector and an optional notes field. No builder is required. All six option_set values (`simple`, `pasta`, `salad`, `sandwich`, `dessert`, `drink`) can route to the same `pizza-builder-simple` snippet — they are kept as separate values to allow future UI differentiation (e.g., add a dressing picker to salads) without requiring a metafield data migration.

### Products that use the Appetizer Builder (`appetizer`)

Wings (`jumbo-chicken-wings`) need a sauce picker. Garlic Knots and Pretzels use a simpler quantity-only flow but share the same `appetizer` snippet. The Keto Bowl is grouped here as it has a sauce/protein selection similar to wings.

---

## 7. Collection Handles Reference

| Collection Name | Handle | Products Included |
|---|---|---|
| Pizzas | `pizzas` | All 19 `whole-pizza` products |
| Grandma & Sicilian | `grandma-sicilian` | 3 `grandma-pizza` products |
| Calzones | `calzones` | 4 calzone products |
| Wings & Appetizers | `wings-appetizers` | Wings, Garlic Knots, Pretzels, Keto Bowl |
| Sides | `sides` | Garlic Bread, Meatballs, Italian Bread Loaf, NY Bagels |
| Pasta | `pasta` | 5 pasta products |
| Salads | `salads` | 4 salad products |
| Heros | `heros` | 4 hero / sandwich products |
| Desserts | `desserts` | 4 dessert products |
| Drinks | `drinks` | Cans of Soda |
