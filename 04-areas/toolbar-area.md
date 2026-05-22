# Toolbar Area — 操作栏区域规范

> 适用场景：管理页面数据列表区，Filter Bar 下方的操作工具栏。  
> 来源：`05-cursor-rules/10-表格规范.mdc § 二`

---

## 布局结构

```
┌──────────────────────────────────────────────────────────────┐  68px
│ [+ Create]  [Bulk Target]  [Bulk Op ↓]     [👁] [💾] | [⬇][☰]│
│ ←── 左侧：数据操作 ──────────────── 右侧：工具操作 ──────────→ │
└──────────────────────────────────────────────────────────────┘
```

**左 = 数据操作（会影响表格数据）；右 = 工具操作（不影响数据）。**

---

## 左侧按钮状态

| 类型 | 背景 | 边框 | 文字色 | 触发条件 |
|---|---|---|---|---|
| Primary（Create） | `var(--pcv-brand)` | 无 | `#FFFFFF` | 始终可用 |
| Secondary（Bulk Target） | 透明 | `1px solid var(--pcv-brand)` | `var(--pcv-brand)` | 始终可用 |
| Disabled（Bulk Op） | `rgba(130,133,139,0.05)` | `1px solid #DEDFE3` | `#B2B2B8` | 无行被选中 |
| Active（Bulk Op） | 透明 | `1px solid var(--pcv-brand)` | `var(--pcv-brand)` | 有行被选中 |

所有按钮：`height: 36px; padding: 0 20px; border-radius: 4px; font: Inter Medium 14px; gap: 8px`  
左侧按钮组间距：`gap: 16px`

---

## 右侧图标组

```
[show full number]  [visibility]  │  [save]  [download]  [custom columns]
                                  ↑
                       分隔线：2px × 24px，#D2D4D9，border-radius: 2px
```

| 属性 | 值 |
|---|---|
| 图标尺寸 | `24×24px` |
| 默认色 | `#66666C` |
| Hover 色 | `var(--pcv-brand)` |
| 图标间距 | `gap: 16px` |
| 分隔线 | `2px × 24px`，`#D2D4D9`，`border-radius: 2px` |

---

## 与多选的联动

- 有行被选中 → Bulk Op 按钮从 Disabled 变为 Active（品牌色边框）
- 无行被选中 → Bulk Op 按钮回到 Disabled（灰色）

---

## CSS

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
  gap: 16px;
}

.toolbar-divider {
  width: 2px;
  height: 24px;
  background: #d2d4d9;
  border-radius: 2px;
}

/* Primary 按钮 */
.btn-primary {
  height: 36px;
  padding: 0 20px;
  background: var(--pcv-brand);
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

/* Secondary 按钮 */
.btn-secondary {
  height: 36px;
  padding: 0 20px;
  background: transparent;
  border: 1px solid var(--pcv-brand);
  border-radius: 4px;
  color: var(--pcv-brand);
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

/* Disabled 按钮（Bulk Op 无选中时） */
.btn-bulk-disabled {
  height: 36px;
  padding: 0 20px;
  background: rgba(130, 133, 139, 0.05);
  border: 1px solid #dedfe3;
  border-radius: 4px;
  color: #b2b2b8;
  font-size: 14px;
  font-weight: 500;
  cursor: not-allowed;
}

/* 右侧工具图标 */
.toolbar-icon {
  width: 24px;
  height: 24px;
  color: #66666c;
  cursor: pointer;
  transition: color .15s;
}
.toolbar-icon:hover { color: var(--pcv-brand); }
```
