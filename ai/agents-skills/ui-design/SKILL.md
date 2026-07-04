# UI Design Skill

> Design system reference: Tailwind (latest) `@theme`, shadcn (latest) base-nova (Base UI), Motion (latest), RTL.

## When to Load
Load when working on components, layouts, design tokens, animations, dark mode, or RTL support.

## Tailwind (latest) Setup
```css
/* app/globals.css */
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme {
  --color-brand-50: oklch(0.97 0.01 250);
  --color-brand-100: oklch(0.93 0.03 250);
  --color-brand-500: oklch(0.55 0.20 250);
  --color-brand-900: oklch(0.25 0.10 250);
  --color-brand-950: oklch(0.18 0.07 250);

  --color-surface: oklch(1.0 0 0);
  --color-surface-elevated: oklch(0.98 0 0);
  --color-text: oklch(0.15 0 0);
  --color-text-muted: oklch(0.45 0 0);
  --color-border: oklch(0.88 0 0);

  --radius-sm: 0.375rem;
  --radius-default: 0.625rem;
  --radius-lg: 0.75rem;
  --font-sans: 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono Variable', ui-monospace, monospace;
}
```

## shadcn (latest) (Base UI, NOT Radix)
```tsx
// ✅ Base UI — render prop
<Select render={<button className="..." />}>
  <Option value="1">Option 1</Option>
</Select>

// ❌ Radix — asChild (REMOVED in newer versions)
<Select asChild><button>...</button></Select>
```

Style: **base-nova**. Add: `bunx shadcn@latest add button card dialog`

## Dashboard Layout
```
┌──────────────────────────────────────────┐
│ Sidebar (240px)  │  Header + Breadcrumbs │
│ [RTL: right]     │  [RTL: flipped]       │
│                  ├───────────────────────│
│ Logo + Nav       │  Content (max-w-7xl)  │
│ User menu        │                       │
└──────────────────────────────────────────┘
```
Sidebar: 240px full → 64px collapsed → overlay mobile. RTL: flips to right side.

## Motion (latest) Animations
```typescript
import { motion } from 'motion/react' // NOT framer-motion

// Page entrance
<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} />

// Button
<motion.button whileTap={{ scale: 0.98 }} />

// Stagger
items.map((item, i) => (
  <motion.li key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} />
))
```
ALWAYS: `@media (prefers-reduced-motion: reduce)` — disable animations.

## RTL Support
- Use logical CSS: `ms-4`/`me-4` (margin-inline-start/end) not `ml-4`/`mr-4`
- `ps-4`/`pe-4` for padding
- Test with Arabic locale (`dir="rtl"`)
- Icons that imply direction (arrows) need RTL flip

## Component Recipes

### Card
```tsx
<div className="rounded-xl border border-border/50 bg-surface p-6 transition-all duration-200 hover:border-border hover:shadow-md" />
```

### Empty State
```tsx
<div className="flex flex-col items-center justify-center py-16 text-center">
  <div className="rounded-xl bg-brand-50 p-4 dark:bg-brand-950">
    <Icon className="h-8 w-8 text-brand-500" />
  </div>
  <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
  <p className="mt-1 text-sm text-text-muted max-w-sm">Create your first project.</p>
  <Button className="mt-6">Create Project</Button>
</div>
```

### Loading Skeleton
```tsx
<div className="animate-pulse space-y-3">
  <div className="h-4 w-3/4 rounded bg-border/50" />
  <div className="h-4 w-1/2 rounded bg-border/50" />
</div>
```
