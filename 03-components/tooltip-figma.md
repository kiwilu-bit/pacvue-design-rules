# Tooltip — Figma (Design-system-for-AI)

> **File:** `1rspJpJUrExxPk7vmSlDJg` · Page: `- Tooltip`  
> **Deliverable:** `Variable Showcase` · node `2099:4`  
> **Master (API only):** `Tooltip` · node `2099:279`  
> **Visual source:** Pacvue Design System · `悬浮提示` (`d3a80cd74c5650084c4a0b7e0b7d4090ab6411bd`)

---

## What ships in Figma

| Artifact | Purpose |
|----------|---------|
| **Variable Showcase** | One case per VARIANT value + BOOLEAN examples |
| **Tooltip** (1× master) | Property API anchor; expand matrix on request |

**Not shipped in Figma:** trigger modes (hover/click/focus) · Brand theme axis · full placement×theme matrix.

**Interaction rules (dev / Cursor):** see **`03-components/tooltip.md`** and **`05-cursor-rules/14-悬浮提示规范.mdc`** — hover/focus default, mouse enter show / leave hide, short text only, no actions inside.

---

## Component property API

| Property | Type | Values |
|----------|------|--------|
| Placement | VARIANT | top, right, bottom, left |
| Theme | VARIANT | dark, light |
| Size | VARIANT | default (single-line hug) · multiline (text max **240px** wrap, bubble max **264px**) |
| has icon | BOOLEAN | `⭐️ Icon` in dark tooltip |
| has title | BOOLEAN | Light theme / title-style copy |
| Content | TEXT | Tooltip body |

**Not in Figma variants:** hover vs click trigger · focus · disabled · Brand.

---

## Showcase layout (`2099:4`)

| Section | Cases |
|---------|--------|
| **Placement（4）** | Top · Right · Bottom · Left |
| **Theme（2）** | Dark · Light |
| **Size（2）** | Default · Multiline — see [size rules](#size-default--multiline) below |
| **BOOLEAN 属性案例** | has icon · has title · 长文案 |

**Layout:** same as Input/Badge showcase (title 14 · section 13 · label 12 · gap 20 · padding 24). Each case uses a **Preview** frame so arrow padding is not clipped.

### Size: default · multiline

| Token | Value |
|-------|--------|
| Label max-width | **240px** (multiline only; wrap) |
| Bubble max-width | **264px** |
| Horizontal padding | **12px** each side (`264 − 240`) |
| Vertical padding | **6px** |
| Copy | Concise; no long paragraphs |

**Default** case: short one-line label, bubble hugs content (< 264px).  
**Multiline** case: label fixed at 240px width with wrapped lines; bubble expands up to 264px.

Placement / Theme rows still use Pacvue `悬浮提示` instances; Size row uses local frames that implement the width rules above.

**Pacvue mapping:**

| Showcase | Pacvue variant |
|----------|----------------|
| Top | `Property 1=上` |
| Right | `Property 1=右` |
| Bottom | `Property 1=下` |
| Left | `Property 1=左` |
| Dark | dark bubble (`上` etc.) |
| Light | `Property 1=白色` |

---

## Rebuild

Ask agent: “Rebuild Tooltip Variable Showcase on `- Tooltip`” (`use_figma`, fileKey `1rspJpJUrExxPk7vmSlDJg`).
