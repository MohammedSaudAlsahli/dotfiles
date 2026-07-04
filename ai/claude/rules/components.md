# Rules for src/components/** and src/app/**

## Server vs Client
- Server Components by default (no directive)
- `"use client"` ONLY for: event handlers, hooks, browser APIs, state
- Fetch data in Server, pass as props to Client
- `next/headers` returns promises in Next.js 15+ (still applies in 16)

## Component Patterns
- Named exports only (except page.tsx, layout.tsx, route.ts)
- One component per file, filename = component name (kebab-case)
- Props as TypeScript `interface`, never inline
- No `any` — use `unknown` with type guards
- No `React.FC` — plain function declarations
- Handle: loading, error, empty states — always

## shadcn/ui (latest) (Base UI, NOT Radix)
- Style: **base-nova** — `bunx shadcn@latest add <component>`
- Uses **Base UI** — `render` prop, NOT `asChild` (Radix is gone)
- Icons: `lucide-react`
- Customize colors, spacing, radius — never ship defaults
- `cn()` utility (clsx + tailwind-merge) for conditional classes

## assistant-ui (AI Chat UI)
- Use `@assistant-ui/react` + `@assistant-ui/react-ai-sdk` for ALL AI chat interfaces
- NEVER build raw chat UI with `useChat` — use assistant-ui Thread/Composer/Message primitives
- `makeAssistantToolUI` for rendering tool calls as custom components
- Import styles: `@assistant-ui/react/styles/index.css`
- Customize with shadcn theming

## Accessibility (enforced)
- Keyboard accessible interactive elements
- `alt` on all images (decorative = `alt=""`)
- `<label>` linked via `htmlFor`
- `focus-visible:ring-2 focus-visible:ring-brand-500`
- Contrast: 4.5:1 text, 3:1 UI
- ARIA when semantic HTML insufficient

## RTL (Arabic)
- All layouts must work RTL
- Use logical properties: `ms-*`/`me-*` not `ml-*`/`mr-*` where possible
- Test both EN and AR locales
- `dir="rtl"` set by next-intl layout

## Hydration
- Guard `localStorage`/`window` with `useEffect` + `isHydrated` flag
- No SSR/client mismatch — test both

## File Structure
- `src/components/ui/` — shadcn base-nova
- `src/components/features/[feature]/`
- `src/components/layouts/` — sidebar, header
- `src/components/shared/` — reusable
- `src/app/[locale]/(dashboard)/` — protected
- `src/app/[locale]/(auth)/` — auth
- `src/app/api/` — API routes (thin — delegate to services)
