# Mastra Core Skill

> Deep reference for building AI agents, tools, workflows, and multi-agent systems with Mastra on Cloudflare Workers + D1.

## When to Load
Load when working on `src/infrastructure/mastra/` — agents, tools, workflows, instance config, AI chat routes, or frontend streaming components.

## References
- `references/agents.md` — Agent patterns, multi-agent, memory, structured output
- `references/tools-workflows.md` — Tool creation, workflow orchestration, MCP
- `references/frontend-integration.md` — AI SDK (latest), streaming, chat components

## Quick Reference

### Mastra Instance
```typescript
import { Mastra } from '@mastra/core/mastra'
import { assistantAgent } from './agents/assistant'
import { onboardingWorkflow } from './workflows/onboarding'

export const mastra = new Mastra({
  agents: { assistantAgent },
  workflows: { onboardingWorkflow },
})
```

### Agent with Tenant-Scoped Tools
```typescript
import { Agent } from '@mastra/core/agent'

export const assistantAgent = new Agent({
  id: 'assistant',
  name: 'SaaS Assistant',
  description: 'Helps users with account and feature questions',
  instructions: `You are a helpful assistant for our SaaS platform...`,
  model: 'anthropic/claude-sonnet-4-20250514',
  tools: { searchTool, userDataTool },
  enableMemory: true,
})
```

### Tool with orgId Isolation (MANDATORY)
```typescript
import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

export const myTool = createTool({
  id: 'my-tool',
  description: 'Clear description for the LLM',
  inputSchema: z.object({
    query: z.string().describe('What to search for'),
  }),
  requestContextSchema: z.object({
    userId: z.string(),
    orgId: z.string(), // ALWAYS include for tenant isolation
  }),
  outputSchema: z.object({ results: z.array(z.string()) }),
  execute: async ({ context, requestContext }) => {
    try {
      // ALWAYS scope to orgId
      return { results: await search(context.query, requestContext.orgId) }
    } catch {
      return { results: [] }
    }
  },
})
```

### Workflow
```typescript
import { createWorkflow, createStep } from '@mastra/core/workflows'
import { z } from 'zod'

const step = createStep({
  id: 'process',
  inputSchema: z.object({ data: z.string() }),
  outputSchema: z.object({ result: z.string() }),
  execute: async ({ inputData }) => ({ result: inputData.data.toUpperCase() }),
})

export const myWorkflow = createWorkflow({
  id: 'my-workflow',
  inputSchema: z.object({ data: z.string() }),
  outputSchema: z.object({ result: z.string() }),
}).then(step).commit()
```

### Chat API Route (AI SDK (latest))
```typescript
// src/app/api/chat/route.ts
export async function POST(req: Request) {
  const session = await requireAuth()
  const { messages } = await req.json()
  const agent = mastra.getAgentById('assistant')
  const stream = await agent.stream(messages, {
    threadId: `user-${session.user.id}`,
    resourceId: session.user.id,
    requestContext: { userId: session.user.id, orgId: session.user.orgId },
  })
  return stream.toDataStreamResponse()
}
```

### Frontend (AI SDK (latest): `status` NOT `isLoading`)
```typescript
'use client'
import { useChat } from 'ai/react'

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({ api: '/api/chat' })
  const isLoading = status === 'streaming' || status === 'submitted'
  // render chat UI
}
```

## Key Principles
1. Agents for open-ended tasks, workflows for deterministic processes
2. Tools are the bridge — agents use tools to interact with the world
3. Every tool MUST include `orgId` in requestContext for tenant isolation
4. Memory for conversations — thread-based with semantic recall
5. MCP for integrations — expose/consume tools via Model Context Protocol
6. Evals for quality — accuracy, safety, faithfulness
7. AI SDK (latest): `status`, `parts`, `maxOutputTokens` (not `isLoading`, `content`, `maxTokens`)
