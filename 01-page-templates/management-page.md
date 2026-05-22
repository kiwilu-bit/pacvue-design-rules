# Management Page Template — 管理页面

> 适用于所有数据管理类列表页：Catalog、Campaign、Ad Group、Report 等。  
> 页面核心内容为数据表格，顶部含筛选栏，底部含分页栏。

---

## 页面结构总览

```
┌────────────────────────────────────────────────────────────────────┐
│ Sidebar (62px wide · fixed · bg:#12143C)                          │
│ Top Nav (56px · sticky top:0 · bg:#0253B6)                        │
│  ← 以上为全局固定区域，复制粘贴即可，无需定制 →                      │
├────────────────────────────────────────────────────────────────────┤
│ Page Title Bar (56px · sticky top:56px · bg:white · shadow)       │
│  [Page Title — 20px/600/#45464F]                                  │
├────────────────────────────────────────────────────────────────────┤  ← 起点：left 62px · top 112px
│ Page Body (bg:#f2f3f6 · padding: 16px 24px)                       │
│                                                                    │
│  ┌── Table Card (white · border-radius:6px · overflow:hidden) ──┐  │
│  │                                                              │  │
│  │  ① Filter Bar  (auto height · padding:16px 24px)            │  │
│  │  ────────────────────────────────── border-bottom #EDEEF1   │  │
│  │  ② Toolbar     (68px · padding:0 24px)                      │  │
│  │  ────────────────────────────────── border-bottom #EDEEF1   │  │
│  │  ③ Table Header (48px · sticky)                             │  │
│  │     Table Rows  (52px each)                                 │  │
│  │  ────────────────────────────────── border-top #EDEEF1      │  │
│  │  ④ Pagination   (64px · padding:0 24px)                     │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 尺寸速查表

| 区域 | 高度 | 背景色 | 分隔线 | 定位方式 |
|---|---|---|---|---|
| Sidebar | 62px（宽度） | `#12143C` | — | `position: fixed; left: 0; top: 0` |
| Top Nav | 56px | `#0253B6` | — | `position: sticky; top: 0; z-index: 200` |
| Page Title Bar | 56px | `#ffffff` | `box-shadow: 0 2px 4px rgba(228,228,228,0.5)` | `position: sticky; top: 56px; z-index: 80` |
| Page Body | 撑满剩余高度 | `#f2f3f6` | — | `padding: 16px 24px` |
| Filter Bar | 自动（随行数增高） | `#ffffff` | `border-bottom: 1px solid #EDEEF1` | `padding: 16px 24px` |
| Toolbar | 68px | `#ffffff` | `border-bottom: 1px solid #EDEEF1` | `padding: 0 24px` |
| Table Header | 48px | `#ffffff` | — | `position: sticky; top: 112px` |
| Table Row | 52px（最小值） | `#ffffff` | `border-bottom: 1px solid #EDEEF1` | 多行内容时自动撑高 |
| Pagination | 64px | `#ffffff` | `border-top: 1px solid #EDEEF1` | `padding: 0 24px` |

---

## ① Filter Bar

### 布局规则

- 列数：默认 **4 列等宽**，`gap: 16px`，filter 最小宽度 **263px**，超宽屏自动扩至 5/6 列
- Search / Reset 位置：**看最后一行是否有空位**（详见 `05-cursor-rules/11-筛选栏规范.mdc §1.2`）

### 典型结构（来自 Figma 实例）

```
Row 1: [Business_Id ▾]  [Status ▾]  [Product Source ▾]  [Date Range 📅]
Row 2: [Search by Name... (input)]  ←justify-between→   [🔍 Search]  [×]
```

Row 2 最后一行有空位 → Search / Reset 与输入框**同行靠右**。

### CSS

```css
.filter-bar {
  padding: 16px 24px;
  border-bottom: 1px solid #edeef1;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 中间行（全为 filter 条件） */
.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(263px, 1fr));
  gap: 16px;
  width: 100%;
}

/* 最后行有空位时：filter + Search/Reset 同行两端对齐 */
.filter-last-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.filter-last-row .filter-conds {
  display: flex;
  gap: 16px;
  flex: 1;
}
.filter-last-row .filter-conds .filter-cond {
  flex: 1;
  min-width: 263px;
}

/* 最后行已满时：Search/Reset 独占新行，靠右 */
.filter-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}
```

---

## ② Toolbar

### 结构

```
左侧：[+ Create]  [Bulk Target]  [Bulk Op（disabled）]
                                                      右侧：[👁] [💾] | [⬇] [⚙]
```

**左侧**：数据操作按钮（Create / Bulk Target / Bulk Op）  
**右侧**：非破坏性工具图标（show full number / visibility ｜ save / download / custom columns）

### CSS

```css
.toolbar {
  height: 68px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #edeef1;
  background: #ffffff;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 右侧分隔线 */
.toolbar-divider {
  width: 2px;
  height: 24px;
  background: #d2d4d9;
  border-radius: 2px;
  margin: 0 4px;
}
```

### 左侧按钮状态

| 类型 | 背景 | 边框 | 文字 | 触发条件 |
|---|---|---|---|---|
| Primary（Create） | `var(--pcv-brand)` | none | `#ffffff` | 始终可用 |
| Secondary（Bulk Target） | `transparent` | `1px solid var(--pcv-brand)` | `var(--pcv-brand)` | 始终可用 |
| Disabled（Bulk Op） | `rgba(130,133,139,0.05)` | `1px solid #DEDFE3` | `#B2B2B8` | 无行被选中 |
| Active（Bulk Op） | `transparent` | `1px solid var(--pcv-brand)` | `var(--pcv-brand)` | 有行被选中 |

所有按钮：`height: 36px; padding: 0 20px; border-radius: 4px; font: Inter Medium 14px`

### 右侧图标

```
[show full number 24px]  [visibility 24px]  │  [save 24px]  [download 24px]  [custom columns 24px]
```

图标尺寸：`24×24px`，默认色：`#66666C`，hover：`var(--pcv-brand)`

---

## ③ Table

### 尺寸规则

| 元素 | 高度 | 背景 | 说明 |
|---|---|---|---|
| Table Header | 48px | `#ffffff` | `position: sticky; top: 112px; z-index: 10` |
| Table Row | 52px（最小） | `#ffffff` | 多行内容自动撑高 |
| Total / Footer Row | 52px | `#ffffff` | 数字加粗 |

### 固定列注意事项

```css
/* 固定列背景必须用 color-mix，不能用 rgba（会透视） */
tbody tr:hover td.col-fixed {
  background: color-mix(in srgb, var(--pcv-brand) 4%, #ffffff);
}

/* 表格需要 border-collapse: separate 才能实现固定列阴影 */
table {
  border-collapse: separate;
  border-spacing: 0;
}
```

---

## ④ Pagination

### 结构

```
左侧：Total N entries,  [20/page ▼]
右侧：[< Prev]  [1] [2] [3] ... [N]  [Next >]    Go to [___] page
```

### 尺寸规则

```css
.pagination {
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #edeef1;
  background: #ffffff;
}

.pagination-left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #66666c;
}

.pagination-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 页码按钮 */
.page-btn {
  min-width: 32px;
  height: 32px;
  border-radius: 4px;
  font-size: 14px;
  color: #66666c;
  border: 1px solid transparent;
}
.page-btn.active {
  border-color: var(--pcv-brand);
  color: var(--pcv-brand);
  font-weight: 500;
}
.page-btn:hover:not(.active) {
  background: #f2f6fb;
  color: var(--pcv-brand);
}
```

---

## 完整 CSS 骨架

```css
/* ── 全局固定区域（复制粘贴，不需要修改） ── */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 62px;
  height: 100vh;
  background: #12143c;
  z-index: 300;
}

.top-nav {
  position: sticky;
  top: 0;
  left: 62px;
  width: calc(100vw - 62px);
  height: 56px;
  background: #0253b6;
  z-index: 200;
}

/* ── 内容区起点：left 62px · top 112px ── */
.main-area {
  margin-left: 62px;
  min-height: 100vh;
  min-width: 0;
  max-width: calc(100vw - 62px);
  overflow-x: hidden;
  background: #f2f3f6;
}

.page-title-bar {
  height: 56px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(228, 228, 228, 0.5);
  position: sticky;
  top: 56px;
  z-index: 80;
}
.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #45464f;
}

.page-body {
  padding: 16px 24px;
}

/* ── Table Card ── */
.table-card {
  background: #ffffff;
  border-radius: 6px;
  overflow: hidden;
}

/* ── 防止 table 撑出页面 ── */
.table-wrap {
  overflow-x: auto;
}
```

---

## 与其他 Template 的区别

| 维度 | 管理页面（本文件） | list-page.md | form-page.md |
|---|---|---|---|
| 核心内容 | 数据表格 + 筛选 + 工具栏 + 分页 | 同左（旧版） | 表单字段 |
| Filter Bar | 有，含 Search/Reset 位置判断逻辑 | 有，旧规则 | 无 |
| Toolbar | 68px，左右两侧布局 | 68px | 无（底部 Footer Bar 替代） |
| Pagination | 完整（Total + 页码 + 跳转） | 有 | 无 |
| 底部 Footer | 无 | 无 | 固定底部 64px |

---

## 关联规范

| 组件 | 规范文件 |
|---|---|
| Filter Bar | `05-cursor-rules/11-筛选栏规范.mdc` |
| 设计 Token | `00-tokens/design-tokens.md` |
| 容器类型 | `02-layout/container-types.md` |
