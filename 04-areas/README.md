# 04-areas — 区域规范索引

> 本层定义管理页面中各功能区域的**形态与交互方案**。  
> 粒度介于页面模板（01-page-templates）与组件样式（03-components）之间。

---

## 调用链

```
PRD
 └─ User Flow
      └─ 页面匹配 → 01-page-templates/
           └─ 区域匹配 → 04-areas/          ← 本层
                └─ 组件调用 → 03-components/
                     └─ 最终页面输出
```

---

## 数据列表区（Data List Area）

管理页面核心内容区，从上到下由 5 个子区域组成，各区域上下**零间距**，左右边距统一 **24px**。

```
┌──────────────────────────────────────────────────────────┐
│  ① Filter Bar     自适应高度   padding: 16px 24px        │
│  ────────────────────────────── border-bottom #EDEEF1   │
│  ② Toolbar        68px         padding: 0 24px          │
│  ────────────────────────────── border-bottom #EDEEF1   │
│  ③ Scrollbar      16px         仅列超宽时出现            │
│  ────────────────────────────── border-bottom #EDEEF1   │
│  ④ Table Header   48px                                  │
│     Table Rows    52px / 行                             │
│     Total Row     52px                                  │
│  ────────────────────────────── border-top #EDEEF1      │
│  ⑤ Pagination     64px         padding: 0 24px          │
└──────────────────────────────────────────────────────────┘
```

| 文件 | 区域 | 核心内容 |
|---|---|---|
| `filter-bar-area.md` | ① Filter Bar | 4 列 grid、Search/Reset 位置判断、响应式列数、条件框样式 |
| `toolbar-area.md` | ② Toolbar | 左右两侧布局、4 种按钮状态、图标工具组、多选联动 |
| `scrollbar-area.md` | ③ Scrollbar | 触发条件、尺寸、CSS |
| `table-area.md` | ④ Table | 行高、多选、固定列阴影、color-mix 陷阱、EP override |
| `pagination-area.md` | ⑤ Pagination | 布局、显示逻辑、页码规格、EP 差异对比 |

---

## 表单区（Form Area）

适用于所有创建 / 编辑类表单页面内部的字段排布规则。

| 文件 | 区域 | 核心内容 |
|---|---|---|
| `form-area.md` | Form 内部 | Label→Input 4px、字段垂直 24px、双列 grid、复杂行 12px、Footer gap |

---

## 关联文件

| 层级 | 文件 |
|---|---|
| 页面模板 | `01-page-templates/management-page.md` |
| 组件样式 | `03-components/filter-bar.md`、`03-components/table.md`、`03-components/pagination.md` |
| Cursor 规则 | `05-cursor-rules/10-表格规范.mdc`、`11-筛选栏规范.mdc`、`12-分页器规范.mdc` |
