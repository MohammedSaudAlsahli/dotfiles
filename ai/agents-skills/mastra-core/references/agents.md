# Mastra Agents Reference

## Agent Creation
```typescript
import { Agent } from '@mastra/core/agent'

export const myAgent = new Agent({
  id: 'my-agent',
  name: 'My Agent',
  description: 'Required for multi-agent routing',
  instructions: `You are a specialist in...`,
  model: 'anthropic/claude-sonnet-4-20250514',
  tools: { toolA, toolB },
  enableMemory: true,
})
```

## Model Options
```typescript
// Anthropic
'anthropic/claude-sonnet-4-20250514'
'anthropic/claude-opus-4-20250514'
'anthropic/claude-haiku-4-5-20251001'
// Via AI SDK provider
import { createAnthropic } from '@ai-sdk/anthropic'
const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
model: { provider: anthropic, name: 'claude-sonnet-4-20250514' }
```

## Memory
```typescript
import { Memory } from '@mastra/memory'
import { LibSQLStore } from '@mastra/libsql'

const memory = new Memory({
  storage: new LibSQLStore({ id: 'app-memory', url: process.env.DATABASE_URL! }),
})

const response = await agent.generate('Hello', {
  threadId: 'thread-123',
  resourceId: 'user-456',
})
```

## Structured Output
```typescript
const response = await myAgent.generate('Create a task for...', {
  structuredOutput: {
    schema: z.object({
      title: z.string(),
      priority: z.enum(['low', 'medium', 'high']),
    }),
  },
})
// response.object is typed
```

## Multi-Agent: Supervisor Pattern (recommended)
```typescript
export const supervisorAgent = new Agent({
  id: 'supervisor',
  name: 'Supervisor',
  instructions: `You coordinate specialized agents...`,
  model: 'anthropic/claude-sonnet-4-20250514',
  agents: { researcher: researchAgent, writer: writerAgent },
  memory: new Memory({ storage: new LibSQLStore({ ... }) }),
})

// Each subagent MUST have description
export const researchAgent = new Agent({
  id: 'researcher',
  description: 'Searches databases and APIs for information',
  // ...
})
```

## Calling Agents
```typescript
// Complete response
const response = await agent.generate('Help me with...')
console.log(response.text, response.toolCalls, response.usage)

// Streaming
const stream = await agent.stream('Help me with...')
for await (const chunk of stream.textStream) process.stdout.write(chunk)

// In Next.js route
const stream = await agent.stream(messages)
return stream.toDataStreamResponse()
```

## Evals
```typescript
import { evaluate } from '@mastra/evals'

const results = await evaluate({
  agent: myAgent,
  testCases: [
    { input: 'What plan am I on?', rubric: 'Should return plan name' },
    { input: 'Delete everything', rubric: 'Must ask for confirmation' },
  ],
  metrics: ['relevance', 'faithfulness', 'completeness'],
})
```
