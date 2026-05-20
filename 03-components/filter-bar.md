# Filter Bar Component Rules

> Source: Figma `wgvYWGdj9Bfq2HSEpRbnLN` nodes `7347:114153` · `11255:267108`

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│ [Filters] [Custom] │ Cond 1       │ Cond 2  │ Cond 3   │ ← Row 1: 4 equal columns
│ Cond 4             │ Cond 5       │         │          │ ← Row 2: 4 equal columns
│                                     [Search] [Clear ⌫] │ ← Last row: right-aligned
└─────────────────────────────────────────────────────────┘
```

### Core Rules (Must Follow)

1. **4-column equal-width grid** — `gap: 16px`, fill full container width
2. **Search + Clear own the last row, right-aligned** — via `align-items: flex-end`
3. Filter condition height: fixed **36px**, width from grid (no fixed pixels)
4. Filter condition inner: `Label | divider | Value ↓`
5. Row gap: `gap: 16px`; filter bar → toolbar below: **zero gap**

---

## CSS Implementation

```css
/* Outer container */
.filter-bar {
  padding: 16px 24px;
  border-bottom: 1px solid #edeef1;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;   /* key: makes Search/Clear row right-align */
  gap: 16px;
}

/* Filter conditions area */
.filter-conditions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Each row: 4 equal columns */
.filter-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
}

/* Filters + Custom buttons share 1 column, split equally */
.filter-quick {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
```

---

## Filter Condition Box

### Dimensions & Style

```css
.filter-cond {
  height: 36px;
  width: 100%;
  border: 1px solid #dedfe3;
  border-radius: 4px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #ffffff;
  cursor: pointer;
  transition: border-color .15s;
}
.filter-cond:hover { border-color: var(--pcv-brand); }
```

### Inner Structure: `Label | Divider | Value ↓`

```
[Label  Medium #45464F][1px #DEDFE3 h:16px][Value Regular #66666C][↓ 20×20px]
 padding: 0 12px         flex-shrink: 0       flex: 1 min-width: 0   pr: 10px
```

| Element | Color | Weight | Notes |
|---|---|---|---|
| Label | `#45464f` | Medium 500 | No wrap, `flex-shrink: 0` |
| Divider | `#dedfe3` | — | `width: 1px; height: 16px` |
| Value (has value) | `#66666c` | Regular 400 | User's selected value |
| Value (empty) | `#b2b2b8` | Regular 400 | Placeholder |
| Value (active) | `var(--pcv-brand)` | Medium 500 | Filter is applied |
| Arrow ↓ | `#dedfe3` / hover `var(--pcv-brand)` | — | 20×20px |

### Special Condition Types

| Type | How to Handle |
|---|---|
| Text search | Replace Value with `<input>`, no arrow |
| Date range | Value area: calendar icon + date text or placeholder |
| Wide condition (2 columns) | `grid-column: span 2` |

---

## Filters / Custom Buttons

```css
.btn-filter {
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--pcv-brand);
  border-radius: 4px;
  background: #ffffff;
  color: var(--pcv-brand);
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.btn-filter:hover { background: rgba(var(--pcv-brand-rgb), .06); }
```

Icon: 16×20px, `stroke: currentColor`

---

## Search & Clear Button Row

```css
.filter-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Search — primary */
.btn-search {
  height: 36px;
  padding: 0 20px;
  background: var(--pcv-brand);
  border: 1px solid var(--pcv-brand);
  border-radius: 6px;          /* ⚠️ 6px, NOT 4px — Figma confirmed */
  color: #fbfbfb;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Clear — icon button */
.btn-clear {
  width: 36px;
  height: 36px;
  border: 1px solid #dedfe3;
  border-radius: 6px;          /* same as Search */
  background: #ffffff;
  display: grid;
  place-items: center;
}
.btn-clear:hover { border-color: var(--pcv-brand); color: var(--pcv-brand); }
```

> ⚠️ Search and Clear use `border-radius: 6px` (radius-md) — different from condition boxes at 4px.

---

## Responsive Behavior

| Viewport | Approx. column width |
|---|---|
| 1280px | ~280px per column |
| 1440px | ~320px per column |
| 1920px | ~440px per column |

`grid-template-columns: repeat(4, 1fr)` auto-adapts — **never hard-code column widths**.

### Condition Row Count
- ≤ 4 conditions: 1 row (including Filters+Custom button group occupying 1 column)
- 5–8 conditions: 2 rows
- Empty grid cells: leave blank, no placeholder divs needed

---

## Common Mistakes vs. Correct Approach

| Property | Old (Wrong) | New (Correct) |
|---|---|---|
| Condition layout | `flex-wrap: wrap` + fixed `min-width` | `grid repeat(4, 1fr)` |
| Condition width | Fixed pixels (220px/260px) | Equal width (1fr) |
| Search position | Same row, far right | **Own row, right-aligned** |
| Search border-radius | 4px | **6px** |
| Inner divider | None | **1px #DEDFE3, height 16px** |
