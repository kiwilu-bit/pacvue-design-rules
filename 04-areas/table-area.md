# Table Area — 表格区域规范

> 适用场景：管理页面数据列表区的核心内容展示区。  
> 来源：`05-cursor-rules/10-表格规范.mdc`

---

## 区域尺寸

| 元素 | 高度 | 背景 | 说明 |
|---|---|---|---|
| Table Header | 48px | `#FFFFFF` | `position: sticky; top: 112px` |
| Data Row | 52px（最小）| `#FFFFFF` | 多行内容自动撑高 |
| Total Row | 52px | `#FFFFFF` | 粗体数字，`font-weight: 600` |

---

## 行背景状态

| 状态 | 背景色 |
|---|---|
| Default | `#FFFFFF` |
| Hover | `rgba(var(--pcv-brand-rgb), 0.04)` |
| Selected | `rgba(var(--pcv-brand-rgb), 0.06)` |
| Expand | `#FAFAFA` |

---

## 表头单元格

| 元素 | 规格 |
|---|---|
| 多选 Checkbox | `20×20px`，`left: 24px` |
| 列标题文字 | Inter Medium 14px，`#45464F` |
| 排序图标 | `12×12px × 2`（上下叠放），frame `12×24px`；激活 → `var(--pcv-brand)` |
| 提示图标（ⓘ）| `18×18px`（tips-exclamation），列标题右侧 |
| 操作列图标 | `24×24px`，居中，最后列 |

---

## 数据行单元格内边距

| 列类型 | padding |
|---|---|
| 普通文字列 | `0 16px` |
| 第一列（含 Checkbox）| `0 0 0 24px` |
| 最后列（操作 ⋮）| `0`（内容居中，列宽 55px） |

---

## 特殊单元格类型

| 类型 | 规格 |
|---|---|
| Checkbox（未选）| `border: 1.5px solid #DEDFE3`，白色背景 |
| Checkbox（已选）| `background: var(--pcv-brand)`，白色勾，`border-radius: 3px` |
| 状态点（Status Dot）| `12×12px`，Active `#28C76F`，Paused `#82858B`，Error `#EA5455`，Warning `#FF9F43` |
| 数值列 | `text-align: right`，汇总行加粗 |
| 操作列（⋮）| 宽 `55px`，hover 行时显示，点击弹出 el-dropdown |

---

## 多选联动

| 表头 Checkbox 状态 | 外观 | 触发 |
|---|---|---|
| 全部未选 | 空框 `border: 1.5px solid #DEDFE3` | 初始 |
| 部分选中 | 短横线 `—`，`background: var(--pcv-brand)` | 勾选部分行 |
| 全选当前页 | 勾选 ✓，`background: var(--pcv-brand)` | 点击 Select Current Page |

点击表头 Checkbox（Checked / Indeterminate 时）弹出下拉菜单：

```
┌──────────────────────┐
│  Select All Page     │
│  Select Current Page │  ← 高亮：var(--pcv-brand) 文字，Medium 500
│  Deselect All        │
└──────────────────────┘
```

- 有行被选中 → Toolbar Bulk Op 按钮激活为品牌色边框
- 无行被选中 → Bulk Op 回到灰色禁用

---

## 列宽参考

| 列类型 | 典型宽度 |
|---|---|
| Name（主标题列）| ≥ 280px，含 Checkbox |
| 状态列（State/Type）| 88～120px |
| 文字描述列 | 110～149px |
| 数值列（Budget/CTR 等）| 106～149px，右对齐 |
| 操作列（⋮）| 55px，固定 |

---

## 固定列（横向滚动时）

- **左固定**：Checkbox 列（44px）+ 第一内容列（≥ 240px）
- **右固定**：Action 列（32px，⋮ 图标居中）

### 阴影规则

| 列 | 阴影 | 出现条件 |
|---|---|---|
| 左固定列右侧 | `box-shadow: 10px 0 14px 0 rgba(0,0,0,0.06)` | 有水平滚动偏移时 |
| 右固定列左侧 | `box-shadow: -10px 0 14px 0 rgba(0,0,0,0.06)` | 未滚到最右端时 |

### ⚠️ 固定列背景陷阱

固定列 hover / selected 背景**必须用 `color-mix`**，不能用 `rgba`（半透明会透视后面列的文字，造成重叠 bug）：

```css
/* ❌ 错误 */
tr:hover td.sticky { background: rgba(2, 83, 182, 0.04); }

/* ✅ 正确 */
tr:hover td.sticky {
  background: color-mix(in srgb, var(--pcv-brand) 4%, #ffffff);
}
tr.selected td.sticky {
  background: color-mix(in srgb, var(--pcv-brand) 6%, #ffffff);
}

/* 表格必须设为 separate 才能实现固定列阴影 */
table { border-collapse: separate; border-spacing: 0; }
```

---

## Element Plus Override

```css
/* 表头 */
.el-table th.el-table__cell {
  background: #ffffff;
  height: 48px;
  padding: 0;
  color: #45464f;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid #edeef1;
}
.el-table th.el-table__cell .cell { padding: 0 16px; line-height: 48px; }

/* 数据行 */
.el-table td.el-table__cell {
  height: 52px;
  padding: 0;
  border-bottom: 1px solid #edeef1;
  color: #66666c;
  font-size: 14px;
}
.el-table td.el-table__cell .cell { padding: 0 16px; line-height: 20px; }

/* hover */
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background: rgba(var(--pcv-brand-rgb), 0.04);
}

/* selected */
.el-table__body tr.el-table__row--selected > td {
  background: rgba(var(--pcv-brand-rgb), 0.06);
}

/* 固定列 hover/selected（必须实色） */
.el-table__body tr:hover > td.el-table-fixed-column--left,
.el-table__body tr:hover > td.el-table-fixed-column--right {
  background: color-mix(in srgb, var(--pcv-brand) 4%, #ffffff);
}
.el-table__body tr.el-table__row--selected > td.el-table-fixed-column--left,
.el-table__body tr.el-table__row--selected > td.el-table-fixed-column--right {
  background: color-mix(in srgb, var(--pcv-brand) 6%, #ffffff);
}

/* 排序激活色 */
.el-table .ascending  .sort-caret.ascending  { border-bottom-color: var(--pcv-brand); }
.el-table .descending .sort-caret.descending { border-top-color:    var(--pcv-brand); }

/* 分隔线 */
.el-table::before { background: #edeef1; }

/* 移除 EP 默认表头浅灰背景 */
.el-table__header-wrapper,
.el-table__fixed-header-wrapper { background: #ffffff; }
```

### EP vs Pacvue 差异对比

| 属性 | EP 默认 | Pacvue 规范 |
|---|---|---|
| 表头高度 | ~40px | **48px** |
| 数据行高度 | ~40px | **52px** |
| 表头背景 | 淡灰 | **`#FFFFFF`** |
| 表头文字色 | secondary | **`#45464F`** |
| 分隔线颜色 | lighter | **`#EDEEF1`** |
| Hover 行背景 | fill-color | **`rgba(brand, 0.04)`** |
| 选中行背景 | light-9 | **`rgba(brand, 0.06)`** |
| 行 padding | `5px 12px` | **`0 16px`** |
