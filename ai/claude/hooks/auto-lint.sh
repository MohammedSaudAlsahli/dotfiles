#!/bin/bash
# Auto-lint changed files after Write/Edit using Biome
set -euo pipefail

TOOL_INPUT="${TOOL_INPUT:-}"
FILE=""

if [ -n "$TOOL_INPUT" ]; then
  FILE=$(echo "$TOOL_INPUT" | grep -oP '"file_path"\s*:\s*"([^"]+)"' | head -1 | sed 's/"file_path"\s*:\s*"//;s/"$//' || true)
  if [ -z "$FILE" ]; then
    FILE=$(echo "$TOOL_INPUT" | grep -oP '"path"\s*:\s*"([^"]+)"' | head -1 | sed 's/"path"\s*:\s*"//;s/"$//' || true)
  fi
fi

if [ -n "$FILE" ] && [[ "$FILE" =~ \.(ts|tsx|js|jsx|json)$ ]]; then
  if command -v bunx &> /dev/null && [ -f "node_modules/.bin/biome" ]; then
    bunx biome check --fix --unsafe "$FILE" 2>/dev/null || true
  fi
fi

exit 0
