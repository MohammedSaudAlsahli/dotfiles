# Rules for src/infrastructure/integrations/** and src/app/api/webhooks/**

## Integration Architecture
- All integrations in `src/infrastructure/integrations/[service]/`
- Each integration has: `client.ts`, `types.ts`, `service.ts`, `webhooks.ts`
- Base HTTP client with retry + exponential backoff in `shared/base-client.ts`
- Credentials in Cloudflare Secrets — NEVER in code or env vars

## StreamPay.sa (Payments) — handled by streampay-engineer agent
- StreamPay is the payment provider — NOT Stripe
- Currency: SAR (Saudi Riyal)
- Payment methods: Mada, Visa, Mastercard, STC Pay, SADAD
- Webhook verification: HMAC-SHA256 signature required
- Idempotency: check KV `webhook:{eventId}` before processing
- See `streampay-engineer` agent for full payment patterns
- Integration engineer builds OTHER integrations, not payments

## Email (Resend) — handled by resend-engineer agent
- Resend is the email provider — `resend` + `@react-email/components`
- React Email for templates (NOT raw HTML), bilingual (EN + AR)
- Webhook tracking: delivered, opened, bounced, clicked, complained
- Bounced emails auto-removed; complaints auto-unsubscribed
- See `resend-engineer` agent for full email patterns
- Integration engineer builds OTHER integrations, not emails

## Webhooks (ALL providers)
- Verify signature (HMAC-SHA256) on EVERY webhook — no exceptions
- Idempotency: KV dedup with `webhook:{eventId}`, TTL 7 days
- Return 200 immediately — process async for heavy work
- Process within 30 seconds
- Log: event type, ID, processing time, result

## OAuth Connections
- State parameter: cryptographically random, validate on callback
- Exchange code for tokens server-side only
- Store tokens encrypted in D1 (scoped to orgId)
- Auto-refresh before expiry
- Revoke on disconnect

## API Clients
- Retry with exponential backoff (max 3 retries)
- Circuit breaker: open after 5 failures, reset after 30s
- Structured logging with correlation IDs
- Rate limit external calls per provider limits
- Timeout: 10s default, configurable per integration

## Error Handling
- Never expose raw external errors to users
- Map to domain errors with friendly messages
- Log full error context for debugging
- Graceful degradation when integration is down
