# Security Patterns Skill

> Auth, rate limiting, input validation, AI safety — on Cloudflare Workers + D1 + KV.

## When to Load
Load when working on auth, authorization, API security, AI safety, rate limiting, or compliance.

## Better Auth + JWT (Workers)
```typescript
export function createAuth(db: D1Database) {
  return betterAuth({
    database: drizzleAdapter(db),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      passwordStrength: { minLength: 8, requireUppercase: true, requireNumber: true },
    },
    socialProviders: { google: { ... }, github: { ... } },
    session: {
      strategy: 'jwt', // JWT for Workers — no persistent sessions
      cookieOptions: { httpOnly: true, secure: true, sameSite: 'lax' },
    },
    rateLimit: { window: 60, max: 5 },
  })
}
```

## Route Protection (Clean Architecture)
```typescript
// src/infrastructure/auth/guard.ts
export async function requireAuth(): Promise<Session> {
  const session = await auth()
  if (!session?.user) throw new AuthError('Unauthorized')
  return session
}

export async function requireAdmin(): Promise<Session> {
  const session = await requireAuth()
  if (!['admin', 'owner'].includes(session.user.role))
    throw new AuthError('Forbidden')
  return session
}
```

## Rate Limiting (KV + cf-connecting-ip)
```typescript
// NEVER x-forwarded-for (spoofable)
const ip = request.headers.get('cf-connecting-ip')!

async function checkRateLimit(kv: KVNamespace, ip: string, endpoint: string, limit: number, windowSec: number) {
  const key = `rate:${ip}:${endpoint}`
  const current = parseInt(await kv.get(key) || '0')
  if (current >= limit) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': String(windowSec) },
    })
  }
  await kv.put(key, String(current + 1), { expirationTtl: windowSec })
  return null // OK
}

// Tiered limits
// Auth: 5/min | API: 60/min | AI: 20/hour
```

## Input Validation (Zod — all server-side)
```typescript
import { z } from 'zod'

const CreateProjectSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  description: z.string().max(500).optional(),
})

// API route — THIN: validate, delegate, respond
export async function POST(req: Request) {
  const session = await requireAuth()
  const body = await req.json()
  const parsed = CreateProjectSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
  }
  const result = await projectService.create(parsed.data, session.user.orgId)
  return Response.json(result, { status: 201 })
}
```

## AI Security (Mastra)
```typescript
// ❌ NEVER — raw user input as instructions
const agent = new Agent({ instructions: userInput })

// ✅ SAFE — user input as message only
const response = await agent.generate(sanitizedUserInput, {
  requestContext: { userId, orgId }, // tenant isolation in tools
})
```

- Validate/sanitize user messages before agent
- Tool execute: Zod schemas enforce; try/catch required
- Never expose system prompts or tool schemas
- Rate limit AI endpoints (KV-based)
- Audit log ALL AI interactions
- Human-in-the-loop for: delete, payment, send email, admin actions

## Security Headers
```typescript
// next.config.ts headers()
const securityHeaders = [
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'" },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]
```

## Structured Logger (never console.log in prod)
```typescript
class Logger {
  constructor(private ctx: { requestId: string; userId?: string; module: string })
  info(message: string, data?: Record<string, unknown>): void { /* structured JSON */ }
  error(message: string, error: Error, data?: Record<string, unknown>): void { /* with stack */ }
  withContext(extra: Record<string, unknown>): Logger { /* child logger */ }
}
// Mask: passwords, tokens, API keys, full emails
```

## Audit Logging
```typescript
await auditLog({
  action: 'user.invited',
  userId: session.user.id,
  orgId: session.user.orgId,
  resourceType: 'member',
  resourceId: newMember.id,
  details: { email: mask(email), role: 'member' },
  ip: hashIp(request.headers.get('cf-connecting-ip')),
  timestamp: Date.now(), // milliseconds
})
```
