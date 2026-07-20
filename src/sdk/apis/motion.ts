/** @nexus/sdk-motion API contract — implementation owner: nexus-sdk */

export interface MotionApi {
  planTrajectory(request: TrajectoryRequest): Promise<TrajectoryPlan>
  executeMotion(planId: string, context: MotionContext): Promise<MotionResult>
  getCapabilities(robotModel: string): Promise<MotionCapabilities>
}

export interface TrajectoryRequest {
  robotModel: string
  waypoints: Waypoint[]
  constraints?: MotionConstraints
}

export interface Waypoint {
  jointId: string
  position: number
  durationMs?: number
}

export interface MotionConstraints {
  maxVelocity?: number
  maxAcceleration?: number
}

export interface TrajectoryPlan {
  planId: string
  estimatedDurationMs: number
}

export interface MotionContext {
  sessionId: string
  mode: 'simulation' | 'supervised' | 'autonomous'
}

export interface MotionResult {
  success: boolean
  completedAt: string
  diagnostics?: string[]
}

export interface MotionCapabilities {
  dof: number
  supportedPrimitives: string[]
}
