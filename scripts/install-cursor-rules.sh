#!/usr/bin/env bash
# Install Pacvue Cursor rules into a project's .cursor/rules/ directory.
#
# Usage:
#   ./scripts/install-cursor-rules.sh                    # install tooltip rule into THIS repo
#   ./scripts/install-cursor-rules.sh /path/to/vue-app   # install into a business project
#   ./scripts/install-cursor-rules.sh --all /path/to/vue-app
#
# Tooltip-only (default) copies:
#   05-cursor-rules/14-悬浮提示规范.mdc → <target>/.cursor/rules/

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT/05-cursor-rules"
INSTALL_ALL=false
TARGET=""

for arg in "$@"; do
  case "$arg" in
    --all) INSTALL_ALL=true ;;
    -h|--help)
      sed -n '2,12p' "$0"
      exit 0
      ;;
    *)
      if [[ -z "$TARGET" ]]; then
        TARGET="$arg"
      else
        echo "Unknown argument: $arg" >&2
        exit 1
      fi
      ;;
  esac
done

if [[ -z "$TARGET" ]]; then
  TARGET="$ROOT"
fi

if [[ ! -d "$TARGET" ]]; then
  echo "Target directory does not exist: $TARGET" >&2
  exit 1
fi

DEST="$TARGET/.cursor/rules"
mkdir -p "$DEST"

copy_rule() {
  local name="$1"
  local src="$SRC_DIR/$name"
  if [[ ! -f "$src" ]]; then
    echo "Missing source rule: $src" >&2
    exit 1
  fi
  cp "$src" "$DEST/$name"
  echo "  ✓ $name"
}

echo "Installing Cursor rules → $DEST"

if $INSTALL_ALL; then
  while IFS= read -r -d '' f; do
    rel="${f#"$SRC_DIR"/}"
    mkdir -p "$DEST/$(dirname "$rel")"
    cp "$f" "$DEST/$rel"
    echo "  ✓ $rel"
  done < <(find "$SRC_DIR" -name '*.mdc' -print0)
else
  copy_rule "14-悬浮提示规范.mdc"
fi

echo ""
echo "Done. Cursor will apply these rules when matching files are in context."
echo "Tooltip rule globs: **/*.vue, **/*.html, **/*.css"
echo ""
echo "Optional: clone or submodule pacvue-design-rules for full docs (03-components/tooltip.md)."
