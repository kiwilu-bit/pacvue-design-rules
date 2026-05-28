# Cursor Rules (installed)

Rules in this folder are loaded automatically by [Cursor](https://cursor.com) when you work in this workspace.

## Tooltip

| File | When it applies |
|------|-----------------|
| `14-悬浮提示规范.mdc` | `**/*.vue`, `**/*.html`, `**/*.css` — writing or editing UI |

Source of truth: `05-cursor-rules/14-悬浮提示规范.mdc` (re-run install script after updates).

## Install into another Vue project

From the `pacvue-design-rules` repo root:

```bash
chmod +x scripts/install-cursor-rules.sh
./scripts/install-cursor-rules.sh /path/to/your-vue-app
```

Install all Pacvue rules:

```bash
./scripts/install-cursor-rules.sh --all /path/to/your-vue-app
```
