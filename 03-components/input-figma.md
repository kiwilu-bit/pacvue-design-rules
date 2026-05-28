# Input — Figma (Design-system-for-AI)

> **File:** `1rspJpJUrExxPk7vmSlDJg` · Page: `- Input`  
> **Input set:** `2042:1380` · **Input Field set:** `2040:83`
> **Build scripts:** `scripts/figma/input/` (requires Figma MCP `use_figma`)

---

## Collections

| Collection | Modes | Notes |
|------------|-------|-------|
| **Brand** | Blue, Orange | Reused from Button |
| **Input Tokens** | Value | Semantic input colors + sizes |

### Input Tokens (38 variables)

**COLOR (23)**  
`color/input/bg/*` · `color/input/border/*` · `color/input/text/*` · `color/input/hint/*` · `color/input/icon/*` · `color/input/search/divider` · `color/input/border/hover` · `color/input/border/focus`

**FLOAT (15)**  
`size/input/height/*` · `size/input/min-width/*` · `size/input/min-height/textarea` · `spacing/input/*` · `radius/input/default` · **`radius/input/search-alt` (6)** · `font-size/input/*` · `line-height/input/*` · `border-width/input`

---

## Components

### 1. Input (atom)

| Property | Type | Values |
|----------|------|--------|
| Brand | VARIANT | Blue, Orange |
| Type | VARIANT | Text, Password, Search, Affix, Combo, Textarea |
| Status | VARIANT | Default, Success, Warning, Error |
| States | VARIANT | default, disabled |
| Size | VARIANT | default, subtle |
| has leading icon | BOOLEAN | Leading 图层可见性 |
| has trailing icon | BOOLEAN | Password 等尾随图标 |
| filled | BOOLEAN | Text 类型清除图标；配合 `Value text` |
| Value text | TEXT | 占位/输入文案 |

**Not in Figma variants:** hover, focus, click (CSS / dev only).

**Release matrix (v2):** **192** variants = Brand × Type × Status × States × Size（`2×6×4×2×2`）。BOOLEAN 不乘变体数。

### 2. Input Field (Label + Input + Hint)

| Property | Type | Values |
|----------|------|--------|
| Brand | VARIANT | Blue, Orange |
| Status | VARIANT | Default, Success, Warning, Error |
| States | VARIANT | default, disabled |
| Label mode | VARIANT | none, default, required, optional |
| Hint type | VARIANT | none, helper, success, warning, error |

Nested **Input** instance; draft: **8** representative combinations.

---

## Type → structure

| Type | Leading | Trailing | Radius |
|------|---------|----------|--------|
| Text | optional (BOOLEAN) | clear when filled | 4px |
| Password | — | eye | 4px |
| Search | search icon | — | **6px** (`search-alt`) |
| Affix | prefix text | — | 4px |
| Combo | select segment | — | 4px |
| Textarea | — | — | 4px, min-h 86 |

---

## Run build

1. Enable **Figma** MCP in Cursor and open the file in Figma desktop.
2. Ask agent: “按 `scripts/figma/input/RUN.md` 执行三步 use_figma”.

Or run scripts manually via Figma MCP `use_figma` with `fileKey: fqNkIHbHJDKJ0nHo82lpt4`.
