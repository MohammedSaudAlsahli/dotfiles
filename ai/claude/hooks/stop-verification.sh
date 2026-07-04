#!/bin/bash
# Verify code compiles and tests pass before Claude stops
set -euo pipefail

echo "=== Pre-Stop Verification ==="
ERRORS=0

# Type check
if [ -f "tsconfig.json" ]; then
  echo "Running type check..."
  if ! bunx tsc --noEmit 2>/dev/null; then
    echo "❌ TypeScript errors — fix before stopping"
    ERRORS=$((ERRORS + 1))
  else
    echo "✅ TypeScript: clean"
  fi
fi

# Lint
if [ -f "node_modules/.bin/biome" ]; then
  echo "Running lint..."
  if ! bunx biome check --max-diagnostics=5 src/ 2>/dev/null; then
    echo "⚠️  Lint issues found"
    ERRORS=$((ERRORS + 1))
  else
    echo "✅ Lint: clean"
  fi
fi

# Build
if [ -f "package.json" ]; then
  HAS_BUILD=$(node -e "console.log(!!require('./package.json').scripts?.build)" 2>/dev/null)
  if [ "$HAS_BUILD" = "true" ]; then
    echo "Running build..."
    if ! bun run build 2>/dev/null; then
      echo "❌ Build failed — fix before stopping"
      ERRORS=$((ERRORS + 1))
    else
      echo "✅ Build: success"
    fi
  fi
fi

# Tests
if [ -f "package.json" ]; then
  HAS_TEST=$(node -e "console.log(!!require('./package.json').scripts?.test)" 2>/dev/null)
  if [ "$HAS_TEST" = "true" ]; then
    echo "Running tests..."
    if ! bun test 2>/dev/null; then
      echo "❌ Tests failed — fix before stopping"
      ERRORS=$((ERRORS + 1))
    else
      echo "✅ Tests: passing"
    fi
  fi
fi

if [ $ERRORS -gt 0 ]; then
  echo ""
  echo "⚠️  $ERRORS verification(s) failed. Fix before stopping."
  exit 1
fi

echo ""
echo "✅ All verifications passed."
exit 0
