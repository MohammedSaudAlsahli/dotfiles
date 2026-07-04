# SaaS Patterns Skill

> Auth, billing, admin, settings, multi-tenancy, RBAC, onboarding — on Cloudflare Workers + D1.

## When to Load
Load when working on auth, billing, admin, settings, multi-tenancy, onboarding, or feature audits.

## Multi-Tenancy (D1)
```
Organization (tenant)
├── Members (users with RBAC roles)
├── Data (ALL records scoped to orgId)
├── Subscription (billing plan)
├── Settings (org config)
└── API Keys (scoped tokens)
```

EVERY D1 query MUST include `orgId`:
```typescript
// ✅ CORRECT
const projects = await db.query.projects.findMany({
  where: eq(projects.orgId, session.user.orgId),
})
// ❌ NEVER — leaks cross-tenant data
const projects = await db.query.projects.findMany()
```

D1 schema patterns:
```typescript
// Primary key: cuid2
id: text("id").primaryKey().$defaultFn(() => createId())
// Timestamps: MILLISECONDS
createdAt: integer("created_at").$defaultFn(() => Date.now())
// Booleans
isActive: integer("is_active", { mode: "boolean" }).default(true)
// Bilingual
name: text("name").notNull()
nameAr: text("name_ar")
```

## RBAC
| Role | Permissions |
|------|-------------|
| **Owner** | Everything + delete org + transfer ownership |
| **Admin** | Manage members + billing + settings |
| **Member** | CRUD on owned + view shared |
| **Viewer** | Read-only |

## Auth (Better Auth + JWT on Workers)
```typescript
// Factory pattern for request-scoped DB
export function createAuth(db: D1Database) {
  return betterAuth({
    database: drizzleAdapter(db),
    emailAndPassword: { enabled: true, requireEmailVerification: true },
    socialProviders: { google: { ... }, github: { ... } },
    session: { strategy: 'jwt' }, // JWT for Workers (no persistent sessions)
  })
}
```

Auth flow:
```
Register → Email Verify → Create Org → Onboarding → Dashboard
Login → Check MFA → Load Org → Dashboard
OAuth → Link/Create → Check Org → Dashboard
```

Guest workspace: `ws_guest` for FK constraints when user has no org yet.

## Billing (StreamPay.sa — handled by streampay-engineer)
```
StreamPay Customer ←→ Organization
StreamPay Subscription ←→ Org Subscription
StreamPay Plan/Price ←→ Plan Tier (SAR)
StreamPay Invoice ←→ Billing History
```

Payment methods: Mada, Visa, Mastercard, STC Pay, SADAD
Currency: SAR (amounts stored in halalas = SAR × 100)

Webhook events: `checkout.completed`, `subscription.activated`,
`subscription.cancelled`, `invoice.paid`, `invoice.payment_failed`
— verify HMAC-SHA256 on all webhooks, process idempotently (KV dedup).

## Integrations (handled by integration-engineer)
Every modern SaaS needs an integration system:
- **OAuth framework**: Connect to Google, social, CRM, etc.
- **Webhook system**: Receive events from external services
- **API clients**: Retry, circuit breaker, rate limiting
- **MCP server**: Expose your app's tools to external agents
- **Settings UI**: Connect/disconnect/status per integration
- All integration data scoped to orgId (encrypted tokens in D1)

## Settings Architecture
```
/[locale]/settings
├── /profile          → Name, email, avatar, password, MFA
├── /organization     → Org name, logo, domain, delete org
├── /members          → Invite, remove, change roles
├── /billing          → Plan, payment, invoices, usage
├── /notifications    → Email/in-app prefs, digest frequency
├── /api-keys         → Create, revoke, permissions
├── /integrations     → Connected services
└── /security         → Sessions, login history, MFA
```

## Admin Panel
```
/[locale]/admin
├── /dashboard        → KPIs: signups, active users, MRR, churn
├── /users            → List, search, filter, detail
├── /organizations    → List, subscription, usage
├── /audit-log        → All events, filterable
├── /feature-flags    → Toggle per org or global
└── /system           → Health, queues, error rates
```

## Rate Limiting (KV)
```typescript
// ALWAYS cf-connecting-ip, NEVER x-forwarded-for
const ip = request.headers.get('cf-connecting-ip')
const key = `rate:${ip}:${endpoint}`
const count = await kv.get(key) || 0
if (count >= limit) return new Response('Too Many Requests', {
  status: 429,
  headers: { 'Retry-After': '60' },
})
await kv.put(key, String(count + 1), { expirationTtl: 60 })
```

## Onboarding
1. Signup (email + password or OAuth)
2. Email verification
3. Org creation (name, invite team)
4. Feature walkthrough
5. First value action
6. Empty state → CTA
