#!/bin/bash
# Inject project context at session start
set -euo pipefail

echo "=== Project Context ==="

# Runtime versions
command -v bun &> /dev/null && echo "Bun: $(bun --version 2>/dev/null || echo 'not found')"
command -v pnpm &> /dev/null && echo "pnpm: $(pnpm --version 2>/dev/null || echo 'not found')"
command -v node &> /dev/null && echo "Node: $(node --version 2>/dev/null || echo 'not found')"

# Package manager check
[ -f "package-lock.json" ] && echo "⚠️  package-lock.json found — DELETE IT. Use pnpm-lock.yaml only"
[ ! -f "pnpm-lock.yaml" ] && echo "⚠️  No pnpm-lock.yaml — run: pnpm install"

if [ -f "package.json" ]; then
  echo "Project: $(node -e "console.log(require('./package.json').name || 'unnamed')" 2>/dev/null || echo 'unnamed')"
  echo ""
  echo "=== Key Dependencies ==="
  for dep in "next" "react" "@mastra/core" "typescript" "tailwindcss" "zod" "better-auth" "drizzle-orm"; do
    ver=$(node -e "try{console.log(require('./package.json').dependencies?.['$dep'] || require('./package.json').devDependencies?.['$dep'] || '-')}catch(e){console.log('-')}" 2>/dev/null)
    echo "  $dep: $ver"
  done
fi

echo ""
echo "=== Environment ==="
[ -f ".env" ] && echo "✅ .env exists" || echo "⚠️  No .env — copy .env.example"
[ -f ".dev.vars" ] && echo "✅ .dev.vars exists" || echo "ℹ️  No .dev.vars (Cloudflare local)"
[ -f ".env.example" ] && echo "✅ .env.example exists" || echo "⚠️  Create .env.example"

echo ""
echo "=== Mastra ==="
if [ -d "src/infrastructure/mastra" ] || [ -d "src/lib/mastra" ] || [ -d "src/mastra" ]; then
  echo "✅ Mastra directory found"
  AGENTS=$(find src -name "*.ts" -path "*/agents/*" 2>/dev/null | wc -l)
  TOOLS=$(find src -name "*.ts" -path "*/tools/*" 2>/dev/null | wc -l)
  WORKFLOWS=$(find src -name "*.ts" -path "*/workflows/*" 2>/dev/null | wc -l)
  echo "  Agents: $AGENTS | Tools: $TOOLS | Workflows: $WORKFLOWS"
else
  echo "⚠️  No Mastra directory — run: bunx create-mastra@latest"
fi

echo ""
echo "=== Git ==="
if command -v git &> /dev/null && [ -d ".git" ]; then
  BRANCH=$(git branch --show-current 2>/dev/null || echo 'unknown')
  DIRTY=$(git status --porcelain 2>/dev/null | wc -l)
  echo "Branch: $BRANCH | Uncommitted: $DIRTY"
fi

echo ""
echo "=== REMINDERS ==="
echo "• pnpm for packages, bun for scripts — NEVER npm"
echo "• shadcn v4 = Base UI (render prop, NOT asChild)"
echo "• AI SDK v6: status/parts/maxOutputTokens"
echo "• D1 timestamps = milliseconds"
echo "• cf-connecting-ip for rate limiting"
echo "✅ Ready"
exit 0
