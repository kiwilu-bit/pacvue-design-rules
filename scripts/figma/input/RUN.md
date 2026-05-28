# Input · Figma showcase (Design-system-for-AI)

**File:** [Design-system-for-AI](https://www.figma.com/design/1rspJpJUrExxPk7vmSlDJg/Design-system-for-AI)  
**fileKey:** `1rspJpJUrExxPk7vmSlDJg`  
**Page:** `- Input`  
**Deliverable node:** `Variable Showcase` → `2067:207`

Requires **Figma MCP** (`plugin-figma-figma` → `use_figma`).

## Default workflow (showcase-only)

1. Ensure Pacvue library components are available in file (`输入框`, `搜索框`, `特殊输入框`, `文本域`, `输入框+标题+提示文案`).
2. Ask agent to **rebuild Variable Showcase** (Type 6 + Status 4 + States 2 + Size 2 + BOOLEAN 4).
3. Optional: keep single **`Input`** master (`2069:145`) as property API stub — **do not** build 192-variant matrix unless requested.

## Optional scripts (local atoms / tokens)

| Step | Script | When |
|------|--------|------|
| 1 | `01-input-tokens.js` | Need `Input Tokens` collection in file |
| 2 | `02-input-component-matrix.js` | **Only** if user asks for full variant matrix |
| 3 | `03-input-field.js` | **Only** if user asks for Input Field set |

## Property API (documented on master + showcase)

**Input**

| Property | Type | Values |
|----------|------|--------|
| Type | VARIANT | Text, Password, Search, Affix, Combo, Textarea |
| Status | VARIANT | Default, Success, Warning, Error |
| States | VARIANT | default, disabled |
| Size | VARIANT | default, subtle |
| has leading icon | BOOLEAN | |
| has trailing icon | BOOLEAN | |
| filled | BOOLEAN | |
| Value text | TEXT | |

**Not in showcase:** Brand · hover · focus · click

**Input Field (BOOLEAN cases on showcase)**

| Case | Notes |
|------|--------|
| 带标题 | Field instance, hint hidden |
| 带提示文案 | Field instance, title + hint visible |
