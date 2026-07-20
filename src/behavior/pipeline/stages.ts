/** Behavior distribution pipeline — architecture specification (no runtime execution). */

export const PipelineStage = {
  CREATE: 'create',
  VALIDATE: 'validate',
  SECURITY_SCAN: 'security_scan',
  SIMULATE: 'simulate',
  COMPATIBILITY_CHECK: 'compatibility_check',
  REVIEW: 'review',
  APPROVAL: 'approval',
  MARKETPLACE: 'marketplace',
  ROBOT_INSTALLATION: 'robot_installation',
  ANALYTICS: 'analytics',
  UPDATES: 'updates',
} as const

export type PipelineStage = (typeof PipelineStage)[keyof typeof PipelineStage]

export interface PipelineStageDefinition {
  id: PipelineStage
  label: string
  owner: string
  description: string
}

/** Ordered behavior pipeline from developer creation to fleet updates. */
export const behaviorPipeline: PipelineStageDefinition[] = [
  {
    id: PipelineStage.CREATE,
    label: 'Create Behavior',
    owner: 'nexus-studio / nexus-website',
    description: 'Author behavior metadata and package contents.',
  },
  {
    id: PipelineStage.VALIDATE,
    label: 'Validate',
    owner: 'nexus-sdk',
    description: 'Validate behavior.json schema, layout, and dependencies.',
  },
  {
    id: PipelineStage.SECURITY_SCAN,
    label: 'Security Scan',
    owner: 'nexus-marketplace',
    description: 'Static analysis and permission audit before publish.',
  },
  {
    id: PipelineStage.SIMULATE,
    label: 'Simulation',
    owner: 'nexus-sdk',
    description: 'Run simulation profile via Digital Twin interfaces — no hardware.',
  },
  {
    id: PipelineStage.COMPATIBILITY_CHECK,
    label: 'Compatibility Check',
    owner: 'nexus-sdk',
    description: 'Verify robot, sensor, SDK, and runtime version compatibility.',
  },
  {
    id: PipelineStage.REVIEW,
    label: 'Review',
    owner: 'nexus-marketplace',
    description: 'Human or automated review queue for marketplace submission.',
  },
  {
    id: PipelineStage.APPROVAL,
    label: 'Approval',
    owner: 'nexus-marketplace',
    description: 'Approve package for public or org-scoped distribution.',
  },
  {
    id: PipelineStage.MARKETPLACE,
    label: 'Marketplace Release',
    owner: 'nexus-marketplace',
    description: 'Publish to package registry with version management.',
  },
  {
    id: PipelineStage.ROBOT_INSTALLATION,
    label: 'Installation',
    owner: 'nexus-os',
    description: 'OTA install on physical robots — deferred; architecture reference only.',
  },
  {
    id: PipelineStage.UPDATES,
    label: 'Updates',
    owner: 'nexus-marketplace',
    description: 'Semver updates with compatibility and rollback support.',
  },
  {
    id: PipelineStage.ANALYTICS,
    label: 'Analytics',
    owner: 'nexus-cloud',
    description: 'Track installs, usage, and errors across fleet.',
  },
]

export function getPipelineStage(id: PipelineStage): PipelineStageDefinition | undefined {
  return behaviorPipeline.find((stage) => stage.id === id)
}
