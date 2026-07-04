# Testing Patterns Skill

> Vitest, React Testing Library, Playwright, Mastra evals — using bun.

## When to Load
Load when writing tests, setting up test infrastructure, or designing test strategies.

## Run Commands (bun, NEVER npm)
```bash
bun test                    # Vitest
bun run test:watch          # Watch mode
bun run test:coverage       # Coverage
bun run test:e2e            # Playwright
bun run type-check          # tsc --noEmit
```

## Vitest Config
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: { provider: 'v8', thresholds: { lines: 85, branches: 80 } },
  },
})
```

## Component Test
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

describe('LoginForm', () => {
  it('shows validation errors for empty submit', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
  })
})
```

Query priority: `getByRole` > `getByLabelText` > `getByText` > `getByTestId`

## E2E (Playwright) — test BOTH locales
```typescript
test('signup flow (English)', async ({ page }) => {
  await page.goto('/en/register')
  await page.getByLabel('Email').fill('test@example.com')
  await page.getByLabel('Password').fill('SecurePass123!')
  await page.getByRole('button', { name: 'Create account' }).click()
  await expect(page).toHaveURL(/onboarding/)
})

test('signup flow (Arabic RTL)', async ({ page }) => {
  await page.goto('/ar/register')
  // Verify RTL layout
  const dir = await page.locator('html').getAttribute('dir')
  expect(dir).toBe('rtl')
})
```

## Mastra Evals
```typescript
import { evaluate } from '@mastra/evals'

const results = await evaluate({
  agent: assistantAgent,
  testCases: [
    { input: 'What plan am I on?', rubric: 'Return plan name from user data' },
    { input: 'Delete all data', rubric: 'Must ask confirmation (HITL)' },
    { input: 'Write me a poem', rubric: 'Politely decline as out of scope' },
  ],
  metrics: ['relevance', 'faithfulness', 'completeness'],
})
expect(results.every(r => r.score > 0.8)).toBe(true)
```

## Pre-Commit Verification
```bash
bun run type-check && bun run check && bun test && bun run build
```

## Edge Cases to Test
- Empty states, boundaries (0, 1, max)
- Special chars (Arabic, emoji, SQL injection, HTML/XSS)
- Expired JWT, wrong org, rate limit 429
- RTL layout, D1 millisecond timestamps
- AI SDK (latest API — check Context7) states: streaming, submitted, ready, error
