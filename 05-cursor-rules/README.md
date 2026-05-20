# Cursor Rules (Source Files)

This folder contains the original `.mdc` rule files designed for use with [Cursor IDE](https://cursor.sh/).

These files can be placed in `.cursor/rules/` in any project to have AI agents automatically follow Pacvue design conventions.

## Files

| File | Description | Always Applied? |
|---|---|---|
| `pacvue-design-system.mdc` | Core design system enforcement | ✅ Always |
| `pacvue-form-template.mdc` | Form field anatomy and variants | ✅ Always |
| `pacvue-create-page-template.mdc` | Create/Edit page M/L/XL tier system | ✅ Always |
| `10-表格规范.mdc` | Table component full spec | On demand |
| `11-筛选栏规范.mdc` | Filter bar spec | On demand |
| `12-分页器规范.mdc` | Pagination spec | On demand |
| `表单规则/01-定义与对齐.mdc` | Form definitions & alignment | ✅ Always |
| `表单规则/02-间距规范.mdc` | Form spacing | ✅ Always |
| `表单规则/03-容器类型.mdc` | Container types | ✅ Always |
| `表单规则/04-页面布局与Footer.mdc` | Page layout & footer | ✅ Always |
| `表单规则/05-特殊组件.mdc` | Special form components | ✅ Always |
| `表单规则/06-下拉项规范.mdc` | Dropdown menu items | On demand |
| `表单规则/07-选择器规范.mdc` | Select / selector | On demand |
| `表单规则/08-输入框规范.mdc` | Input box | On demand |
| `表单规则/09-日期选择器规范.mdc` | Date picker | On demand |
| `表单规则/13-多选框规范.mdc` | Checkbox | On demand |
| `页面模版/主管理页面.mdc` | Main management list page template | On demand |

## How to Use in a New Project

Copy the relevant files to your project:

```bash
# Copy all rules
cp -r 05-cursor-rules/ your-project/.cursor/rules/

# Or just copy the always-applied ones
cp 05-cursor-rules/pacvue-design-system.mdc your-project/.cursor/rules/
cp 05-cursor-rules/pacvue-form-template.mdc your-project/.cursor/rules/
cp 05-cursor-rules/pacvue-create-page-template.mdc your-project/.cursor/rules/
```

See the organized human-readable versions in `03-components/` and `01-page-templates/` for easier reference.
