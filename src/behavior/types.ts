/** Behavior Workspace types — architecture foundation; no robot execution. */

export const BehaviorStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const

export type BehaviorStatus = (typeof BehaviorStatus)[keyof typeof BehaviorStatus]

export const SafetyLevel = {
  MONITOR: 'monitor',
  SUPERVISED: 'supervised',
  AUTONOMOUS: 'autonomous',
  RESTRICTED: 'restricted',
} as const

export type SafetyLevel = (typeof SafetyLevel)[keyof typeof SafetyLevel]

export interface BehaviorMetadata {
  behaviorId: string
  name: string
  version: string
  author: string
  description: string
  robotCompatibility: string[]
  requiredSensors: string[]
  requiredHardware: string[]
  requiredAiModels: string[]
  /** Spec alias — mirrors requiredAiModels. */
  aiModels: string[]
  motionDependencies: string[]
  /** Spec alias — mirrors motionDependencies. */
  motionPacks: string[]
  /** Package and behavior dependencies. */
  dependencies: string[]
  permissions: string[]
  safetyLevel: SafetyLevel
  categories: string[]
  tags: string[]
  license: string
  status: BehaviorStatus
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface BehaviorDraftPayload {
  name: string
  description: string
  robotCompatibility?: string[]
  requiredSensors?: string[]
  requiredHardware?: string[]
  requiredAiModels?: string[]
  aiModels?: string[]
  motionDependencies?: string[]
  motionPacks?: string[]
  dependencies?: string[]
  permissions?: string[]
  safetyLevel?: SafetyLevel
  categories?: string[]
  tags?: string[]
  license?: string
}

export interface BehaviorVersion {
  version: string
  behaviorId: string
  createdAt: string
  status: BehaviorStatus
  changelog?: string
}
