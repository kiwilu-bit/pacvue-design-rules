# 02-layout — 全局布局规则

> 本层定义**与具体页面和组件无关的、全局性的空间规则**。  
> 任何页面、任何区域都适用的布局基础放这里。

---

## 这里应该放什么

| 类型 | 示例文件（待补充）| 说明 |
|---|---|---|
| 栅格系统 | `grid-system.md` | 全局列数、gutter、容器最大宽度 |
| 响应式断点 | `breakpoints.md` | 各断点定义（1280 / 1440 / 1920px）及对应行为 |
| 页面边距规范 | `page-spacing.md` | 页面级 padding、内容区与侧边栏的关系 |
| Z-index 层级 | `z-index.md` | 全局层叠顺序（nav / modal / tooltip 等） |
| 间距 Scale | `spacing-scale.md` | 4 / 8 / 12 / 16 / 24 / 32px 等间距档位及使用规则 |

---

## 这里不应该放什么

| 错误示例 | 应该放在 |
|---|---|
| 表单内字段间距（label→input 4px、field→field 24px）| `04-areas/form-area.md` |
| Filter Bar 的 grid 列数规则 | `04-areas/filter-bar-area.md` |
| 某个组件内部的 padding | `03-components/<component>.md` |
| 某个页面的骨架宽度（720px / 960px / 1330px）| `01-page-templates/form-page.md` |

---

## 层级关系

```
01-page-templates/    ← 完整页面骨架（哪些区域、各区域高度/顺序）
02-layout/            ← 全局空间规则（跨页面、跨区域通用）  ← 本层
04-areas/             ← 区域级规则（某个区域的形态与交互）
03-components/        ← 单个组件的样式与状态
```

**判断依据：如果这条规则在所有页面、所有区域都适用，放 `02-layout/`；如果只属于某个特定区域或组件，放对应层。**
