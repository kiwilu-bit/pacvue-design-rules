# Pagination Component Rules

> Source: Figma `wgvYWGdj9Bfq2HSEpRbnLN` node `7347:114707`

---

## Layout Structure

```
┌──────────────────────────────────────────────────────────────────┐
│ Total 100 entries,  [10/page ↕]    [<][1][2][3][4][…][1000][>]  Go to page [1] │
│ ←────── Left ──────────────────── ──────────────── Right ───────────────────── │
└──────────────────────────────────────────────────────────────────┘
```

- `justify-content: space-between`
- `height: 64px`
- `border-top: 1px solid #edeef1`

---

## Core Rules

1. **`justify-content: space-between`** — left has total + page size; right has all navigation controls
2. Pagination is **below the table**, separated by `border-top` only (no margin)
3. Fixed height: **64px**, `border-top: 1px solid #edeef1`
4. Left: `Total X entries,` + page size dropdown
5. Right: `[<]` page numbers `[>]` + `Go to page` input

---

## CSS Implementation

```css
/* Container */
.pagination {
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #edeef1;
  background: #ffffff;
  flex-shrink: 0;
}

/* Left: total + page size */
.pagination-left {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #6e6b7b;
  white-space: nowrap;
}

/* Right: navigation */
.pagination-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

---

## Page Buttons

```css
.page-btn {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #dedfe3;
  background: transparent;
  font-size: 14px;
  font-weight: 400;
  color: #66666c;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
}
.page-btn:hover { border-color: var(--pcv-brand); color: var(--pcv-brand); }

/* Current page: brand border + text, no fill */
.page-btn.active {
  border-color: var(--pcv-brand);
  color: var(--pcv-brand);
  font-weight: 500;
}

/* Ellipsis: no border, not clickable */
.page-btn.ellipsis {
  border-color: transparent;
  cursor: default;
  color: #82858b;
}
.page-btn.ellipsis:hover { border-color: transparent; color: #82858b; }
```

### Key Values

| Property | Value |
|---|---|
| Button size | **32×32px** |
| Border radius | **4px** |
| Default border | `1px solid #dedfe3` |
| Default text | `#66666c` |
| Active border | `1px solid var(--pcv-brand)` |
| Active text | `var(--pcv-brand)`, weight **500** |
| Active background | **transparent** (no fill) |
| Ellipsis | No border, `#82858b` |
| Button gap | `gap: 8px` |

---

## Page Size Dropdown

```css
.page-size-select {
  height: 32px;
  padding: 0 28px 0 10px;
  border: 1px solid #d8d6de;    /* slightly darker than #dedfe3 */
  border-radius: 5px;            /* ⚠️ 5px, not 4px — Figma confirmed */
  font-size: 14px;
  font-weight: 500;
  color: #5e5873;
  background: #ffffff;
  appearance: none;
}
.page-size-select:hover, .page-size-select:focus { border-color: var(--pcv-brand); }
```

| Property | Value |
|---|---|
| Height | **32px** |
| Border radius | **5px** (not standard 4px) |
| Border color | `#D8D6DE` (slightly darker than input boxes) |
| Font | Inter Medium 14px, `#5e5873` |
| Arrow icon | `sort icon` 16×16px (up/down arrows) |

---

## Go to Page Input

```css
.page-goto-input {
  width: 58px;              /* Figma measured */
  height: 32px;
  border: 1px solid #dedfe3;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #45464f;
  background: #ffffff;
}
.page-goto-input:focus { border-color: var(--pcv-brand); }
```

- Label "Go to page": Inter Regular 14px, `#66666c`, `gap: 8px` from input
- Entire goto group lives inside `.pagination-right`

---

## Display Logic

| Scenario | Behavior |
|---|---|
| Data requires pagination | Pagination bar appears, fixed at bottom of table |
| Switch page size, data ≤ new size | **Pagination disappears**, only page size switcher remains |
| On last page, data ≤ page size | **Pagination stays** (user needs position context) |

---

## Element Plus Override Notes

| Property | EP Default | Pacvue Value |
|---|---|---|
| Overall height | ~32px (no fixed row) | **64px** (full row with border-top) |
| Layout | All in one flex | **`justify-between`** (left total, right nav) |
| Button size | 28px | **32×32px** |
| Active button style | Filled background | **Brand border + text only, no fill** |
| Button radius | 2px | **4px** |
| Page size height | 28px | **32px** |
| Page size radius | 4px | **5px** |
| "Go to page" position | Configurable | **Always far right** |
