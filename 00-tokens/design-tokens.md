# Design Tokens — Pacvue Design System test

> Source: Pacvue Design System Figma `wgvYWGdj9Bfq2HSEpRbnLN`

---

## Core Rules (Never Break)

- **Never hard-code brand colors** (`#FF9F43`, `#0253B6`). Always use `var(--pcv-brand)`.
- **Spacing**: 8px base grid — use `4 / 8 / 12 / 16 / 24 / 32 / 48px` only. No 5px, 10px, 15px.
- **Border radius**: `4px` buttons/inputs · `6px` menu items & cards in nav · `8px` large cards · `999px` chips.
- **Typography**: Inter only, minimum 11px, minimum weight 400. No font-weight 300.
- **Focus rings**: `outline: 2px solid var(--pcv-brand); outline-offset: 2px` on `:focus-visible`.

---

## CSS Variables

```css
/* ─── Theme: Blue (default) ─────────────────────────── */
:root,
[data-theme="blue"] {
  --pcv-brand:          #0253b6;
  --pcv-brand-rgb:      2, 83, 182;
  --pcv-nav-bg:         #12143c;
  --pcv-icon-default:   #e7e4ee;
  --pcv-icon-selected:  #66a8ff;
  --pcv-hover-bg:       #f2f6fb;
  --pcv-selected-bg:    #d9e5f4;
}

/* ─── Theme: Orange ──────────────────────────────────── */
[data-theme="orange"] {
  --pcv-brand:          #ff9f43;
  --pcv-brand-rgb:      255, 159, 67;
  --pcv-nav-bg:         #333333;
  --pcv-icon-default:   #e7e4ee;
  --pcv-icon-selected:  #ff9f43;
  --pcv-hover-bg:       #fffaf6;
  --pcv-selected-bg:    #fff1e3;
}

/* ─── Shared Tokens ──────────────────────────────────── */
:root {
  /* Status */
  --pcv-success:        #28c76f;
  --pcv-warning:        #ff9f43;
  --pcv-error:          #ea5455;
  --pcv-neutral:        #82858b;

  /* Text */
  --pcv-text-primary:   #45464f;
  --pcv-text-secondary: #66666c;
  --pcv-text-muted:     #82858b;
  --pcv-text-disabled:  #b2b2b8;

  /* Surfaces */
  --pcv-bg:             #f2f3f6;   /* page background */
  --pcv-surface:        #ffffff;   /* card / panel background */

  /* Borders */
  --pcv-border:         #edeef1;   /* dividers, table rows */
  --pcv-border-input:   #dedfe3;   /* inputs, select boxes */

  /* Misc */
  --pcv-scrollbar:      #d2d4d9;

  /* Radius */
  --radius-sm:          4px;       /* buttons, inputs, checkboxes */
  --radius-md:          6px;       /* cards, menus, dialogs */

  /* Typography */
  --font-sans: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

---

## Theme Switching

```html
<!-- Blue theme (default) -->
<html data-theme="blue">

<!-- Orange theme -->
<html data-theme="orange">
```

---

## Color Quick Reference

| Token | Value (Blue) | Usage |
|---|---|---|
| `--pcv-brand` | `#0253b6` | Primary actions, links, focus states |
| `--pcv-nav-bg` | `#12143c` | Sidebar background |
| `--pcv-success` | `#28c76f` | Active/enabled status |
| `--pcv-warning` | `#ff9f43` | Warning, orange theme brand |
| `--pcv-error` | `#ea5455` | Error states, delete actions |
| `--pcv-text-primary` | `#45464f` | Headings, important text |
| `--pcv-text-secondary` | `#66666c` | Body text, table cell values |
| `--pcv-text-muted` | `#82858b` | Labels, hints |
| `--pcv-text-disabled` | `#b2b2b8` | Disabled elements |
| `--pcv-bg` | `#f2f3f6` | Page background |
| `--pcv-border` | `#edeef1` | Table dividers |
| `--pcv-border-input` | `#dedfe3` | Input/select borders |

---

## Spacing Scale

| Token | Value | Typical use |
|---|---|---|
| s1 | 4px | Label → input gap |
| s2 | 8px | Icon → text gap, button inner |
| s3 | 12px | Repeated row gap in complex groups |
| s4 | 16px | Filter bar grid gap |
| s5 | 20px | Two-column field gap, button group |
| s6 | 24px | Section → section gap, card padding |
| s7 | 32px | — |
| s8 | 48px | — |

---

## Responsive Breakpoints

| Width | Role |
|---|---|
| 1280px | Minimum supported |
| 1440px | **Primary design target** — all designs built at this width |
| 1920px | Apply `max-width: var(--content-max-width)` on `.page-content` |

---

## Vue Project Import Order

```js
// main.js / main.ts
import 'element-plus/dist/index.css'
import '@/../../pacvue-design-system/tokens.css'
import '@/../../pacvue-design-system/el-overrides.css'
```
