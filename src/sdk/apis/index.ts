export type { BehaviorApi, CreateBehaviorPayload, BehaviorRecord, ValidationReport, PackageArtifact, PublishResult, InstallTarget, InstallResult, UpdateResult } from './behavior'
export type { MotionApi, TrajectoryRequest, Waypoint, MotionConstraints, TrajectoryPlan, MotionContext, MotionResult, MotionCapabilities } from './motion'
export type { VisionApi, CameraConfig, VisionStream, InferenceRequest, BoundingBox, InferenceResult } from './vision'
export type { AiApi, PlanningRequest, PlanningResult, SpeechRequest, SpeechResult, ListenConfig, ListenSession, MemoryEntry, MemoryQuery } from './ai'
export type { SimulationApi, SimulationSessionConfig, SimulationSession, SimulationRunResult, SimulationTelemetry } from './simulation'
export type { CloudApi, CloudCredentials, CloudSession, RobotRegistration, RobotRegistrationResult, TelemetryBatch, OtaRequest, OtaJob } from './cloud'
export type { FleetApi, FleetRobot, FleetDeployment, DeploymentJob, DeploymentStatus, RollbackResult } from './fleet'

export const sdkApiModules = [
  { id: 'behavior', package: '@nexus/sdk-behavior', owner: 'nexus-sdk' },
  { id: 'motion', package: '@nexus/sdk-motion', owner: 'nexus-sdk' },
  { id: 'vision', package: '@nexus/sdk-vision', owner: 'nexus-sdk' },
  { id: 'ai', package: '@nexus/sdk-ai', owner: 'nexus-sdk' },
  { id: 'simulation', package: '@nexus/sdk-simulation', owner: 'nexus-sdk' },
  { id: 'cloud', package: '@nexus/sdk-cloud', owner: 'nexus-sdk' },
  { id: 'fleet', package: '@nexus/sdk-fleet', owner: 'nexus-sdk' },
] as const
