# Pacvue Design Rules

> A structured collection of Pacvue UI Design System rules for AI-assisted frontend development.  
> All specs are sourced from the official Pacvue Design System Figma (`wgvYWGdj9Bfq2HSEpRbnLN`).

---

## What Is This?

This repo captures **every UI rule that must be followed** when building Pacvue frontend pages — colors, spacing, component dimensions, layout patterns, and common pitfalls. It is structured so that AI coding agents (Cursor, Copilot, etc.) can read and apply the correct rules without guessing.

---

## Repository Structure

```
pacvue-design-rules/
├── 00-tokens/
│   └── design-tokens.md          ← CSS variables, color palette, spacing scale, breakpoints
│
├── 01-page-templates/
│   ├── list-page.md              ← Main management list page (Filter + Table + Pagination)
│   └── form-page.md              ← Create/Edit form pages (M / L / XL tiers)
│
├── 02-layout/
│   ├── form-alignment-spacing.md ← Label/input gaps, field groups, two-column grid
│   └── container-types.md        ← Dialog (720px), Filter Bar, Popover, Form Page
│
├── 03-components/
│   ├── table.md                  ← Table: header, rows, toolbar, fixed columns, sticky shadows
│   ├── filter-bar.md             ← Filter bar: 4-column grid, condition box, Search/Clear
│   ├── pagination.md             ← Pagination: layout, page buttons, page size dropdown
│   ├── input.md                  ← Input: 8 states, search variants, read-only, action button
│   ├── select.md                 ← Select: trigger states, dropdown panel, multi-select
│   ├── dropdown.md               ← Dropdown menu: 3 trigger types, item states, dividers
│   ├── date-picker.md            ← Date picker: trigger, panel, day states, range selection
│   ├── checkbox.md               ← Checkbox: 7 states, table header logic, bulk selection
│   └── tooltip.md                ← Tooltip: hover/focus trigger, short text only, no actions
│
└── 04-form-rules/
    └── special-components.md     ← Dynamic lists, OR groups, condition rows, column picker
```

---

## Quick Start for AI Agents

### Building a List Page?

Read in this order:
1. `00-tokens/design-tokens.md` — global variables
2. `01-page-templates/list-page.md` — overall page structure
3. `03-components/table.md` — table rules
4. `03-components/filter-bar.md` — filter bar
5. `03-components/pagination.md` — pagination

### Building a Create / Edit Form?

Read in this order:
1. `00-tokens/design-tokens.md`
2. `01-page-templates/form-page.md` — choose M / L / XL tier
3. `02-layout/form-alignment-spacing.md` — spacing between fields
4. `02-layout/container-types.md` — dialog vs. full page
5. `03-components/input.md` — input fields
6. `03-components/select.md` — dropdowns / selectors
7. `04-form-rules/special-components.md` — complex patterns

---

## The 10 Rules You Must Never Break

| # | Rule |
|---|---|
| 1 | **Never hard-code brand colors.** Always use `var(--pcv-brand)`. |
| 2 | **Spacing is 8px-grid only.** Use 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48px. No 5px, 10px, 15px. |
| 3 | **Border radius**: 4px buttons/inputs · 6px cards/menus · 999px chips. No other values. |
| 4 | **Typography**: Inter only. Minimum 11px, minimum weight 400. No font-weight 300. |
| 5 | **Filter bar uses 4-column equal-width grid.** Never fixed-pixel widths. |
| 6 | **Search button in filter bar uses `border-radius: 6px`**, not 4px. |
| 7 | **Fixed (sticky) table columns must use `color-mix` for hover/selected backgrounds**, not `rgba`. Otherwise scrolling causes text bleed-through. |
| 8 | **Date picker panels must be `position: fixed` and appended to `<body>`.** Filter bars have `overflow: hidden` which clips absolute-positioned children. |
| 9 | **Footer toolbar is always `position: fixed; bottom: 0; z-index: 200`** on form pages. Add `padding-bottom: 80px` to content. |
| 10 | **The page title bar is the only heading element.** Never add a standalone `<h1>` or subtitle paragraph below it. |

---

## Design Token Quick Reference

```css
/* Brand */
--pcv-brand:          #0253b6  (blue) / #ff9f43 (orange)

/* Text */
--pcv-text-primary:   #45464f
--pcv-text-secondary: #66666c
--pcv-text-muted:     #82858b
--pcv-text-disabled:  #b2b2b8

/* Surfaces */
--pcv-bg:             #f2f3f6   (page background)
--pcv-surface:        #ffffff   (cards, panels)

/* Borders */
--pcv-border:         #edeef1   (table dividers, card borders)
--pcv-border-input:   #dedfe3   (inputs, selects)

/* Status */
--pcv-success:        #28c76f
--pcv-warning:        #ff9f43
--pcv-error:          #ea5455
--pcv-neutral:        #82858b
```

---

## Key Dimensions Cheat Sheet

| Element | Height | Notes |
|---|---|---|
| Sidebar | 62px (width) | Fixed left |
| Top Nav | 56px | `sticky; top: 0` |
| Page Title Bar | 56px | `sticky; top: 56px` |
| Table Toolbar | 68px | `border-top: 1px solid #edeef1` |
| Table Header | 48px | White background |
| Table Data Row | 52px | Min-height |
| Table Total Row | 52px | Bold numbers |
| Pagination Bar | 64px | `border-top: 1px solid #edeef1` |
| Footer Toolbar | 64px | `position: fixed; bottom: 0` |
| Dialog | 720px wide | Header: 56px, Footer: 68px |
| Form Card (M) | 720px wide | Centered, `padding: 24px` |
| Form Card (L) | 960px wide | With left stepper |
| Form Card (XL) | 1330px wide | With stepper + right panel |
| Input / Select | 36px | Standard size |
| Input / Select (small) | 32px | Widget / compact |
| Button | 36px | `border-radius: 4px; min-width: 88px` |
| Page button (pagination) | 32×32px | `border-radius: 4px` |

---

## Responsive Breakpoints

| Width | Role |
|---|---|
| 1280px | Minimum supported |
| **1440px** | **Primary design target** |
| 1920px | Max content width cap |

---

## Theme Switching

```html
<html data-theme="blue">   <!-- Default -->
<html data-theme="orange"> <!-- Orange theme -->
```

All brand-specific colors use `var(--pcv-brand)` and switch automatically.

---

## Contributing

When adding new rules:
1. Name files with a clear, descriptive noun (e.g. `tooltip.md`, not `rule-14.md`)
2. Include: definition, when to use, dimensions, states, CSS, and "do/don't"
3. Reference the Figma node ID in the file header
4. Update this README's structure section

---

## Related Projects

- **Pacvue Design System Figma** — `wgvYWGdj9Bfq2HSEpRbnLN`
- **Cursor Rules** (`.cursor/rules/`) — auto-applied rules in the development workspace. Install Tooltip rule into a Vue app: `./scripts/install-cursor-rules.sh /path/to/vue-app` (see `05-cursor-rules/README.md`)
- **Cursor Skills** — higher-level AI skill packs for page generation
