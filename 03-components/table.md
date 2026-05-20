# Table Component Rules

> Source: Figma nodes `19120-18385` (selection & row styles) · `11255-130924` (layout & toolbar)  
> Compatible with `surely-table` (Pacvue custom) and `el-table`.

---

## Complete Table Layout (Top to Bottom)

```
┌──────────────────────────────────────────────────────┐ ← Filter Bar (auto height)
│  [Filters] [Custom]  Vendor ↓  Name...  [Search]    │   px: 24px, no fixed height
├──────────────────────────────────────────────────────┤ ← Toolbar (68px)
│  [+ Create]  [Bulk Op ↓]             👁 💾 ⬇ ☰      │   border-top: 1px solid #EDEEF1
├──────────────────────────────────────────────────────┤ ← Horizontal Scrollbar (16px)
├──────────────────────────────────────────────────────┤ ← Header (48px)
│  ☑  Campaign ↕   State ↕   Type ↕   Budget ↕   ⋮   │
├──────────────────────────────────────────────────────┤
│  ☐  Brand-SP...  ● Enabled↓  SP   $234   ⋮          │ ← Data Row (52px)
│  ☐  ...                                              │
├──────────────────────────────────────────────────────┤
│     Total                             $234   310.4K  │ ← Total Row (52px)
├──────────────────────────────────────────────────────┤ ← Pagination (64px)
│  Total 100 entries  10/page   < 1 2 3 [4] … 1000 >  │
└──────────────────────────────────────────────────────┘
```

**Zero vertical gap between all zones. Left/right padding: 24px.**

| Zone | Height | Background |
|---|---|---|
| Filter Bar | auto | `#ffffff` |
| Toolbar | **68px** | `#ffffff` |
| Horizontal Scrollbar | **16px** | `#f2f3f6` |
| Header | **48px** | `#ffffff` |
| Data Row | **52px** (min) | `#ffffff` |
| Total Row | **52px** | `#ffffff` |
| Pagination | **64px** | `#ffffff` |

---

## Toolbar (68px)

```css
.toolbar {
  height: 68px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #edeef1;
  background: #ffffff;
}
```

**Left** = data operations (Create, Bulk Target, Bulk Op)  
**Right** = non-destructive tools (show number, visibility, save, download, custom columns)

### Button States

| Type | BG | Border | Text | When |
|---|---|---|---|---|
| Primary (Create) | `var(--pcv-brand)` | none | `#ffffff` | Default |
| Secondary (Bulk Target) | transparent | `1px solid var(--pcv-brand)` | `var(--pcv-brand)` | Default |
| Disabled (Bulk Op) | `rgba(#82858B, 0.05)` | `1px solid #DEDFE3` | `#B2B2B8` | No rows selected |
| Active (Bulk Op) | transparent | `1px solid var(--pcv-brand)` | `var(--pcv-brand)` | Rows selected |

All buttons: `height: 36px; padding: 0 20px; border-radius: 4px; font: Inter Medium 14px`  
Left group gap: `gap: 16px`  
Right icon size: `24×24px`, color `#66666c`, hover → `var(--pcv-brand)`

---

## Table Header (48px)

```css
th {
  height: 48px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: #45464f;
  background: #ffffff;
  border-bottom: 1px solid #edeef1;
  white-space: nowrap;
}
```

| Header Element | Size | Notes |
|---|---|---|
| Checkbox | 20×20px | `left: 24px`, first column |
| Column title | Inter Medium/Regular 14px, `#45464f` | `left: 16px` |
| Sort icon (↑↓) | `12×24px` frame (two 12×12px arrows) | Right of title; active arrow = `var(--pcv-brand)` |
| Tooltip icon (ⓘ) | 18×18px | Right of title |
| Actions column icon | 24×24px | Last column, centered |

---

## Data Rows (52px)

```css
tbody tr { height: 52px; border-bottom: 1px solid #edeef1; }
td { height: 52px; padding: 0 16px; font-size: 14px; color: #66666c; }
td:first-child { padding-left: 16px; }  /* checkbox column */
td:last-child  { padding: 0; width: 32px; }  /* action column */
```

### Row Background States

| State | Background | Trigger |
|---|---|---|
| Default | `#ffffff` | Normal |
| Hover | `rgba(var(--pcv-brand-rgb), 0.04)` | Mouse over |
| Selected | `rgba(var(--pcv-brand-rgb), 0.06)` | Checkbox checked |
| Expanded | `#fafafa` | Expanded child row |

---

## Special Cell Types

### Checkbox Column
```css
/* Unchecked */
.cb { width: 18px; height: 18px; border: 1.5px solid #dedfe3; border-radius: 3px; background: #fff; }
/* Checked */
.cb.checked { background: var(--pcv-brand); border-color: var(--pcv-brand); }
/* Indeterminate (—) */
.cb.indeterminate { border-color: var(--pcv-brand); } /* dash via ::after */
```

### Status Dot
```
● Active   → #28c76f (green)
● Paused   → #82858b (gray)
● Error    → #ea5455 (red)
● Warning  → #ff9f43 (orange)
```
Size: `12×12px` circle, paired with chevron-down for click-to-toggle

### Actions Column (⋮)
```css
width: 32px;  /* Fixed, non-resizable */
/* ⋮ icon: 24×24px, centered */
/* Visible only on row hover */
```

### Numeric / Currency Columns
- `text-align: right`
- Format: `$234`, `310.4K`
- Total row: `font-weight: 600`

---

## Bulk Selection (Three States)

| State | Header Checkbox | Trigger |
|---|---|---|
| All unselected | Empty border | Initial |
| Partial (indeterminate) | `—` dash, `bg: var(--pcv-brand)` | Some rows selected |
| All selected (current page) | ✓ checked | Select all clicked |

**Header checkbox dropdown (when checked/indeterminate):**
```
┌─────────────────────┐
│ Select All Page      │
│ Select Current Page  │  ← active state: var(--pcv-brand) text, Medium 500
│ Deselect All         │
└─────────────────────┘
```

---

## Fixed Columns (Sticky Scroll)

Activated when `table min-width > container width`.

| Column | Width | Position |
|---|---|---|
| Left fixed (Checkbox + first content col) | ≥ 280px | `position: sticky; left: 0` |
| Right fixed (Action column) | **32px** | `position: sticky; right: 0` |

### Shadow Rules

| Column | Shadow |
|---|---|
| Left fixed (right edge shadow) | `box-shadow: 10px 0 14px 0 rgba(0,0,0,0.06)` |
| Right fixed (left edge shadow) | `box-shadow: -10px 0 14px 0 rgba(0,0,0,0.06)` |

Shadows appear only when scrolling has occurred (not at initial/end positions).

### ⚠️ Critical: Fixed Column Background Must Use `color-mix`

```css
/* ❌ Wrong: rgba causes text bleed-through when scrolling */
tr:hover td.sticky { background: rgba(2, 83, 182, 0.04); }

/* ✅ Correct: solid color equivalent */
tr:hover td.sticky {
  background: color-mix(in srgb, var(--pcv-brand) 4%, #ffffff);
}
tr.selected td.sticky {
  background: color-mix(in srgb, var(--pcv-brand) 6%, #ffffff);
}
```

Also requires:
```css
table { border-collapse: separate; border-spacing: 0; }
```

---

## Column Width Reference

| Column Type | Width | Notes |
|---|---|---|
| Name (main title) | **280px** min | With checkbox, flex grow |
| State / Type | **88–120px** | Status dot + text |
| Text description | **110–149px** | Strategy, mode, etc. |
| Numeric (Budget/CTR) | **106–149px** | Right-aligned |
| Actions (⋮) | **32px** | Fixed, non-resizable |

---

## Horizontal Scrollbar

```css
.el-table__body-wrapper::-webkit-scrollbar { height: 8px; }
.el-table__body-wrapper::-webkit-scrollbar-track { background: #f5f5f5; border-radius: 7px; }
.el-table__body-wrapper::-webkit-scrollbar-thumb { background: #d2d4d9; border-radius: 7px; }
.el-table__body-wrapper::-webkit-scrollbar-thumb:hover { background: #b2b4b9; }
```

---

## Element Plus Override Reference

| Property | EP Default | Pacvue Value |
|---|---|---|
| Header height | ~40px | **48px** |
| Row height | ~40px | **52px** |
| Header background | `--el-fill-color-light` (gray) | **`#ffffff`** |
| Header text color | secondary | `#45464f` |
| Row divider | `--el-border-color-lighter` | `#edeef1` |
| Hover row BG | `--el-fill-color` | `rgba(brand, 0.04)` → use `color-mix` for sticky |
| Selected row BG | `--el-color-primary-light-9` | `rgba(brand, 0.06)` → use `color-mix` for sticky |
| Cell padding | `5px 12px` | `0 16px` |
