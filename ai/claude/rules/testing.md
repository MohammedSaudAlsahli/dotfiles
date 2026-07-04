# Rules for **/*.test.ts, **/*.test.tsx, **/*.spec.ts, tests/**, e2e/**

## General
- Every feature MUST have tests before considered complete
- Test files next to source: `component.tsx` → `component.test.tsx`
- E2E in `e2e/` at root; Mastra evals in `src/infrastructure/mastra/evals/`
- Run with `bun test` (Vitest), `bun run test:e2e` (Playwright) — NEVER npm

## Vitest
- `describe` + `it` (not `test`); one assertion concept per test
- Clean up: `afterEach`, `afterAll`
- Mock externals, never call real APIs in unit tests
- `vi.fn()` for mocks, `vi.spyOn()` for spies

## React Testing Library
- Priority: `getByRole` > `getByLabelText` > `getByText` > `getByTestId`
- `userEvent` (not `fireEvent`); always `await` async
- Test behavior, not implementation
- No snapshot tests for logic (only design tokens)

## Playwright E2E
- Critical journeys, not individual components
- `page.getByRole()` / `page.getByLabel()` selectors
- Independent tests (no shared state)
- Page objects for reusable interactions
- Test BOTH English (LTR) and Arabic (RTL) locales

## Mastra Evals
- Every agent: accuracy, safety, boundary evals
- Test tool selection, refusal, structured output
- Use rubrics for subjective quality

## Edge Cases
- Empty states, boundary values, special chars (Arabic, emoji, SQL, HTML)
- Network errors, auth edge cases (expired JWT, wrong org)
- RTL layout, D1 millisecond timestamps, rate limit 429 responses
