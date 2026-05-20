# List Page Template — Main Management Page

> Applies to all data management list pages: Catalogs, Campaigns, Reports, Ad Groups, etc.

---

## When to Use This Template

Use this template when **all** of the following are true:

- Core content is a **data table**
- Top has a **Filter Bar**
- Bottom has a **Pagination** bar
- Toolbar has a **Create** primary action + optional **Bulk Operation**
- Page title is **single-level** (Type 1: no breadcrumb path)

---

## Page Structure (Top to Bottom)

```
┌─────────────────────────────────────────────────────────────────┐
│ Sidebar (62px, fixed, bg: --pcv-nav-bg)                        │
├─────────────────────────────────────────────────────────────────┤
│ Top Nav (56px, sticky top:0, bg: --pcv-brand)                  │
├─────────────────────────────────────────────────────────────────┤
│ Page Title Bar (56px, sticky top:56px, bg:white, shadow)       │
├─────────────────────────────────────────────────────────────────┤
│ Page Content (flex-col, padding: 16px 24px)                    │
│  ┌── Table Card (white, border-radius:6px) ──────────────────┐ │
│  │  Filter Bar (padding 16px 24px, flex-col, align:flex-end) │ │
│  │  ──────────────────────────────────────────────────────── │ │
│  │  Toolbar (68px, justify-between)                          │ │
│  │  ──────────────────────────────────────────────────────── │ │
│  │  Horizontal Scrollbar (16px, only when columns overflow)  │ │
│  │  ──────────────────────────────────────────────────────── │ │
│  │  Table Header (48px)                                      │ │
│  │  Table Rows  (52px each)                                  │ │
│  │  ──────────────────────────────────────────────────────── │ │
│  │  Pagination (64px, justify-between)                       │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**Key rule: zero vertical gap between Filter Bar → Toolbar → Scrollbar → Table → Pagination.**  
Left/right padding: **24px** on all sections.

---

## Layout Dimensions

| Zone | Height | Background | Notes |
|---|---|---|---|
| Sidebar | 62px (fixed width) | `--pcv-nav-bg` | Fixed position |
| Top Nav | 56px | `--pcv-brand` | `sticky; top: 0; z-index: 200` |
| Page Title Bar | 56px | `#ffffff` | `sticky; top: 56px; z-index: 80` |
| Filter Bar | auto | `#ffffff` | Grows with filter rows |
| Toolbar | 68px | `#ffffff` | `border-top: 1px solid #edeef1` |
| Horizontal Scrollbar | 16px | `#f4f5f6` | Only when `table min-width > container` |
| Table Header | 48px | `#ffffff` | Sticky during scroll |
| Table Row | 52px (min) | `#ffffff` | Expands for multi-line content |
| Total/Footer Row | 52px | `#ffffff` | Bold numbers |
| Pagination | 64px | `#ffffff` | `border-top: 1px solid #edeef1` |

---

## Page Title Bar — Two Types

### Type 1: Single-level (no breadcrumb)
```
[Page Title — 20px/600/#45464f]
```
```css
.page-title-bar {
  height: 56px;
  padding: 0 24px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(228, 228, 228, 0.5);
  position: sticky;
  top: 56px;
  z-index: 80;
}
.page-title { font-size: 20px; font-weight: 600; color: #45464f; }
```

### Type 2: Multi-level (with breadcrumb path)
```
{Module Icon 24px}  {Parent Page — 18px/500/#66666c}  {chevron-right 16px}  {Current Page — 20px/600/#45464f}
```
- Height: 56px, padding: 14px 24px
- Never add a standalone `<h1>` or description paragraph below this bar

---

## Toolbar (68px)

```css
.toolbar {
  height: 68px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #edeef1;
  background: #ffffff;
}
```

**Left side** = data operations (Create, Bulk Target, Bulk Op)  
**Right side** = non-destructive tool icons (visibility, save, download, custom columns)

### Left Button States

| Type | Background | Border | Text | When |
|---|---|---|---|---|
| Primary (Create) | `var(--pcv-brand)` | none | `#ffffff` | Always |
| Secondary (Bulk Target) | transparent | `1px solid var(--pcv-brand)` | `var(--pcv-brand)` | Always |
| Disabled (Bulk Op) | `rgba(#82858B, 0.05)` | `1px solid #DEDFE3` | `#B2B2B8` | No rows selected |
| Active (Bulk Op) | transparent | `1px solid var(--pcv-brand)` | `var(--pcv-brand)` | Rows selected |

All buttons: `height: 36px; padding: 0 20px; border-radius: 4px; font: Inter Medium 14px; gap: 8px`  
Left button group gap: `gap: 16px`

### Right Tool Icons
```
[show full number] [visibility]  |  [save] [download] [custom columns]
                                 ↑
                     Separator: 2px × 24px, #D2D4D9, border-radius: 2px
```
Icon size: `24×24px`, color: `#66666c`, hover → `var(--pcv-brand)`

---

## Four Page States

| State | Description |
|---|---|
| Normal | Data table with rows |
| Loading | Spinner animation, centered overlay |
| Empty | Empty illustration + Create button |
| Error | Error icon + Retry button |

Loading icon: `--pcv-brand` color, spin animation  
Empty/Error icons: centered, `64×64px` circle background  

---

## Common Pitfalls

### 1. Fixed column background must use `color-mix` (not `rgba`)
```css
/* ❌ Wrong — rgba is transparent, columns behind will show through */
tbody tr:hover td:first-child { background: rgba(2, 83, 182, 0.04); }

/* ✅ Correct — solid equivalent color */
tbody tr:hover td:first-child {
  background: color-mix(in srgb, var(--pcv-brand) 4%, #ffffff);
}
```

### 2. Table needs `border-collapse: separate` for sticky column shadows
```css
table { border-collapse: separate; border-spacing: 0; }
```

### 3. Date picker panel must be appended to `<body>` with `position: fixed`
Filter bar has `overflow: hidden`. If the date panel uses `position: absolute` inside it, the panel gets clipped.  
Use JS `getBoundingClientRect()` to calculate the panel's `top`/`left`, then apply to a `fixed` element.

### 4. Prevent page-level horizontal scrollbar
```css
.main-area { overflow-x: hidden; max-width: calc(100vw - 62px); }
```
Horizontal scrolling should only happen inside `.table-wrap`.

---

## Related Rules

| Component | Rule File |
|---|---|
| Filter Bar | `03-components/filter-bar.md` |
| Table | `03-components/table.md` |
| Pagination | `03-components/pagination.md` |
| Checkbox | `03-components/checkbox.md` |
| Date Picker | `03-components/date-picker.md` |
| Page Layout & Footer | `02-layout/page-layout-footer.md` |
