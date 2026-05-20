# Dropdown Menu Component Rules

> Source: Figma `wgvYWGdj9Bfq2HSEpRbnLN` node `1377-21955`

---

## Two Categories

| Category | Component | Description |
|---|---|---|
| **Action / Command** | `el-dropdown` | Shows a list of actions after trigger; user clicks to execute |
| **Form Selection** | `el-select` | Bound to form field; user selects a value |

### When to Use Dropdown

1. Navigation sub-menus (top nav or sidebar sub-items)
2. Toolbar action groups — "More Actions ···" or bulk operations
3. Page content filter / sort (filter bar uses `el-select`)
4. Row-level action commands (Edit / Delete / Export)

### When NOT to Use

- Options ≤ 3 and don't need hiding → use Radio or Checkbox directly
- Multi-select with explicit confirm step → use Dialog + Checkbox list
- Navigation has enough space → don't collapse into dropdown

---

## Trigger Button Types

### 1. Button Trigger (filled)
```css
height: 36px;
padding: 8px 20px;
border-radius: 4px;
background: var(--pcv-brand);
color: #ffffff;
font: Inter Medium 14px / 20px;
gap: 8px;  /* label → arrow icon */
/* arrow icon: 20×20px, rotates 180° when open */
```

| State | Background | Text | Notes |
|---|---|---|---|
| Default | `var(--pcv-brand)` | `#ffffff` | |
| Hover | same + `box-shadow: 0 0 10px 0 rgba(brand, 0.65)` | `#ffffff` | Glow |
| Active (open) | same | `#ffffff` | Arrow flips |
| Disabled | `rgba(brand, 0.65)` | `#ffffff` | Arrow also 0.65 opacity |

### 2. Text Trigger (no border)
```css
height: 36px;
padding: 8px 20px;
border-radius: 4px;
background: transparent;
color: var(--pcv-brand);
font: Inter Medium 14px / 20px;
```

| State | Background | Text |
|---|---|---|
| Default | transparent | `var(--pcv-brand)` |
| Hover | `rgba(brand, 0.05)` | `var(--pcv-brand)` |
| Disabled | transparent | `rgba(brand, 0.65)` |

### 3. Outlined Trigger (border only)
```css
height: 36px;
padding: 8px 20px;
border-radius: 4px;
border: 1px solid var(--pcv-brand);
background: #ffffff;
color: var(--pcv-brand);
font: Inter Medium 14px / 20px;
```

| State | Background | Border |
|---|---|---|
| Default | `#ffffff` | `var(--pcv-brand)` |
| Hover | `rgba(brand, 0.05)` | `var(--pcv-brand)` |
| Active (open) | `rgba(brand, 0.05)` | `rgba(brand, 0.65)` |
| Disabled | `rgba(brand, 0.05)` | `rgba(brand, 0.65)` |

---

## Dropdown Panel

```css
.dropdown-panel {
  background: #ffffff;
  border-radius: 6px;               /* var(--radius-md) */
  box-shadow: 0 4px 14px 4px rgba(0, 0, 0, 0.06);
  padding: 6px 0;
  min-width: /* matches trigger width */;
}
```

---

## Dropdown Item States

| State | Background | Text Color | Weight |
|---|---|---|---|
| Default | transparent | `#66666c` | Regular 400 |
| Hover | `rgba(var(--pcv-brand-rgb), 0.06)` | `var(--pcv-brand)` | Regular 400 |
| Selected / Active | transparent | `var(--pcv-brand)` | **Medium 500** |
| Selected + Hover | `rgba(var(--pcv-brand-rgb), 0.06)` | `var(--pcv-brand)` | **Medium 500** |
| Danger | transparent | `#ea5455` | Regular 400 |
| Danger + Hover | `rgba(234, 84, 85, 0.06)` | `#ea5455` | Regular 400 |
| Disabled | transparent | `#b2b2b8` | Regular 400 |

Item dimensions:
- Height: **36px**
- Padding: `0 16px`
- Icon (optional): `16×16px`, left of text, `gap: 8px`

---

## Dividers in Dropdown

Use a 1px horizontal divider (`#edeef1`) to group related items. No padding around the divider line itself.

```html
<div class="dropdown-divider"></div>
```
```css
.dropdown-divider { height: 1px; background: #edeef1; margin: 4px 0; }
```
