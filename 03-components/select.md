# Select / Selector Component Rules

> Source: Figma `wgvYWGdj9Bfq2HSEpRbnLN` node `1377-18475`

---

## Component Definition

Select (`el-select`) supports:
- **Single select** — choose one value from dropdown panel
- **Multi-select** — choose multiple values; selected shown as Tags in the trigger
- **Searchable** — optional search input to filter options
- **Cascader** — multi-level linked selection

**Multi-select default:** Use standard dropdown Select (not tag-input style), unless PRD explicitly requires tag display.

---

## Trigger Dimensions

| Context | Height | Min Width | Padding | Radius |
|---|---|---|---|---|
| Standard (form/dialog) | **36px** | **256px** | `8px 12px` | `4px` |
| Small (widget/compact) | **32px** | **160px** | `8px 12px` | `4px` |

- Font: Inter Regular 14px / line-height 20px
- Arrow icon: `top bar-arrow-down`, size `20×20px`, rotates 180° when open

---

## Trigger States

| State | Background | Border | Text Color | Arrow |
|---|---|---|---|---|
| **Default** | `#ffffff` | `1px solid #dedfe3` | Placeholder: `#b2b2b8` | `#b2b2b8` (down) |
| **Hover** | `#ffffff` | `1px solid var(--pcv-brand)` | Placeholder: `#b2b2b8` | `var(--pcv-brand)` (down) |
| **Active / Open** | `#ffffff` | `1px solid var(--pcv-brand)` | Placeholder: `#b2b2b8` | Rotated 180° (up) |
| **Has Value** | `#ffffff` | `1px solid #dedfe3` | Value: `#66666c` | `#b2b2b8` (down) |
| **Disabled** | `#f4f5f6` | `1px solid #dedfe3` | `#b2b2b8` | `#b2b2b8`, not clickable |
| **Success** | `#ffffff` | `1px solid #28c76f` | `#66666c` | Up |
| **Error** | `#ffffff` | `1px solid #ea5455` | `#ea5455` | Down |

---

## Dropdown Panel

```css
.select-dropdown {
  background: #ffffff;
  border-radius: 6px;               /* var(--radius-md) */
  box-shadow: 0 4px 14px 4px rgba(0, 0, 0, 0.06);
  padding: 6px 0;
  min-width: /* equal to trigger width */;
  max-width: 480px;
}
```

Text overflow: `text-overflow: ellipsis`, no wrap (unless panel width explicitly allows)

---

## Single Select Option States

| State | Background | Text | Weight |
|---|---|---|---|
| Default | transparent | `#66666c` | Regular 400 |
| Hover | `rgba(var(--pcv-brand-rgb), 0.15)` | `#66666c` | Regular 400 |
| Selected | transparent | `var(--pcv-brand)` | Medium 500 |
| Selected + Hover | `rgba(var(--pcv-brand-rgb), 0.15)` | `var(--pcv-brand)` | Medium 500 |
| Disabled | transparent | `#b2b2b8` | Regular 400 |

Option height: **36px**, padding: `0 16px`

---

## Dropdown with Add/Select Button Pattern

When options are complex and require an "Add" action, use a bordered button with dropdown arrow instead of a plain `<select>`:

```
[Add Product Source ▾]  ← brand-colored outline button
```

```css
.btn-add-dropdown {
  border: 1px solid var(--pcv-brand);
  color: var(--pcv-brand);
  background: transparent;
  height: 36px;
  padding: 8px 16px;
  border-radius: 4px;
  font: Inter Medium 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
/* Right arrow icon: Pacvue arrow-down, 20×20px, color: var(--pcv-brand) */
/* Click: open custom dropdown (not native <select>) */
```

---

## Multi-Select Tag Display

Only use tag-input style when PRD explicitly requires it.  
Default multi-select uses the same trigger as single select (shows count or comma-separated values).

Tag spec (when enabled):
```css
.select-tag {
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;   /* chip */
  background: rgba(var(--pcv-brand-rgb), 0.1);
  color: var(--pcv-brand);
  font-size: 12px;
  font-weight: 500;
}
```
