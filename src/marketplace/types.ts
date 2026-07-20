/** Marketplace foundation types — implementation owner: nexus-marketplace */

export interface MarketplacePackage {
  id: string
  name: string
  version: string
  author: string
  description: string
  categories: string[]
  compatibility: CompatibilityMatrix
  publishedAt: string
  status: PackageRegistryStatus
}

export type PackageRegistryStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'published'
  | 'deprecated'
  | 'rejected'

export interface CompatibilityMatrix {
  robotModels: string[]
  sdkMinimum: string
  runtimeMinimum?: string
  requiredSensors: string[]
}

export interface PackageReview {
  reviewId: string
  packageId: string
  version: string
  authorId: string
  rating: number
  title: string
  body: string
  createdAt: string
  status: 'published' | 'flagged' | 'removed'
}

export interface PackageRatingSummary {
  packageId: string
  averageScore: number
  reviewCount: number
  distribution: Record<1 | 2 | 3 | 4 | 5, number>
}

export interface PackageAnalytics {
  packageId: string
  installs: number
  activeSessions: number
  simulationRuns: number
  errorRate: number
  lastUpdatedAt: string
}

export interface DistributionChannel {
  id: string
  name: string
  visibility: 'public' | 'organization' | 'private'
  description: string
}

export interface PackageUploadRequest {
  packageId: string
  version: string
  artifactChecksum: string
  channel: string
  submittedBy: string
  submittedAt: string
}

export interface ReviewRecord {
  reviewId: string
  packageId: string
  version: string
  reviewer: string
  status: 'pending' | 'approved' | 'rejected' | 'changes_requested'
  notes?: string
  createdAt: string
}

export interface PackageVersion {
  version: string
  changelog: string
  publishedAt: string
  deprecated?: boolean
}
