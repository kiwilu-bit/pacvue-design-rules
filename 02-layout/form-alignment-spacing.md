# Form Alignment & Spacing

> Source: Pacvue Design System Figma node `1377:22793`

---

## Alignment Rules

### Label + Input (vertical stack)
- Label on top, input below — **vertical alignment**
- Gap between label and input: **4px**

```
[Label — 14px/500/#45464f]
↕ 4px
[──────────────────]  ← input / select, height: 36px
```

### Multiple Fields on Same Row (horizontal)
- Components in the same row are **horizontally aligned**
- Consistent column width and gap: `gap: 20px`

### Toggle + Label (same row)
```
[* State]  [○ Toggle]  ← flex-direction: row; gap: 12px
```

### Two-Column Grid
```css
.field-row-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
```
Only use 2-column for related short fields (e.g. Language + Currency).  
Never put unrelated long fields side-by-side.

---

## Spacing Values

| Gap Type | Value | When |
|---|---|---|
| Label → Input | **4px** | Inside every field |
| Field → Field (vertical) | **24px** | Between independent fields / groups |
| Row item gap (complex group) | **12px** | Between repeated rows inside a group |
| Two-column field gap | **20px** | Horizontal gap between paired fields |
| Input + action button gap | **20px** | Input (flex:1) + secondary button (72px) |
| Footer button gap | **20px** | Cancel / Save spacing |

---

## Vertical Spacing Diagram

```
┌── Field A ──────────────────────┐
│  Label A                        │
│  ↕ 4px                          │
│  [Input A]                      │
└─────────────────────────────────┘
 ↕ 24px
┌── Field B ──────────────────────┐
│  Label B                        │
│  ↕ 4px                          │
│  [Input B]                      │
└─────────────────────────────────┘
 ↕ 24px
┌── Complex Group C ──────────────┐
│  * Requirements                 │
│  ↕ 12px                         │
│  [Select] [Input] [×]  ← row 1  │
│  ↕ 12px                         │
│  [Select] [Input] [×]  ← row 2  │
│  ↕ 12px                         │
│  [+ Add Row]                    │
└─────────────────────────────────┘
```

---

## Horizontal Spacing Diagram

```
[Field A (1fr)]  ← gap: 20px →  [Field B (1fr)]

[Input (flex-1)]  ← gap: 20px →  [Secondary Button 72px]
```

---

## CSS Reference

```css
/* Field: label → input gap */
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Between field groups */
.form-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Two-column layout */
.field-row-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* Repeated row group (conditions, name lists) */
.rule-row-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Input + action button */
.input-with-action {
  display: flex;
  gap: 20px;
  align-items: center;
}
.input-with-action .btn-action {
  width: 72px;
  flex-shrink: 0;
  height: 36px;
}

/* Footer buttons */
.form-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  padding: 0 24px;
}
```

---

## Do / Don't

- ✅ Field group vertical gap: **24px**
- ✅ Complex group repeated row gap: **12px**
- ✅ Two-column field gap: **20px**
- ✅ Footer button gap: **20px**
- ❌ Do NOT use 16px or 8px as field group vertical gap
- ❌ Do NOT mix gap values arbitrarily
