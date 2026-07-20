/** @nexus/sdk-cloud API contract — implementation owner: nexus-sdk */

export interface CloudApi {
  authenticate(credentials: CloudCredentials): Promise<CloudSession>
  registerRobot(robot: RobotRegistration): Promise<RobotRegistrationResult>
  uploadTelemetry(batch: TelemetryBatch): Promise<void>
  requestOtaUpdate(request: OtaRequest): Promise<OtaJob>
}

export interface CloudCredentials {
  apiKey?: string
  oauthToken?: string
}

export interface CloudSession {
  token: string
  expiresAt: string
  organizationId: string
}

export interface RobotRegistration {
  serialNumber: string
  model: string
  firmwareVersion: string
}

export interface RobotRegistrationResult {
  robotId: string
  registryUrl: string
}

export interface TelemetryBatch {
  robotId: string
  events: { type: string; timestamp: string; data: Record<string, unknown> }[]
}

export interface OtaRequest {
  robotId: string
  packageId: string
  version: string
}

export interface OtaJob {
  jobId: string
  status: 'queued' | 'in_progress' | 'completed' | 'failed'
}
