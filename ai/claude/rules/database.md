# Rules for src/infrastructure/db/** and all data access

## Tenant Isolation (NON-NEGOTIABLE)
- EVERY SELECT must include `WHERE orgId = ?`
- EVERY INSERT must set `orgId`
- EVERY UPDATE must include `WHERE orgId = ?`
- EVERY DELETE must include `WHERE orgId = ?`
- orgId comes from auth session ONLY — NEVER from request body
- Missing orgId filter = CRITICAL security vulnerability

## Repository Pattern
- All data access via repository classes in `src/infrastructure/db/repositories/`
- Repositories extend `BaseRepository` which enforces `requireOrgId()`
- Services call repositories — routes NEVER query DB directly
- Repositories return typed entities, never raw rows

## D1 / Drizzle Schema
- Schema in single file: `src/infrastructure/db/schema.ts`
- Primary keys: `text("id")` with cuid2
- Timestamps: `integer` storing `Date.now()` — MILLISECONDS, not seconds
- Booleans: `integer({ mode: "boolean" })`
- JSON: `text` with JSON string values
- Bilingual: `name`/`nameAr`, `description`/`descriptionAr`
- Foreign keys with `onDelete: 'cascade'` where appropriate
- Indexes: always include `orgId` in composite indexes

## Migrations
- `bunx drizzle-kit generate` after schema changes
- `bunx drizzle-kit migrate` to apply
- Never modify generated migration files manually
- Test migrations on local D1 before deploying

## Guest Workspace
- `ws_guest` org exists for users before org creation
- Move user to real org after org creation
- Clean up guest data periodically

## Soft Delete
- Use `status: 'deleted'` — never hard delete user data
- Hard delete only after GDPR compliance period
- Audit log all deletions

## Pagination
- Cursor-based pagination ONLY (never OFFSET — slow at scale)
- Default limit: 20, max: 100
- Return `nextCursor` for client to request next page
