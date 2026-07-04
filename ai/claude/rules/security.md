# Rules for security across all files

## Auth (Better Auth + JWT + Workers)
- `createAuth(db)` factory for request-scoped DB
- JWT strategy (no persistent sessions on Workers)
- Passwords: bcryptjs cost 12
- Sessions: HttpOnly, Secure, SameSite=Lax
- Brute force: 5/min per IP via KV (`cf-connecting-ip` ONLY)
- Email verification before full access
- OAuth state parameter: always validate
- Guest workspace `ws_guest` for FK constraints

## Authorization
- EVERY API route: check auth → check role → filter by orgId
- Admin: `role === 'ADMIN'` on server, NEVER trust client
- Tenant isolation: EVERY D1 query MUST include `orgId`

## Input Validation
- ALL inputs: Zod server-side (never trust client)
- SQL: Drizzle parameterized only (never raw concat)
- XSS: no `dangerouslySetInnerHTML` without DOMPurify
- Files: type + size + content validation
- URLs: validate for open redirect
- Path traversal: reject `..`

## AI Security
- Never raw user input as agent instructions
- Rate limit AI: KV, `cf-connecting-ip`
- Sanitize AI output before rendering
- Human-in-the-loop for destructive actions
- Audit log all AI interactions

## Headers (next.config.ts)
- CSP, HSTS (63072000), X-Frame-Options: DENY, nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: disable camera, microphone, geolocation
- CORS: explicit origins, never `*`

## Rate Limiting
- `cf-connecting-ip` — NEVER `x-forwarded-for` (spoofable)
- KV counters with TTL sliding window
- Tiered: Guest < Free < Pro < Admin
- Auth: 5/min; API: 60/min; AI: 20/hour
- Return 429 + Retry-After

## Secrets
- `.env`, `.dev.vars` in `.gitignore`
- Cloudflare Secrets for production
- Separate deploy/runtime tokens
- Never in logs, URLs, errors, client bundles
- `pnpm audit` in CI — zero high/critical
- `pnpm-lock.yaml` committed (never `package-lock.json`)

## Logging
- Structured JSON logger service — never `console.log` in production
- Every entry: `{ timestamp, level, message, requestId, userId, action }`
- Mask: passwords, tokens, API keys, full emails
- Correlation ID per request, propagated through services
