# Input Component Rules

> Source: Figma `wgvYWGdj9Bfq2HSEpRbnLN` node `11267-142581`

---

## Component Structure

```
┌─ Label (optional) ─────────────────────────┐
│  gap: 4px                                  │
├─ Container ────────────────────────────────┤
│  [Leading Icon]  [placeholder / value]  [Trailing Icon] │
└────────────────────────────────────────────┘
   Helper / Validation text (optional)
```

| Part | Notes |
|---|---|
| Container | Interactive input area |
| Input text | User value, Inter Regular 14px |
| Label | Above input, `gap: 4px` |
| Placeholder | `#b2b2b8` when empty |
| Helper / validation text | 12px, below input |
| Leading icon (optional) | Input type indicator, left, 20×20px |
| Trailing icon (optional) | Clear (close-circle-fill) or show/hide; 20×20px |

---

## Dimensions

| Context | Height | Min Width | H-Padding | Group Gap |
|---|---|---|---|---|
| Standard (form/dialog) | **36px** | **256px** | `12px` | `20px` |
| Small (widget/compact) | **32px** | **160px** | `12px` | `16px` |

- Font: Inter Regular 14px / line-height 20px
- Border radius: **4px** (`var(--radius-sm)`)
- Label → input gap: **4px**
- Trailing icon → text gap: **8px**

---

## 8 States

| State | Background | Border | Text / Placeholder |
|---|---|---|---|
| **Default** | `#ffffff` | `1px solid #dedfe3` | Placeholder: `#b2b2b8` |
| **Hover** | `#ffffff` | `1px solid var(--pcv-brand)` | Placeholder: `#b2b2b8` |
| **Focus / Click** | `#ffffff` | `1px solid var(--pcv-brand)` | Cursor visible, `#66666c` |
| **Has Value** | `#ffffff` | `1px solid #dedfe3` | Value: `#66666c`; clear icon visible |
| **Disabled** | `#f4f5f6` | `1px solid #dedfe3` | `#b2b2b8`; no icon |
| **Success** | `#ffffff` | `1px solid #28c76f` | `#66666c`; validation text: `#28c76f` |
| **Warning** | `#ffffff` | `1px solid #ff9f43` | `#66666c`; validation text: `#ff9f43` |
| **Error** | `#ffffff` | `1px solid #ea5455` | `#66666c`; validation text: `#ea5455` |

> Hover/focus border color follows `var(--pcv-brand)` and switches with theme.

### Validation Text

```css
.field-hint {
  font-size: 12px;
  line-height: 18px;
  padding-left: 12px;
  margin-top: 4px;
}
.field-hint.success { color: #28c76f; }
.field-hint.warning { color: #ff9f43; }
.field-hint.error   { color: #ea5455; }
```

### Trailing Icon (clear)
- Size: `20×20px`
- Color: `#b2b2b8`, hover → brand color
- Visible only when input has a value

---

## Required & Optional Labels

```html
<!-- Required: asterisk BEFORE the label name -->
<span style="color: #EA5455">*</span> Field Name

<!-- Optional: gray "(optional)" suffix -->
Field Name <span style="color: #82858B; font-weight: 400">(optional)</span>
```

---

## Validation States (Form Context)

| State | Border | Helper Text | Color |
|---|---|---|---|
| Default | `#dedfe3` | — | — |
| Focus | `var(--pcv-brand)` | — | — |
| Error | `#ea5455` | Inline below field, 12px | `#ea5455` |
| Disabled | `#edeef1` | — | bg `#f6f7fb`, text `#b2b2b8` |
| Read-only | `#edeef1` | "Read-only after creation" hint | bg `#f6f7fb`, lock icon right |

### Read-Only Field
```css
.field-readonly {
  background: #f6f7fb;
  border: 1px solid #edeef1;
  color: #66666c;
  cursor: not-allowed;
}
/* tabindex="-1" — cannot receive keyboard focus */
/* Lock icon: 16×16px, right side of input */
/* Hover tooltip: explain why the field is locked */
```

---

## Search Box Variants

### Variant A — Full Border
```css
/* Same as standard input: border all sides */
height: 36px;
border: 1px solid #dedfe3;
border-radius: 4px;
```
Leading icon: search magnifier, `20×20px`, left

### Variant B — Bottom Border Only (table/widget search)
```css
height: 36px;
border: none;
border-bottom: 1px solid #dedfe3;
border-radius: 0;
padding: 0 0 0 12px;
```

---

## Input + Action Button Pattern

```
[─── Input (flex: 1) ───────────────────] [Button 72px]
                                     ↑ gap: 20px
```

```css
.input-with-action {
  display: flex;
  align-items: center;
  gap: 20px;
}
.input-with-action .field-input { flex: 1; }
.input-with-action .btn-action {
  width: 72px;
  flex-shrink: 0;
  height: 36px;
  border: 1px solid #dedfe3;
  color: #66666c;
  border-radius: 4px;
}
```

Button style: Secondary Small — `height: 36px; border: 1px solid #DEDFE3; color: #66666c; border-radius: 4px`

---

## Dropdown Arrow (Custom — Not Native)

```html
<!-- Custom Pacvue dropdown arrow (placeholder — replace with official icon) -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M5 7.5L10 12.5L15 7.5" stroke="#DEDFE3" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

- Position: `absolute; right: 12px; vertically centered`
- Default color: `#DEDFE3`
- Active/open: `var(--pcv-brand)`
- **Never** use browser-native `<select>` arrow or CSS border-triangle
