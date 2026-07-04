#!/bin/bash
# Block dangerous commands before execution
set -euo pipefail

TOOL_INPUT="${TOOL_INPUT:-}"
COMMAND=""

if [ -n "$TOOL_INPUT" ]; then
  COMMAND=$(echo "$TOOL_INPUT" | grep -oP '"command"\s*:\s*"([^"]+)"' | head -1 | sed 's/"command"\s*:\s*"//;s/"$//' || true)
fi

[ -z "$COMMAND" ] && exit 0

BLOCKED_PATTERNS=(
  "rm -rf /"  "rm -rf ~"  "rm -rf \."  "rm -rf \*"
  "git push --force"  "git push -f"  "git reset --hard"
  "npm publish"  "pnpm publish"  "bun publish"
  "npm install"  "npm run"  "npx "
  "DROP TABLE"  "DROP DATABASE"  "TRUNCATE"  "DELETE FROM"
  "> /dev/sda"  "mkfs\."  "chmod -R 777"
  "curl.*| bash"  "curl.*| sh"  "wget.*| bash"  "wget.*| sh"
  "eval("  "env | "  "printenv"
  "cat .env"  "cat .dev.vars"  "cat *.env*"
)

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qiP "$pattern" 2>/dev/null; then
    echo "BLOCKED: Command matches dangerous pattern: $pattern"
    echo "Command: $COMMAND"
    [ "$pattern" = "npm install" ] && echo "USE pnpm install INSTEAD"
    [ "$pattern" = "npm run" ] && echo "USE bun run INSTEAD"
    [ "$pattern" = "npx " ] && echo "USE bunx INSTEAD"
    exit 2
  fi
done

exit 0
