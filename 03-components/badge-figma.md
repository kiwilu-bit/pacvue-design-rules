# Badge — Figma (Design-system-for-AI)

> **File:** `1rspJpJUrExxPk7vmSlDJg` · Page: `- Badge`  
> **Deliverable:** `Variable Showcase` · node `2092:8`  
> **Master (API only):** `Badge` · node `2092:3`

---

## What ships in Figma

| Artifact | Purpose |
|----------|---------|
| **Variable Showcase** | One case per VARIANT value + BOOLEAN examples |
| **Badge** (1× master) | Property API anchor; expand matrix on request |

**Not shipped:** full Cartesian variant matrix · Brand theme axis on showcase.

---

## Component property API

| Property | Type | Values |
|----------|------|--------|
| Appearance | VARIANT | solid, light, outline |
| Tone | VARIANT | Neutral, Brand, Success, Warning, Error |
| Size | VARIANT | default, small, count |
| States | VARIANT | default, disabled |
| has dot | BOOLEAN | Status dot before label |
| has leading icon | BOOLEAN | 12×12 leading block |
| has close | BOOLEAN | Removable tag (`×`) |
| Label | TEXT | Badge copy |

**Not in Figma variants:** hover · focus · **Brand** (theme switching — use Tone=Brand).

---

## Showcase layout (`2092:8`)

| Section | Cases |
|---------|--------|
| **Appearance（3）** | Solid · Light · Outline |
| **Tone（5）** | Neutral · Brand · Success · Warning · Error |
| **Size（3）** | Default · Small · Count |
| **States（2）** | Default · Disabled |
| **BOOLEAN 属性案例** | has dot · has leading icon · has close |

**Typography / layout:** same as Input showcase — title 14 SemiBold · section 13 SemiBold · label 12 Regular · gap 20 · padding 24.

**Visual rules (Pacvue-aligned):**

| Appearance | Shape | Notes |
|------------|-------|--------|
| solid / light | pill `radius 17` | Filled or subtle bg |
| outline | `radius 4` | 1px stroke, white fill |
| count | pill `radius 999` | min width ~20px, label `9` |

**Tone colors:** Pacvue status palette (`#28c76f` / `#ff9f43` / `#ea5455` / `#0253b6` / `#82858b`).

---

## Rebuild

Ask agent: “Rebuild Badge Variable Showcase on `- Badge`” (`use_figma`, fileKey `1rspJpJUrExxPk7vmSlDJg`).
