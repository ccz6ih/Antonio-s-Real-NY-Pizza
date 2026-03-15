# Metafield Reference — Antonio's Real NY Pizza
> All custom metafield definitions for the Shopify store

---

## Setup in Shopify Admin
Path: **Admin → Settings → Custom Data → Products → Add Definition**

---

## Metafield Definitions

### 1. `custom.pizza_option_set`
- **Type:** Single line text
- **Namespace:** custom
- **Key:** pizza_option_set
- **Description:** Routes product to correct pizza builder UI
- **Required for:** All food products

### 2. `custom.pizza_badge`
- **Type:** Single line text
- **Namespace:** custom
- **Key:** pizza_badge
- **Description:** Badge displayed on product cards (Bestseller, New, Spicy, Fan Fave)
- **Required for:** Optional — only products that need a badge

### 3. `custom.allergens`
- **Type:** Multi-line text
- **Namespace:** custom
- **Key:** allergens
- **Description:** Comma-separated allergen list (Gluten, Dairy, Eggs, etc.)
- **Required for:** All food products

### 4. `custom.calories_base`
- **Type:** Integer
- **Namespace:** custom
- **Key:** calories_base
- **Description:** Base calories per serving before toppings
- **Required for:** Optional

### 5. `custom.prep_time_mins`
- **Type:** Integer
- **Namespace:** custom
- **Key:** prep_time_mins
- **Description:** Estimated preparation time in minutes
- **Required for:** Optional

---

## Product → Option Set Mapping (All 71 Products)

### Whole Pies → `whole-pizza`
| Product | Handle | Option Set |
|---|---|---|
| Classic Cheese Pizza | classic-cheese-pizza | whole-pizza |
| Margherita Pizza | margherita-pizza | whole-pizza |
| Pepperoni Pizza | pepperoni-pizza | whole-pizza |
| Meat Lovers Pizza | meat-lovers-pizza | whole-pizza |
| Veggie Medley Pizza | veggie-medley-pizza | whole-pizza |
| White Pizza | white-pizza | whole-pizza |
| BBQ Chicken Pizza | bbq-chicken-pizza | whole-pizza |
| Buffalo Chicken Pizza | buffalo-chicken-pizza | whole-pizza |
| Build Your Own Pizza | build-your-own-pizza | whole-pizza |

### Grandma → `grandma-pizza`
| Product | Handle | Option Set |
|---|---|---|
| Grandma Pizza | grandma-pizza | grandma-pizza |

### Starters → `appetizer`
| Product | Handle | Option Set |
|---|---|---|
| Buffalo Wings | buffalo-wings | appetizer |
| Garlic Knots | garlic-knots | appetizer |
| Arancini Mozzarella | arancini-mozzarella | appetizer |
| Arancini Beef Bolognese | arancini-bolognese | appetizer |
| Mozzarella Sticks | mozzarella-sticks | appetizer |
| Zucchini Fries | zucchini-fries | appetizer |
| Baked Chicken Tenders | chicken-tenders | appetizer |
| Focaccia | focaccia | appetizer |

### Calzones → `calzone`
| Product | Handle | Option Set |
|---|---|---|
| Classic Calzone | classic-calzone | calzone |
| Grandma Calzone | grandma-calzone | calzone |
| Veggie Calzone | veggie-calzone | calzone |

### Pasta → `pasta`
| Product | Handle | Option Set |
|---|---|---|
| Pasta Marinara | pasta-marinara | pasta |
| Pasta Alla Vodka | pasta-alla-vodka | pasta |
| Pasta Alfredo | pasta-alfredo | pasta |
| Pasta Bolognese | pasta-bolognese | pasta |
| Baked Ziti | baked-ziti | pasta |

### Hot Baked → `hot-baked`
| Product | Handle | Option Set |
|---|---|---|
| Eggplant Parmigiana | eggplant-parmigiana | hot-baked |
| Chicken Parmigiana | chicken-parmigiana | hot-baked |
| Sausage and Peppers | sausage-and-peppers | hot-baked |
| Shrimp Parmigiana | shrimp-parmigiana | hot-baked |

### Heroes & Subs → `sandwich`
| Product | Handle | Option Set |
|---|---|---|
| Meatball Parm Sub | meatball-parm-sub | sandwich |
| Chicken Parm Sub | chicken-parm-sub | sandwich |
| Philly Cheesesteak | philly-cheesesteak | sandwich |
| Italian Sub | italian-sub | sandwich |

### Salads → `salad`
| Product | Handle | Option Set |
|---|---|---|
| Caesar Salad | caesar-salad | salad |
| House Salad | house-salad | salad |
| Greek Salad | greek-salad | salad |
| Antipasto Salad | antipasto-salad | salad |

### Combos → `combo`
| Product | Handle | Option Set |
|---|---|---|
| Weekend Family Special | weekend-family-special | combo |
| The Peetey Deal | peetey-deal | combo |
| Sicilian Date Night | sicilian-date-night | combo |

### Drinks → `drink`
| Product | Handle | Option Set |
|---|---|---|
| Soda 2-Liter | soda-2-liter | drink |

---

## Liquid Code: Reading Metafields

```liquid
{% comment %} Get the option set for the current product {% endcomment %}
{% assign option_set = product.metafields.custom.pizza_option_set | default: 'whole-pizza' %}

{% comment %} Render the correct builder snippet {% endcomment %}
{% case option_set %}
  {% when 'whole-pizza' %}
    {% render 'pizza-builder-whole', product: product %}
  {% when 'grandma-pizza' %}
    {% render 'pizza-builder-grandma', product: product %}
  {% when 'appetizer' %}
    {% render 'pizza-builder-appetizer', product: product %}
  {% when 'calzone' %}
    {% render 'pizza-builder-calzone', product: product %}
  {% when 'combo' %}
    {% render 'pizza-builder-combo', product: product %}
  {% else %}
    {% render 'pizza-builder-simple', product: product %}
{% endcase %}

{% comment %} Badge {% endcomment %}
{% assign badge = product.metafields.custom.pizza_badge %}
{% if badge != blank %}
  <span class="antonio-badge antonio-badge--red">{{ badge }}</span>
{% endif %}

{% comment %} Allergens {% endcomment %}
{% assign allergens = product.metafields.custom.allergens %}
{% if allergens != blank %}
  <p class="antonio-allergens">Contains: {{ allergens }}</p>
{% endif %}
```

---

## Bulk Metafield Import CSV
> For Shopify's native bulk import or Matrixify/Excelify app

```csv
Handle,Metafield: custom.pizza_option_set [single_line_text_field]
classic-cheese-pizza,whole-pizza
margherita-pizza,whole-pizza
pepperoni-pizza,whole-pizza
meat-lovers-pizza,whole-pizza
veggie-medley-pizza,whole-pizza
white-pizza,whole-pizza
bbq-chicken-pizza,whole-pizza
buffalo-chicken-pizza,whole-pizza
build-your-own-pizza,whole-pizza
grandma-pizza,grandma-pizza
buffalo-wings,appetizer
garlic-knots,appetizer
arancini-mozzarella,appetizer
arancini-bolognese,appetizer
mozzarella-sticks,appetizer
zucchini-fries,appetizer
chicken-tenders,appetizer
focaccia,appetizer
classic-calzone,calzone
grandma-calzone,calzone
veggie-calzone,calzone
pasta-marinara,pasta
pasta-alla-vodka,pasta
pasta-alfredo,pasta
pasta-bolognese,pasta
baked-ziti,pasta
eggplant-parmigiana,hot-baked
chicken-parmigiana,hot-baked
sausage-and-peppers,hot-baked
shrimp-parmigiana,hot-baked
meatball-parm-sub,sandwich
chicken-parm-sub,sandwich
philly-cheesesteak,sandwich
italian-sub,sandwich
caesar-salad,salad
house-salad,salad
greek-salad,salad
antipasto-salad,salad
weekend-family-special,combo
peetey-deal,combo
sicilian-date-night,combo
soda-2-liter,drink
```
