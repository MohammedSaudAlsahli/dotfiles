# Rules for src/infrastructure/mastra/**

## Agent Rules
- Every agent MUST have unique `id`, `name`, and `description` (required for multi-agent routing)
- Instructions: specific and scoped — no vague "be helpful"
- `enableMemory: true` for conversational agents
- Register all agents in Mastra instance (`src/infrastructure/mastra/index.ts`)
- Use `structuredOutput` with Zod for typed UI responses
- AI SDK: field names change between versions — always check Context7 for current API

## Tool Rules
- `inputSchema` + `outputSchema` with Zod — `.describe()` on every field
- `requestContextSchema` with `orgId` for tenant isolation — MANDATORY
- `execute` MUST have try/catch — return friendly errors, never expose internals
- Validate external API responses before returning
- Human-in-the-loop (`suspend`) for destructive operations

## Workflow Rules
- Workflows for deterministic processes; agents for open-ended tasks
- Always define `inputSchema` + `outputSchema`
- `.then()` sequential, `.parallel()` concurrent, `.branch()` conditional
- Register in Mastra instance for observability

## Security Rules
- NEVER pass raw user input as agent instructions — template safely
- Rate limit AI endpoints (KV, `cf-connecting-ip`)
- Log all interactions (structured logger)
- Audit trail for all AI operations

## Clean Architecture
- Agents/tools/workflows in `src/infrastructure/mastra/` (infrastructure layer)
- Business logic in service classes, NOT in tool execute functions
- Tools call services; services own the logic

## File Naming
- Agents: `src/infrastructure/mastra/agents/[name].ts`
- Tools: `src/infrastructure/mastra/tools/[name].ts`
- Workflows: `src/infrastructure/mastra/workflows/[name].ts`
- Instance: `src/infrastructure/mastra/index.ts`
