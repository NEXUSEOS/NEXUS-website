import { PipelineStage } from '../behavior/pipeline/stages'

/** Developer publishing flow — owner: nexus-marketplace */
export const publishingFlow = [
  { step: 1, action: 'Build package via nexus package', owner: 'nexus-sdk' },
  { step: 2, action: 'Validate and simulate locally', owner: 'nexus-sdk', stage: PipelineStage.VALIDATE },
  { step: 3, action: 'Submit via nexus publish', owner: 'nexus-sdk', stage: PipelineStage.MARKETPLACE },
  { step: 4, action: 'Security scan queue', owner: 'nexus-marketplace', stage: PipelineStage.SECURITY_SCAN },
  { step: 5, action: 'Compatibility verification', owner: 'nexus-marketplace', stage: PipelineStage.COMPATIBILITY_CHECK },
  { step: 6, action: 'Review and approval', owner: 'nexus-marketplace', stage: PipelineStage.REVIEW },
  { step: 7, action: 'Registry publish', owner: 'nexus-marketplace', stage: PipelineStage.APPROVAL },
  { step: 8, action: 'Analytics and update channel', owner: 'nexus-cloud', stage: PipelineStage.ANALYTICS },
] as const

export const reviewSystem = {
  modes: ['automated', 'manual', 'hybrid'] as const,
  criteria: [
    'Schema and layout validation passed',
    'Security scan clean or waived with approval',
    'Simulation profile succeeded',
    'Compatibility matrix satisfied',
    'License and permissions declared',
  ],
  sla: 'Architecture target: 48h manual review for public channel.',
} as const

export const updateSystem = {
  strategy: 'Semver with optional auto-update policies per fleet.',
  rollback: 'Previous version retained in registry for rollback.',
  notifications: 'Developers notified via portal and webhook.',
} as const

export const ratingsSystem = {
  scale: '1–5 stars per package version.',
  aggregation: 'Weighted average with verified-install badge for authenticated reviewers.',
  moderation: 'Flagged reviews enter marketplace moderation queue.',
} as const

export const reviewsSystem = {
  types: ['user', 'verified_developer', 'moderator'] as const,
  requirements: 'Published packages only; one review per user per major version.',
  linkage: 'Reviews tied to PackageReview and ReviewRecord for approval workflow.',
} as const

export const analyticsSystem = {
  metrics: ['installs', 'activeSessions', 'simulationRuns', 'errorRate'] as const,
  owner: 'nexus-cloud',
  export: 'Developer portal analytics and marketplace publisher dashboard.',
} as const

export const distributionSystem = {
  channels: ['public', 'organization', 'private'] as const,
  delivery: 'Signed artifacts via CDN with checksum verification on install.',
  policies: 'Organization channels require membership; private channels require explicit grant.',
} as const

export const uploadSystem = {
  entry: 'nexus publish submits PackageUploadRequest to marketplace API.',
  validation: 'Schema, security scan, and compatibility must pass before review queue.',
  artifact: '.nexus-behavior archive with behavior.json manifest and checksum.',
} as const

export const compatibilityChecks = {
  robotModel: 'Package robotCompatibility must intersect target robot model.',
  sdkVersion: 'sdkMinimum must be <= installed SDK version.',
  runtimeVersion: 'runtimeMinimum must be <= nexus-os version when installing on hardware.',
  dependencies: 'All behavior dependencies resolved in registry.',
} as const
