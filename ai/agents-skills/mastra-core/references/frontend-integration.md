# Frontend Integration Reference

## assistant-ui for AI Chat (NOT raw useChat)

### Setup
```bash
pnpm add @assistant-ui/react @assistant-ui/react-ai-sdk
```

### Basic Chat with assistant-ui + Mastra
```typescript
'use client'
import { AssistantRuntimeProvider, Thread } from '@assistant-ui/react'
import { useVercelUseChat } from '@assistant-ui/react-ai-sdk'
import { useChat } from 'ai/react'
import '@assistant-ui/react/styles/index.css'

export function AIChatPanel() {
  const chat = useChat({ api: '/api/chat' })
  const runtime = useVercelUseChat(chat)

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
    </AssistantRuntimeProvider>
  )
}
```

### Customized Thread with Suggestions
```typescript
'use client'
import {
  Thread, ThreadWelcome, Composer,
  AssistantMessage, UserMessage,
} from '@assistant-ui/react'

export function CustomChat() {
  return (
    <Thread>
      <ThreadWelcome>
        <ThreadWelcome.Center>
          <h2 className="text-xl font-semibold">How can I help?</h2>
        </ThreadWelcome.Center>
        <ThreadWelcome.Suggestions>
          <ThreadWelcome.Suggestion prompt="Show my dashboard" />
          <ThreadWelcome.Suggestion prompt="What's my plan?" />
          <ThreadWelcome.Suggestion prompt="Create a new project" />
        </ThreadWelcome.Suggestions>
      </ThreadWelcome>
      <Thread.Messages />
      <Composer />
    </Thread>
  )
}
```

### Tool UI (Generative UI)
```typescript
import { makeAssistantToolUI } from '@assistant-ui/react'

const WeatherToolUI = makeAssistantToolUI({
  toolName: 'get_weather',
  render: ({ args, result, status }) => {
    if (status === 'running') return <WeatherSkeleton />
    return <WeatherCard location={args.location} weather={result} />
  },
})

// Register in thread:
<Thread assistantMessage={{ components: { ToolFallback: WeatherToolUI } }} />
```

### Human-in-the-Loop (approval in chat)
```typescript
const ApprovalToolUI = makeAssistantToolUI({
  toolName: 'delete_project',
  render: ({ args, status, addResult }) => {
    if (status !== 'requires-action') return null
    return (
      <div className="rounded-lg border p-4">
        <p>Delete project "{args.name}"? This cannot be undone.</p>
        <div className="mt-3 flex gap-2">
          <button onClick={() => addResult({ confirmed: true })}>Confirm</button>
          <button onClick={() => addResult({ confirmed: false })}>Cancel</button>
        </div>
      </div>
    )
  },
})
```

## AI SDK — ALWAYS CHECK LATEST DOCS
```
Previous → Current (field names change between versions):
- isLoading → status ('streaming' | 'submitted' | 'ready' | 'error')
- content → parts (array of typed blocks)
- maxTokens → maxOutputTokens
```

## Chat API Route with Auth + Tenant Isolation
```typescript
// src/app/api/chat/route.ts
import { mastra } from '@/infrastructure/mastra'
import { requireAuth } from '@/infrastructure/auth/guard'

export async function POST(req: Request) {
  const session = await requireAuth()
  const { messages } = await req.json()
  const agent = mastra.getAgentById('assistant')

  const stream = await agent.stream(messages, {
    threadId: `user-${session.user.id}`,
    resourceId: session.user.id,
    requestContext: {
      userId: session.user.id,
      orgId: session.user.orgId, // MANDATORY — tenant isolation in tools
    },
  })
  return stream.toDataStreamResponse()
}
```

## Error Handling
- Network → "Connection lost. Retrying..." + auto-retry
- Rate limit → "Limit reached. Try in X minutes." (Retry-After)
- Agent error → "Something went wrong. Try rephrasing."
- Never show raw errors or stack traces

## RTL Chat (Arabic)
- assistant-ui supports RTL via CSS
- Messages layout flips in `dir="rtl"`
- Test with Arabic locale
