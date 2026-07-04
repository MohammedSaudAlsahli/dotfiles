# Style Guide

## Naming

- Variables/Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Files: `kebab-case.ts`
- Booleans: Start with `is`, `has`, `should`

## Code organization

```typescript
// 1. Imports
import { foo } from 'bar'

// 2. Constants
const MAX_SIZE = 100

// 3. Types
interface User {
  id: string
}

// 4. Functions
function doSomething() {}

// 5. Exports
export { doSomething }
```

## Error handling

Always handle errors explicitly - never silently catch.

## Comments

Write "why" not "what".
