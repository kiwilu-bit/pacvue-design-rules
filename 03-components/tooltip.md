# Tooltip（悬浮提示）Component Rules

> **Figma（Design-system-for-AI）：** `1rspJpJUrExxPk7vmSlDJg` · page `- Tooltip` · see `tooltip-figma.md`  
> **Pacvue library：** `悬浮提示` · component set `d3a80cd74c5650084c4a0b7e0b7d4090ab6411bd`

---

## Definition

**Tooltip** is a lightweight floating label that appears when the user **hovers**, **focuses**, or (only when required) **clicks** a trigger element. It gives a **short text explanation** of a control, icon, or field — **no actions** inside the bubble.

---

## Interaction（交互）

### When it appears

| Trigger | Use | Default? |
|---------|-----|----------|
| **Hover（悬停）** | Icon buttons, truncated text, table header ⓘ, disabled field lock icon | **Yes** — primary pattern |
| **Focus（聚焦）** | Same trigger when reached by keyboard (`Tab`) | **Required** for a11y alongside hover |
| **Click（点击）** | Only if hover/focus is impossible or would conflict (e.g. touch-only edge cases) | **No** — not the default for simple hints |

### Show / hide

- **Show：** pointer **enters** the trigger (hover) or trigger **receives focus** (keyboard).
- **Hide：** pointer **leaves** the trigger **and** the tooltip panel; or trigger **loses focus**; or `Esc` (recommended).
- **Do not** require a second click to close for standard informational tooltips.
- **Delay（recommended）：** `open-delay` ~300ms · `hide-delay` ~0–100ms — avoids flicker when moving across dense UI.

### What belongs in a Tooltip

| Allowed | Not allowed |
|---------|-------------|
| Plain text, 1–2 short lines | Buttons, links, inputs, checkboxes |
| Optional leading icon (see Figma `has icon`) | Tables, lists, images, charts |
| Clarify label meaning, units, why disabled | Navigation, “learn more” flows |
| Supplement truncated cell/header text | Copy-to-clipboard workflows (use Popover) |

> **Rule of thumb：** If the user needs to **read long copy** or **do something**, use **Popover** or **Dialog**, not Tooltip.

### Trigger coverage

- Wrap the **smallest interactive target** that owns the hint (icon, label row, `?` help glyph).
- **Disabled controls：** explain *why* on the **lock / help icon** or a wrapper with `tabindex="0"`, not on the disabled control itself (no pointer events).
- **Table header ⓘ：** hover/focus on the **18×18** help icon only (see `table.md`).

### Element Plus（implementation）

```vue
<el-tooltip content="Short explanation" placement="top" :show-after="300">
  <span class="tooltip-trigger" tabindex="0">…</span>
</el-tooltip>
```

| Prop | Guidance |
|------|----------|
| `trigger` | Default `hover` · add keyboard via focusable trigger + `focus` if needed · avoid `click` unless specified |
| `placement` | `top` preferred · `right` / `bottom` / `left` when collision · match Figma `Placement` |
| `effect` | `dark` default · `light` for dense/light surfaces (`Theme`) |
| `disabled` | Do not show tooltip when there is nothing to say |
| `popper-class` | Z-index per global stacking (above table, below modal) |

---

## Visual（Figma showcase）

| Property | Values |
|----------|--------|
| Placement | top · right · bottom · left |
| Theme | dark · light |
| Size | **default** · **multiline** |

See **`tooltip-figma.md`** for showcase node IDs and Pacvue variant mapping.

### Size（default vs multiline）

| Size | Behavior |
|------|----------|
| **default** | Single line; width **hugs** short copy (stays **≤ 264px** bubble max). |
| **multiline** | **Label max-width `240px`** — text **wraps** when wider; **bubble max-width `264px`** (incl. horizontal padding **12px** ×2). |

**Copy rule：** 文本简洁有效，避免冗长赘述。Do not use Tooltip for paragraphs.

**Typography：** Inter Regular **12px** / line-height **18px**.

**Themes：**

| Theme | Background | Text |
|-------|------------|------|
| Dark | `#323232` (~rgb 50,50,50) | `#FFFFFF` |
| Light | `#FFFFFF` | `#66666C` |

---

## Do / Don't

| Do | Don't |
|----|-------|
| One short sentence | Paragraphs or bullet essays |
| Hover + focus for accessibility | Tooltip-only on click for static hints |
| Hide on mouse leave | Sticky tooltip without user action |
| Use Tooltip for “what is this?” | Use Tooltip for “pick an action” |
| Point arrow toward trigger | Cover the trigger or primary CTA |

---

## Related

- **Popover / Dropdown：** actionable or rich content  
- **Input read-only lock：** hover tooltip on lock icon (`input.md`)  
- **Select label `?`：** field help (`07-选择器规范.mdc`)  
- **Figma build：** `tooltip-figma.md`
