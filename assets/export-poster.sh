#!/usr/bin/env bash
# 将 spacing-tuner-poster.html 导出为 768×1024 PNG
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
HTML="file://${DIR}/spacing-tuner-poster.html"
OUT="${DIR}/spacing-tuner-poster.png"

if command -v chromium >/dev/null 2>&1; then
  CHROME=chromium
elif command -v google-chrome >/dev/null 2>&1; then
  CHROME=google-chrome
elif [[ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]]; then
  CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
else
  echo "未找到 Chrome/Chromium，请用浏览器打开 spacing-tuner-poster.html 后截图 768×1024。"
  exit 1
fi

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --window-size=768,1024 \
  --screenshot="${OUT}" \
  "${HTML}"

echo "已导出: ${OUT}"
