/** @nexus/sdk-simulation API contract — implementation owner: nexus-sdk */

export interface SimulationApi {
  createSession(config: SimulationSessionConfig): Promise<SimulationSession>
  runBehavior(sessionId: string, packageId: string, version: string): Promise<SimulationRunResult>
  getTelemetry(sessionId: string): AsyncIterable<SimulationTelemetry>
  destroySession(sessionId: string): Promise<void>
}

export interface SimulationSessionConfig {
  robotModel: string
  physicsProfile: string
  digitalTwinId?: string
}

export interface SimulationSession {
  sessionId: string
  status: 'ready' | 'running' | 'completed' | 'failed'
  createdAt: string
}

export interface SimulationRunResult {
  runId: string
  success: boolean
  logs: string[]
  metrics: Record<string, number>
}

export interface SimulationTelemetry {
  timestamp: string
  topic: string
  payload: Record<string, unknown>
}
