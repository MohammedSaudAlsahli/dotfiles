# Rules for styling, CSS, Tailwind, animations

## Tailwind CSS (latest) — NOT v3
- `@import "tailwindcss"` — NOT `@tailwind base/components/utilities`
- Theme via `@theme` blocks in CSS — NO `tailwind.config.js/ts`
- `@custom-variant dark (&:is(.dark *))` for dark mode
- `oklch()` color space for perceptually uniform colors
- Mobile-first: `sm:` → `md:` → `lg:` → `xl:`
- `cn()` utility (clsx + tailwind-merge)

## Color System
- Full brand palette (50–950) in `@theme` using `oklch()`
- Semantic tokens: `--color-surface`, `--color-text`, `--color-border`
- 4.5:1 text contrast, 3:1 UI contrast

## Typography
- Variable fonts via `next/font` (Inter, Geist)
- Type scale: `text-xs` through `text-4xl` with line-heights

## Spacing
- 4px grid: `p-1` (4px) through `p-24` (96px)
- Cards: `p-4` (compact) / `p-6` (standard)

## Animations (Motion (latest))
- `import { motion } from 'motion/react'` — NOT `framer-motion`
- MUST respect `prefers-reduced-motion`
- Entrance: fade + translate (200–300ms, ease-out)
- Exit: fade (150–200ms, ease-in)
- Hover: scale(1.02) or color (150ms)
- Press: scale(0.98) for buttons (100ms)
- Stagger: 50ms between list items
- Never animate width/height — use transform

## RTL Support
- Use logical properties where possible: `ms-*`/`me-*`, `ps-*`/`pe-*`
- Test with Arabic locale (`dir="rtl"`)

## Anti-Patterns
- ❌ Inline styles
- ❌ `!important`
- ❌ Magic numbers (use spacing scale)
- ❌ `tailwind.config` (use `@theme` in CSS)
- ❌ `@tailwind` directives (use `@import "tailwindcss"`)
- ❌ Animations without `prefers-reduced-motion`
- ❌ Default shadcn without customization
- ❌ `framer-motion` import (use `motion/react`)
