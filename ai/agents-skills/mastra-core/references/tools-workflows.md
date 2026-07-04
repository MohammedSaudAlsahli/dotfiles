# Mastra Tools & Workflows Reference

## Tool with Request Context (tenant isolation)
```typescript
import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

export const dataTool = createTool({
  id: 'get-data',
  description: 'Gets data scoped to the current organization',
  inputSchema: z.object({
    table: z.enum(['projects', 'tasks', 'settings']).describe('Data type'),
    id: z.string().describe('Record ID'),
  }),
  requestContextSchema: z.object({
    userId: z.string(),
    orgId: z.string(), // MANDATORY for tenant isolation
  }),
  outputSchema: z.object({ data: z.record(z.unknown()) }),
  execute: async ({ context, requestContext }) => {
    try {
      // ALWAYS scope to orgId — D1 query via Drizzle
      const record = await db.query[context.table].findFirst({
        where: and(eq(t.id, context.id), eq(t.orgId, requestContext.orgId)),
      })
      if (!record) return { data: {}, error: 'Not found' }
      return { data: record }
    } catch {
      return { data: {}, error: 'Fetch failed' }
    }
  },
})
```

## Human-in-the-Loop Tool
```typescript
export const deleteAccountTool = createTool({
  id: 'delete-account',
  description: 'Permanently deletes a user account — requires confirmation',
  inputSchema: z.object({ userId: z.string(), reason: z.string() }),
  resumeSchema: z.object({ confirmed: z.boolean() }),
  execute: async ({ context, suspend }) => {
    const confirmation = await suspend({
      message: `Delete account ${context.userId}? This cannot be undone.`,
    })
    if (!confirmation.confirmed) return { success: false, message: 'Cancelled' }
    await db.deleteUser(context.userId)
    return { success: true, message: 'Account deleted' }
  },
})
```

## Workflow Patterns

### Sequential
```typescript
export const onboardingWorkflow = createWorkflow({
  id: 'onboarding',
  inputSchema: z.object({ email: z.string(), name: z.string() }),
  outputSchema: z.object({ success: z.boolean() }),
}).then(createUserStep).then(sendWelcomeEmailStep).then(setupDefaultsStep).commit()
```

### Branching
```typescript
export const ticketWorkflow = createWorkflow({ ... })
  .then(classifyStep)
  .branch([isBugFn, bugFixStep], [isFeatureFn, featureStep], [isQuestionFn, answerStep])
  .then(notifyStep)
  .commit()
```

### Parallel
```typescript
export const analysisWorkflow = createWorkflow({ ... })
  .then(fetchDataStep)
  .parallel([sentimentStep, categoryStep, urgencyStep])
  .then(combineStep)
  .commit()
```

### Running Workflows
```typescript
const workflow = mastra.getWorkflow('onboarding')
const run = await workflow.createRun()
// Wait for result
const result = await run.start({ inputData: { email: '...', name: '...' } })
// Or stream progress
const stream = await run.stream({ inputData: { ... } })
for await (const event of stream) console.log(event.type, event.payload)
```

## MCP Server
```typescript
import { MCPServer } from '@mastra/mcp'

export const mcpServer = new MCPServer({
  name: 'my-saas',
  version: '1.0.0',
  tools: { searchTool, dataTool },
})
```

## MCP Client (connect to external)
```typescript
import { MCPClient } from '@mastra/mcp'

const client = new MCPClient({
  servers: { github: { url: 'https://mcp.github.com/sse' } },
})
const tools = await client.getTools()
```
