# Pagination Area — 分页器区域规范

> 适用场景：管理页面数据列表区底部，固定在表格下方。  
> 来源：`05-cursor-rules/12-分页器规范.mdc`

---

## 布局结构

```
┌──────────────────────────────────────────────────────────────────┐  64px
│ Total 100 entries,  [10/page ↕]    [<][1][2][3][4][5][···][>]  Go to page [__] │
│ ←───── 左侧 ────────────────────── ──────────────── 右侧 ──────────────────────→ │
└──────────────────────────────────────────────────────────────────┘
           justify-content: space-between
```

---

## 显示逻辑

| 场景 | 行为 |
|---|---|
| 数据需分页 | 分页器完整显示 |
| 切换每页数量后，当前页数据 ≤ 每页数量 | **分页器消失**，仅保留页码切换器 |
| 到达最后一页，数据量 ≤ 每页数量 | **分页器保留**（让用户感知当前位置） |

---

## 页码按钮规格

| 属性 | 值 |
|---|---|
| 尺寸 | 32×32px |
| 圆角 | 4px |
| 默认边框 | `1px solid #DEDFE3` |
| 默认文字色 | `#66666C` |
| 当前页边框 | `1px solid var(--pcv-brand)` |
| 当前页文字 | `var(--pcv-brand)`，font-weight: 500 |
| 当前页背景 | **透明**（无填充色） |
| 省略号 | 无 border，`color: #82858B`，不响应 hover |
| 按钮间距 | `gap: 8px` |

---

## 每页数量下拉

| 属性 | 值 |
|---|---|
| 高度 | 32px |
| 圆角 | **5px**（非标准 4px，Figma 实测） |
| 边框 | `1px solid #D8D6DE`（比条件框 `#DEDFE3` 稍深） |
| 文字 | Inter Medium 14px，`#5E5873` |

---

## Go to page 输入框

- 宽度：58px，高度：32px，`border-radius: 4px`
- 文字居中，`font-weight: 500`，`color: #45464F`
- focus → `border-color: var(--pcv-brand)`
- 整组在 `.pagination-right` 内，排在右侧最末

---

## CSS

```css
.pagination {
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #edeef1;
  background: #ffffff;
  flex-shrink: 0;
}

/* 左侧：Total + page size */
.pagination-left {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #6e6b7b;
  white-space: nowrap;
}

.page-size-select {
  height: 32px;
  padding: 0 28px 0 10px;
  border: 1px solid #d8d6de;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #5e5873;
  background: #ffffff;
  appearance: none;
  cursor: pointer;
}
.page-size-select:hover,
.page-size-select:focus { border-color: var(--pcv-brand); }

/* 右侧：页码导航 */
.pagination-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 页码按钮 */
.page-btn {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #dedfe3;
  background: transparent;
  font-size: 14px;
  color: #66666c;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
}
.page-btn:hover          { border-color: var(--pcv-brand); color: var(--pcv-brand); }
.page-btn.active         { border-color: var(--pcv-brand); color: var(--pcv-brand); font-weight: 500; }
.page-btn.ellipsis       { border-color: transparent; cursor: default; color: #82858b; }
.page-btn.ellipsis:hover { border-color: transparent; color: #82858b; }

/* Go to page 输入框 */
.page-goto-input {
  width: 58px;
  height: 32px;
  border: 1px solid #dedfe3;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #45464f;
  background: #ffffff;
}
.page-goto-input:focus { border-color: var(--pcv-brand); outline: none; }
```

---

## Element Plus vs Pacvue 差异

| 属性 | EP 默认 | Pacvue 规范 |
|---|---|---|
| 整体高度 | 无固定 | **64px（含 border-top）** |
| 布局 | 所有元素一排 | **justify-between（左 total，右 nav）** |
| 页码按钮尺寸 | 28px | **32×32px** |
| 当前页样式 | 填充背景色 | **仅 brand 色边框 + 文字，无背景** |
| 页码圆角 | 2px | **4px** |
| 每页下拉高度 | 28px | **32px** |
| 每页下拉圆角 | 4px | **5px** |
| 每页下拉边框 | `--el-border-color` | **`#D8D6DE`** |
| Go to page 位置 | 可配置 | **始终在右侧最末** |
