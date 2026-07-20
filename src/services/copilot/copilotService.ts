import { developerFetch } from '../developer/developerPortalService'

export type CopilotAssistantType =
  | 'unified'
  | 'command_center'
  | 'developer_copilot'
  | 'sponsor'
  | 'customer'
  | 'behavior'
  | 'sdk'
  | 'documentation'
  | 'marketplace'
  | 'manufacturing'
  | 'fleet'
  | 'atlas'

export async function fetchCopilotAssistants() {
  return developerFetch<{ assistants: Array<{ id: string; name: string }> }>('/v1/intelligence/assistants')
}

export async function copilotChat(
  organizationId: string,
  message: string,
  assistantType: CopilotAssistantType = 'unified',
  sessionId?: string,
) {
  return developerFetch<{ response: { content: string; citations?: Array<{ title: string; sourceId: string }> } }>(
    `/v1/organizations/${organizationId}/copilot/chat`,
    { method: 'POST', body: JSON.stringify({ message, assistantType, sessionId }) },
  )
}

export async function runCopilotAgent(
  organizationId: string,
  goal: string,
  assistantType: CopilotAssistantType = 'unified',
) {
  return developerFetch<{ result: { content: string; steps?: unknown[] } }>(
    `/v1/organizations/${organizationId}/copilot/agent/run`,
    { method: 'POST', body: JSON.stringify({ goal, assistantType }) },
  )
}

export async function fetchAutonomousWorkflows(organizationId: string) {
  return developerFetch<{ workflows: Array<{ key: string; name: string; assistantType: string }> }>(
    `/v1/organizations/${organizationId}/copilot/autonomous-workflows`,
  )
}

export async function runAutonomousWorkflow(
  organizationId: string,
  workflowKey: string,
  payload: Record<string, unknown>,
) {
  return developerFetch<{ result: { content: string; workflowKey: string; name: string } }>(
    `/v1/organizations/${organizationId}/copilot/autonomous/${encodeURIComponent(workflowKey)}/run`,
    { method: 'POST', body: JSON.stringify({ payload }) },
  )
}

export async function copilotMemory(
  organizationId: string,
  action: 'remember' | 'recall' | 'list',
  memoryKey?: string,
  value?: unknown,
) {
  return developerFetch<{ entry?: unknown; value?: unknown; entries?: unknown[] }>(
    `/v1/organizations/${organizationId}/copilot/memory`,
    { method: 'POST', body: JSON.stringify({ action, memoryKey, value }) },
  )
}

export async function parseCopilotCommand(organizationId: string, text: string) {
  return developerFetch<{ parsed: Record<string, unknown>; result?: { content: string } }>(
    `/v1/organizations/${organizationId}/copilot/commands`,
    { method: 'POST', body: JSON.stringify({ text }) },
  )
}

export async function fetchConversationHistory(organizationId: string) {
  return developerFetch<{ conversations: Array<{ id: string; title: string; assistantType: string; updatedAt: string }> }>(
    `/v1/organizations/${organizationId}/intelligence/conversations`,
  )
}
