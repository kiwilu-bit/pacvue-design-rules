# Scrollbar Area — 水平滚动条区域规范

> 适用场景：管理页面表格列总宽超出可视区域时，出现在 Toolbar 下方、Table Header 上方。  
> 来源：`05-cursor-rules/10-表格规范.mdc § 四、§ 十四.6`

---

## 触发条件与位置

```
┌──────────────────────────────────────┐
│  Toolbar（68px）                     │
├──────────────────────────────────────┤
│  Scrollbar（16px）← 仅列超宽时出现   │
├──────────────────────────────────────┤
│  Table Header（48px）                │
```

- **仅当表格列总宽 > 可用容器宽度时出现**
- 位于 Toolbar 下方、Table Header 上方
- 列未超宽时此区域不渲染，Toolbar 与 Header 直接相邻

---

## 尺寸规格

| 属性 | 值 |
|---|---|
| 整体高度 | 16px |
| Thumb 高度 | 8px（居中） |
| Thumb 颜色 | `#D2D4D9` |
| Track 背景 | `#FFFFFF` |
| Track border-top | `1px solid #EDEEF1` |
| Track border-bottom | `1px solid #EDEEF1` |

---

## CSS

```css
/* Element Plus 表格横向滚动条 */
.el-table__body-wrapper::-webkit-scrollbar {
  height: 8px;
}
.el-table__body-wrapper::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 7px;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: #d2d4d9;
  border-radius: 7px;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb:hover {
  background: #b2b4b9;
}
```
