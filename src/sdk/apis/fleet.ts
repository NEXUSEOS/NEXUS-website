/** @nexus/sdk-fleet API contract — implementation owner: nexus-sdk */

export interface FleetApi {
  listRobots(fleetId: string): Promise<FleetRobot[]>
  deployBehavior(deployment: FleetDeployment): Promise<DeploymentJob>
  getDeploymentStatus(jobId: string): Promise<DeploymentStatus>
  rollback(deploymentId: string): Promise<RollbackResult>
}

export interface FleetRobot {
  robotId: string
  model: string
  status: 'online' | 'offline' | 'maintenance'
  installedBehaviors: { id: string; version: string }[]
}

export interface FleetDeployment {
  fleetId: string
  packageId: string
  version: string
  targetRobotIds?: string[]
}

export interface DeploymentJob {
  jobId: string
  queuedAt: string
}

export interface DeploymentStatus {
  jobId: string
  progress: number
  succeeded: string[]
  failed: { robotId: string; reason: string }[]
}

export interface RollbackResult {
  deploymentId: string
  restoredVersion: string
}
