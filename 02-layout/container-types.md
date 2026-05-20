# Form Container Types

Pacvue forms appear in 4 container types. Each has fixed dimensions — do not customize.

---

## 3.1 Dialog / Modal (720px)

Used for: create, edit, confirm actions triggered from list pages.

```
┌─────────────────── 720px ────────────────────┐
│ Header (56px)  — title + close button        │
├───────────────────────────────────────────────┤
│                                               │
│ Body (auto height)                            │
│   padding: 24px 40px                          │
│   form fields…                                │
│                                               │
├───────────────────────────────────────────────┤
│ Footer (68px)  — [Cancel]  [OK / Create]     │
└───────────────────────────────────────────────┘
```

| Zone | Value |
|---|---|
| Dialog width | **720px** |
| Header height | **56px** |
| Footer height | **68px** |
| Body padding | **24px 40px** |
| Footer button gap | **20px** |
| Footer right padding | **24px** |

**Footer button specs (inside dialog):**
- Height: 36px, `border-radius: 4px`, min-width: 88px
- Primary: `bg: var(--pcv-brand)`, white text
- Cancel: `border: 1px solid #DEDFE3`, `color: #82858b`

---

## 3.2 Filter Bar

Used at the top of data list pages — horizontal row of filter controls.

- Horizontal layout, `gap: 8px` between controls
- Control height: **36px** (small size)
- Search input: left-side search icon (20×20px), padding-left reserved for icon
- Right-side action buttons (Search, Reset) grouped separately

```
[Filters] [Custom] | [Select A ▾] [Select B ▾] | [🔍 Search Name] [Search] [×]
```

---

## 3.3 Popover / Dropdown Panel

Three sub-types:

| Type | Use Case |
|---|---|
| **Date Picker** | Date range selection, calendar popup |
| **Select Dropdown** | Single/multi-select list |
| **Cascade** | Multi-level selection (two 256px panels side by side) |

**Common dropdown panel rules:**
```css
background: #fff;
border: 1px solid #DEDFE3;
border-radius: 4px;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
/* Option height: 36px */
/* Hover: background: var(--pcv-hover-bg) */
/* Selected: color: var(--pcv-brand); background: var(--pcv-selected-bg) */
```

---

## 3.4 Form Page (Create / Edit Full Page)

Follow M / L / XL tier specs.  
See: `01-page-templates/form-page.md`

| Tier | Width | Use When |
|---|---|---|
| M | 720px | Simple form, ≤ 8 fields |
| L | 960px | Complex grouping, multi-step |
| XL | 1330px | Preview panel, multi-column, data table |

---

## Container Selection Guide

```
Is it a floating / overlay action?
  ├─ Yes → Dialog (720px) or Popover (dropdown / date)
  └─ No  → Form Page (M/L/XL tier)

Is it a filter area above a list?
  └─ Filter Bar
```
