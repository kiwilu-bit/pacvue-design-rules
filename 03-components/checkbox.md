# Checkbox Component Rules

> Source: Figma `wgvYWGdj9Bfq2HSEpRbnLN` node `1036-11313`

---

## Dimensions

| Property | Value |
|---|---|
| Click target | `20×20px` |
| Checkbox body | `18×18px` |
| Border radius | `3px` |
| Border width | `1.5px` |
| Checkmark size | `8×6px` |
| Indeterminate dash | `width: 8px; height: 2px` |

---

## 7 States

### 1. Unchecked (Default)
```css
.cb {
  width: 18px; height: 18px;
  border-radius: 3px;
  border: 1.5px solid #dedfe3;
  background: #ffffff;
  cursor: pointer;
}
```

### 2. Hover
```css
.cb:hover:not(.disabled) { border-color: var(--pcv-brand); }
```

### 3. Checked
```css
.cb.checked {
  background: var(--pcv-brand);
  border-color: var(--pcv-brand);
}
.cb.checked::after {
  content: '';
  width: 8px; height: 6px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translate(1px, 0px);
  display: block;
}
```

### 4. Indeterminate (partial selection)
```css
.cb.indeterminate { border-color: var(--pcv-brand); background: #ffffff; }
.cb.indeterminate::after {
  content: '';
  width: 8px; height: 2px;
  background: var(--pcv-brand);
  border-radius: 1px;
  display: block;
}
```

### 5. Disabled (unchecked)
```css
.cb.disabled {
  background: #f4f5f6;
  border-color: #dedfe3;
  cursor: not-allowed;
}
```

### 6. Disabled + Checked
```css
.cb.disabled.checked::after { border-color: #b2b2b8; }
```

### 7. Disabled + Indeterminate
```css
.cb.disabled.indeterminate::after { background: #b2b2b8; }
```

---

## Table Header Checkbox — Three Stages

| Stage | Header Checkbox | Condition |
|---|---|---|
| All unselected | Empty border (`#dedfe3`) | Initial state |
| Partial (indeterminate) | `—` dash, `bg: var(--pcv-brand)` | Some rows selected |
| All selected (current page) | ✓ checkmark | All rows checked |

### Header Checkbox Click Behavior

When header checkbox is **Checked** or **Indeterminate**, clicking opens a dropdown:

```
┌─────────────────────┐
│ Select All Page      │  ← selects all paginated data
│ Select Current Page  │  ← highlighted: var(--pcv-brand) text, Medium 500
│ Deselect All         │
└─────────────────────┘
```

Dropdown follows standard dropdown item rules (06-dropdown.md).

---

## Toolbar Link

When any row is selected:
- Toolbar shows **Bulk Operation ▾** button (outlined, brand color)

When no row is selected:
- Bulk operation button is hidden (or shown in disabled state)

---

## Usage in Tables

```html
<!-- Column header checkbox (indeterminate state) -->
<div class="cb indeterminate" id="headerCb" onclick="toggleAll(this)"></div>

<!-- Row checkbox (unchecked) -->
<div class="cb" onclick="toggleRow(this)"></div>

<!-- Row checkbox (checked) -->
<div class="cb checked" onclick="toggleRow(this)"></div>
```

Checkbox is always the **leftmost** cell, `padding-left: 16px` (or 24px if combined with first data column).
