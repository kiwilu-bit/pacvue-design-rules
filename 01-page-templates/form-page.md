# Form Page Template — Create / Edit Pages

> Applies to all create and edit pages. Pick one of three size tiers — no custom widths allowed.

---

## Decision Tree: Which Tier?

```
Fields ≤ 8  AND  no multi-step flow  AND  no preview area?
  → M (720px)

Fields > 8  OR  2+ step flow  OR  complex grouping  AND  no preview?
  → L (960px)

Has preview area / visualization / right summary panel / extreme multi-column?
  → XL (1330px)
```

---

## Tier Comparison

| Tier | Form Content Width | Layout | Typical Use |
|---|---|---|---|
| **M** | **720px** | Single column, no stepper, no side panel | Default for most create pages (≤ 8 fields) |
| **L** | **960px** | Left stepper + center form | Complex grouping, multi-step flows |
| **XL** | **1330px** | Left stepper + center form + right info panel | Preview panels, bulk table operations |

---

## M Tier — Single Column Form (720px)

### Page Structure
```
[Sidebar 62px] [Main Area = 100vw - 62px]
 ┌──────────────────────────────────────┐
 │ Top Nav 56px (brand color)           │
 ├──────────────────────────────────────┤
 │ Breadcrumb Bar 56px (white, shadow)  │
 │  {Icon} Parent > Current Page        │
 ├──────────────────────────────────────┤
 │ Page bg #f2f3f6, pt-16px px-24px    │
 │  ┌──── Card (720px, centered) ─────┐ │
 │  │ white · radius: 6px · p: 24px  │ │
 │  │ form fields ...                 │ │
 │  └─────────────────────────────────┘ │
 │                                      │
 │  ┌──── Footer Bar (fixed bottom) ───┐ │
 │  │ 64px · white · shadow-top       │ │
 │  │ justify: flex-end · gap: 20px   │ │
 │  │       [Cancel]  [Primary CTA]   │ │
 │  └──────────────────────────────────┘ │
 └──────────────────────────────────────┘
```

### Key Dimensions
| Element | Value |
|---|---|
| Form card width | **720px**, horizontally centered |
| Card background | white, `border-radius: 6px`, `padding: 24px`, no border, no shadow |
| Page background | `#f2f3f6` |
| Content padding | `padding: 16px 24px 0` |
| Footer height | **64px** |
| Footer style | white, `box-shadow: 0 -2px 8px rgba(0,0,0,0.06)` |
| Footer padding | `padding: 0 24px`, right-aligned buttons |
| Button gap | `gap: 20px` |
| Button size | `height: 36px; min-width: 88px; border-radius: 4px` |
| Content padding-bottom | `80px` (64px footer + 16px gap) |

---

## Breadcrumb / Title Bar

### Type 1 — Single Level (no parent path)
```
[Title — 20px/600/#45464f]
```
- `height: 56px; padding: 16px 24px`
- `box-shadow: 0 2px 4px rgba(228,228,228,0.5)`
- No icon, no arrow

### Type 2 — Multi-Level (with parent breadcrumb)
```
{Module Icon 24px}  {Parent — 18px/500/#66666c}  {chevron-right 16px/#66666c}  {Current — 20px/600/#45464f}
```
- `height: 56px; padding: 14px 24px; gap: 8px`
- `box-shadow: 0 2px 4px rgba(228,228,228,0.5)`

**Shared rules for both types:**
- `background: white; position: sticky; top: 56px; z-index: 80`
- **Never** add a standalone `<h1>` or subtitle paragraph below this bar

---

## Footer Toolbar (Fixed Bottom)

```css
.footer-toolbar {
  position: fixed;
  bottom: 0;
  left: 62px;                        /* sidebar width */
  width: calc(100vw - 62px);
  height: 64px;
  background: #ffffff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
  gap: 20px;
  z-index: 200;
}

/* Required: compensate for fixed footer */
.page-content { padding-bottom: 80px; }
```

### When to Use Fixed Footer vs. Dialog Footer

Use **fixed FooterToolBar** when:
1. Content is hidden/collapsed, or split across multiple tabs
2. Form has multiple complex groups that need a clear "done" separation

Use **inline dialog footer** for simple dialogs (720px) — footer is just the last row, not fixed.

### Footer Button Specs

| Button | Style | Width |
|---|---|---|
| Primary (Create/Save/Next) | `bg: var(--pcv-brand)`, white text | min 88px |
| Cancel | `border: 1px solid #DEDFE3`, `color: #82858b` | min 88px |

---

## Three-Section Form Structure

Every form page has **Header → Body → Footer**:

| Section | Contains | Never Put Here |
|---|---|---|
| Header | Page title, global switches, form-wide actions | Input fields |
| Body | All fields, groups, inline add/remove actions | Cancel/Save buttons |
| Footer | Cancel, Save, Create, Next — finalization actions | Fields, content display |
