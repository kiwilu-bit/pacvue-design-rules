# Filter Bar Area — 筛选栏区域规范

> 适用场景：管理页面数据列表区的顶部筛选区域。  
> 来源：`05-cursor-rules/11-筛选栏规范.mdc`

---

## 布局结构

```
┌─────────────────────────────────────────────────────────┐
│ [Filters] [Custom] │ Cond 1      │ Cond 2  │ Cond 3    │ ← Row 1：4 列等宽
│ Cond 4             │ Cond 5      │ [Search] [Reset ×]  │ ← 最后行有空位：同行右对齐
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ [Filters] [Custom] │ Cond 1      │ Cond 2  │ Cond 3    │ ← Row 1：4 列等宽
│ Cond 4             │ Cond 5      │ Cond 6  │ Cond 7    │ ← Row 2：已满 4 格
│                                    [Search] [Reset ×]  │ ← 已满：Search/Reset 独占新行
└─────────────────────────────────────────────────────────┘
```

---

## 核心规则

1. 条件区默认 **4 列等宽 grid**，`gap: 16px`，filter 最小宽度 **263px**
2. **Search + Reset 位置看最后一行是否有空位**：
   - 空位 ≥ 1 格 → 同行靠右（`justify-content: space-between`）
   - 已满 → 独占新行（`justify-content: flex-end`）
3. 条件框高度固定 **36px**，宽度由 grid 等分，不写死像素
4. 条件框内部结构：`Label ｜ 分隔线（1px #DEDFE3 h:16px）｜ Value ↓`
5. 各行间距 `gap: 16px`；筛选栏与 Toolbar 之间**无间距**

---

## 四种典型布局

**① filter 数量少（< 4），Search/Reset 同行**
```
行1: [SearchInput (flex:1)] [Status ▾] [Search] [×]
```

**② filter = 4，第二行有空位**
```
行1: [Filter A ▾] [Filter B ▾] [Filter C ▾] [Filter D ▾]
行2: [SearchInput      ←justify-between→          [Search] [×]]
```

**③ 最后一行已满**
```
行1: [Filter A ▾] [Filter B ▾] [Filter C ▾] [SearchInput ▾]
行2:                                           [Search] [×]
                                               ← justify-end →
```

**④ 复杂多行（含 Filters/Plan 特殊按钮）**
```
行1: [Filters ✦ Plan ✦]  [Filter A ▾]  [Filter B ▾]  [Filter C ▾]
行2: [Filter D ▾]  [Filter E ▾]  ...
末行(有空位): [Filter X ▾] [Filter Y ▾] [Filter Z ▾]  [Search] [×]
末行(已满):  [Filter X ▾] [Filter Y ▾] [Filter Z ▾] [Filter W ▾]
             独立新行:                                  [Search] [×]
```

---

## 响应式列数

| 视口状态 | 行为 |
|---|---|
| **≤ 1440px** | 保持 4 列，filter 等宽拉伸，`gap: 16px` 固定 |
| 宽至可容纳 5 个 300px filter（约 ≥ 1674px）| 自动变 5 列 |
| 宽至可容纳 6 个 300px filter（约 ≥ 1986px）| 自动变 6 列 |

> 由 `repeat(auto-fill, minmax(263px, 1fr))` 自动驱动，无需 media query。

---

## 条件框样式

| 元素 | 规格 |
|---|---|
| 高度 | 36px |
| 边框 | `1px solid #DEDFE3`，hover → `var(--pcv-brand)` |
| 圆角 | 4px |
| Label | Inter Medium 500，`#45464F`，`padding: 0 12px`，`flex-shrink: 0` |
| 分隔线 | `1px #DEDFE3 height: 16px` |
| Value（有值）| Regular 400，`#66666C` |
| Value（空）| Regular 400，`#B2B2B8` |
| Value（激活）| Medium 500，`var(--pcv-brand)` |
| 箭头 | `20×20px`，`#DEDFE3`，hover → `var(--pcv-brand)` |

| 特殊类型 | 处理方式 |
|---|---|
| 文本搜索（text input）| Value 区替换为 `<input>`，无下拉箭头 |
| 日期范围（date range）| Value 区显示日历图标 + 日期文字 |
| 宽条件（占 2 格）| `grid-column: span 2` |

---

## Search / Reset 按钮

| 按钮 | 规格 |
|---|---|
| Search | `height: 36px; padding: 0 20px; background: var(--pcv-brand); border-radius: 6px; color: #FBFBFB` |
| Reset | `36×36px; border: 1px solid #DEDFE3; border-radius: 6px`，hover → border/icon 变 brand 色 |

> ⚠️ Search 和 Reset 圆角为 **6px**，与条件框的 **4px** 不同。

---

## CSS

```css
.filter-bar {
  padding: 16px 24px;
  border-bottom: 1px solid #edeef1;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 中间行：全为 filter 条件 */
.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(263px, 1fr));
  gap: 16px;
  width: 100%;
}

/* 最后行有空位：filter + Search/Reset 同行两端对齐 */
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

/* 最后行已满：Search/Reset 独占新行靠右 */
.filter-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

/* Filters + Custom 按钮组（共占 1 格，内部均分） */
.filter-quick {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* 条件框 */
.filter-cond {
  height: 36px;
  width: 100%;
  border: 1px solid #dedfe3;
  border-radius: 4px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #ffffff;
  cursor: pointer;
  transition: border-color .15s;
}
.filter-cond:hover { border-color: var(--pcv-brand); }

/* Search 按钮 */
.btn-search {
  height: 36px;
  padding: 0 20px;
  background: var(--pcv-brand);
  border: 1px solid var(--pcv-brand);
  border-radius: 6px;
  color: #fbfbfb;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.btn-search:hover { opacity: .88; }

/* Reset 按钮 */
.btn-clear {
  width: 36px;
  height: 36px;
  border: 1px solid #dedfe3;
  border-radius: 6px;
  background: #ffffff;
  display: grid;
  place-items: center;
  cursor: pointer;
}
.btn-clear:hover { border-color: var(--pcv-brand); color: var(--pcv-brand); }

/* Filters / Custom 特殊按钮 */
.btn-filter {
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--pcv-brand);
  border-radius: 4px;
  background: #ffffff;
  color: var(--pcv-brand);
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
}
.btn-filter:hover { background: rgba(var(--pcv-brand-rgb), .06); }
```
