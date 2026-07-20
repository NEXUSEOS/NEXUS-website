/** @nexus/sdk-ai API contract — implementation owner: nexus-sdk */

export interface AiApi {
  plan(request: PlanningRequest): Promise<PlanningResult>
  speak(request: SpeechRequest): Promise<SpeechResult>
  listen(config: ListenConfig): Promise<ListenSession>
  remember(entry: MemoryEntry): Promise<void>
  recall(query: MemoryQuery): Promise<MemoryEntry[]>
}

export interface PlanningRequest {
  goal: string
  context: Record<string, unknown>
  constraints?: string[]
}

export interface PlanningResult {
  steps: string[]
  confidence: number
}

export interface SpeechRequest {
  text: string
  voiceId?: string
}

export interface SpeechResult {
  audioUrl?: string
  durationMs: number
}

export interface ListenConfig {
  language: string
  timeoutMs?: number
}

export interface ListenSession {
  sessionId: string
}

export interface MemoryEntry {
  id: string
  content: string
  tags: string[]
  createdAt: string
}

export interface MemoryQuery {
  tags?: string[]
  limit?: number
}
