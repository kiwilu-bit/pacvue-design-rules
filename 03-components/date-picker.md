# Date Picker Component Rules

> Source: Figma `wgvYWGdj9Bfq2HSEpRbnLN` node `1377-19146`

---

## Trigger Input

```
[ 02/13/2020 ~ 02/18/2020          ✕  📅 ]
```

```css
.date-trigger {
  width: 240px;    /* default; adjusts with container */
  height: 36px;
  padding: 0 12px;
  border: 1px solid #dedfe3;
  border-radius: 4px;
  background: #ffffff;
}
```

| Part | Style |
|---|---|
| Date text (has value) | Inter Regular 14px, `#66666c` |
| Placeholder "Start Date ~ End Date" | Inter Regular 14px, `#b2b2b8` |
| Calendar icon | `20×20px`, right side, `#66666c` |
| Clear icon (×) | `24×24px`, left of calendar, **only visible when value set** |

Hover/focus border: `1px solid var(--pcv-brand)` — follows theme color.

---

## Panel Structure (266px wide)

```
┌─────────────────────────────────────┐ border-radius: 6px
│ Header (68px)                        │
│   < Feb   2020  >                   │
│   Sun Mon Tue Wed Thu Fri Sat       │
├─────────────────────────────────────┤ 1px divider
│ Day Grid (36×36px cells, 7 cols)    │
│   26  27  28  29  30  31   1        │
│    2   3   4   5   6   7   8        │
│    9  10  11  12  13  14  15        │
│   16  17  18  19  20  21  22        │
│   23  24  25  26  27  28  29        │
│    1   2   3   4   5   6   7        │
├─────────────────────────────────────┤
│   Today (optional footer)            │
└─────────────────────────────────────┘
```

### Panel Container
```css
.date-panel {
  width: 266px;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.08);
}
```

### Header (68px)
| Element | Style |
|---|---|
| Month name | Inter Medium 14px, `#5e5873`, centered-left |
| Year | Inter Regular 14px, `#6e6b7b`, right of month |
| Prev/next month arrows | `chevron-left` / `chevron-right`, `18×18px`, `#6e6b7b` |
| Weekday labels (Sun–Sat) | Inter Regular 12px, `#6e6b7b`, evenly distributed |
| Divider below header | `1px solid #edeef1` |

---

## Day Cell States

| State | Background | Text | Radius |
|---|---|---|---|
| Default | transparent | `#6e6b7b` | `18px` (circle) |
| Hover | `rgba(brand, 0.15)` | `#6e6b7b` | `18px` |
| Today | `var(--pcv-brand)` | `#ffffff` | `18px` |
| Selected (single) | `var(--pcv-brand)` | `#ffffff` | `18px` |
| Range Start | `var(--pcv-brand)` | `#ffffff` | `18px 0 0 18px` |
| Range End | `var(--pcv-brand)` | `#ffffff` | `0 18px 18px 0` |
| In Range | `rgba(brand, 0.15)` | `#6e6b7b` | `0` (no radius) |
| Other Month | transparent | `#b9b9c3` | — |
| Disabled | transparent | `#b9b9c3` | Cursor: `not-allowed` |

Day cell size: **36×36px**

---

## Date Range Picker (Two Calendars)

For filter bar date range selection, use two calendars side by side with a shortcuts panel:

```
┌── Shortcuts (200px) ──┬──── Left Calendar ────┬──── Right Calendar ────┐
│ Yesterday             │   < February 2020 >   │   < March 2020 >       │
│ Last 7 Days           │  Su Mo Tu We Th Fr Sa │  Su Mo Tu We Th Fr Sa  │
│ Last 30 Days ●        │   …                   │   …                    │
│ Last Week             │                       │                        │
│ Last Month            │                       │                        │
│ This Month            ├───────────────────────┴────────────────────────┤
│ Last 90 Days          │                    [Cancel]  [Apply]           │
│ Last Year             │                                                 │
│ Custom                │                                                 │
└───────────────────────┴─────────────────────────────────────────────────┘
```

- Shortcuts panel: `width: 200px; border-right: 1px solid #edeef1`
- Selected shortcut: `bg: var(--pcv-brand); color: #fff; border-radius: 4px; margin: 0 8px`
- Calendar footer: `[Cancel]` + `[Apply]` buttons, right-aligned
- Apply button: `bg: var(--pcv-brand); height: 32px; border-radius: 4px`
- Cancel button: `border: 1px solid #dedfe3; height: 32px; border-radius: 4px`

---

## ⚠️ Critical: Panel Must Be Appended to `<body>`

Filter bar parent has `overflow: hidden`. If the date picker panel uses `position: absolute` inside the filter bar, it will be clipped.

**Solution: `position: fixed` + JS position calculation**

```js
function openDatePicker(triggerEl, panelEl) {
  const rect = triggerEl.getBoundingClientRect();
  panelEl.style.top  = (rect.bottom + 6) + 'px';
  panelEl.style.left = rect.left + 'px';
  // Prevent overflow on right edge:
  if (rect.left + panelWidth > window.innerWidth - 12) {
    panelEl.style.left = (window.innerWidth - panelWidth - 12) + 'px';
  }
  panelEl.classList.add('open');
}
```

---

## Four Display Modes

| Mode | Description |
|---|---|
| **Day** | Default — grid of days |
| **Month** | Months of a year, 3×4 grid |
| **Year** | Range of years, 4×3 grid |
| **Range** | Two panels for start/end date |

---

## "Today" Footer Button
```css
.date-today-btn {
  font: Inter Medium 14px;
  color: var(--pcv-brand);   /* follows theme */
  text-align: center;
  cursor: pointer;
}
```
