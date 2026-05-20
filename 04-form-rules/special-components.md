# Special Form Components

---

## 5.1 Dynamic Name List (Add/Remove Rows)

**When to use:** Fields allowing multiple name-type entries (Add Catalog Name, Add Tag, etc.)

**Height behavior:**

| Row count | Behavior |
|---|---|
| ≤ 4 rows | Container **auto-expands** with rows |
| ≥ 5 rows | Container **fixed height** + scrollbar |

**Structure:**
```
┌─ Scrollable input area ─────────────────────────┐
│ [Input Row 1]                                    │
│ [Input Row 2]                                    │
│ [Input Row 3]                                    │
│ [Input Row 4]                                    │
│ [Input Row 5] ← fixed height + scroll from here │
└──────────────────────────────────────────────────┘
[+ Add Name]
```

---

## 5.2 Input + Action Button

**When to use:** Input field paired with an action button (Manage, Browse, Validate).

**Layout:**
```
[─── Input (flex: 1) ───────────────────] [Button 72px]
                                     gap: 20px
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
  border: 1px solid #DEDFE3;
  color: #66666c;
  border-radius: 4px;
}
```

Button style: **Secondary Small**
- `height: 36px; border: 1px solid #DEDFE3; color: #66666c; border-radius: 4px`

---

## 5.3 Column Picker Sidebar

**When to use:** Column management, field selection — fixed-width sidebar on left.

**Structure:**
```
┌── 280px ──────────────────────────────┐
│ [Group Title]         48px            │ ← transparent bg, padding: 15px 8px
├───────────────────────────────────────┤
│ [□] column_title      52px            │ ← no indent
├───────────────────────────────────────┤
│ ▶ [□] sub_column      52px            │ ← indented (child, padding-left: 40px)
└───────────────────────────────────────┘
```

**Key dimensions:**
| Element | Value |
|---|---|
| Sidebar width | `280px` |
| Group title row height | `48px`, `font-size: 12px`, `color: #45464f` |
| Option row height | `52px`, `padding: 16px 8px` |
| Checkbox | `20×20px`, `gap: 8px` from text |
| Child item indent | `padding-left: 40px` (arrow 24px + gap 8px + padding 8px) |
| Expand/collapse arrow | `24×24px` |

---

## 5.4 OR-Separated Condition Groups

**When to use:** Rule creation with multiple condition blocks separated by OR.

**Spacing:**
```
[Condition Group A]
     ↕ 12px
      OR
     ↕ 12px
[Condition Group B]
```

- "OR" text: `14px / 400 / color: #45464f`
- OR spacing above/below: `12px`

---

## 5.5 Dynamic Condition Rows with "Add Row"

**When to use:** Each condition group supports multiple rows (e.g. Keyword conditions).

**Row structure:**
```
┌── Condition Group (padding: 20px) ──────────────────────────────┐
│ [Select A (246px)] [Select B (310px)] [× close 20px]           │ ← row 1
│  ↕ 12px                                                         │
│ [Select A (246px)] [Select B (310px)] [× close 20px]           │ ← row 2
│  ↕ 12px                                                         │
│ [+ Add Row]                                                      │
└──────────────────────────────────────────────────────────────────┘
```

- Select A → Select B gap: **12px**
- Close icon: `20×20px`, `gap: 12px` from Select B right edge
- Add Row button: text button with icon, `color: var(--pcv-brand)`
