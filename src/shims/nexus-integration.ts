export const ECOSYSTEM_REPOS = {
  website: {
    id: 'nexus-website',
    role: 'Public gateway, documentation, developer portal',
    packages: ['nexus-website'],
    consumes: ['@nexus/theme', '@nexus/ui', '@nexus/auth', '@nexus/analytics', '@nexus/integration'],
  },
  platform: {
    id: 'nexus-platform',
    role: 'Shared packages',
    packages: ['@nexus/auth', '@nexus/ui', '@nexus/theme', '@nexus/integration', '@nexus/platform'],
    consumes: [],
  },
} as const

export type EcosystemRepoId = keyof typeof ECOSYSTEM_REPOS

export const INTEGRATION_FEATURES = [
  'unified_login',
  'organization_switching',
  'project_sync',
  'sdk_downloads',
  'update_center',
  'platform_health',
] as const

export type IntegrationFeature = (typeof INTEGRATION_FEATURES)[number]

export type ReleaseChannel = 'stable' | 'beta' | 'alpha' | 'nightly'

export const RELEASE_CHANNELS: ReleaseChannel[] = ['stable', 'beta', 'alpha', 'nightly']

export type BetaApplicationStatus = 'pending' | 'approved' | 'rejected' | 'waitlisted'

export interface BetaApplication {
  id: string
  userId: string
  email: string
  organizationName: string
  useCase: string
  status: BetaApplicationStatus
  createdAt: string
}

export interface DeveloperInvitation {
  id: string
  email: string
  organizationId: string
  role: string
  status: 'pending' | 'accepted' | 'expired'
  expiresAt: string
  createdAt: string
}

export interface FeedbackItem {
  id: string
  userId?: string
  organizationId?: string
  category: 'general' | 'feature' | 'ux' | 'docs'
  message: string
  rating?: number
  status: 'new' | 'reviewed' | 'resolved'
  createdAt: string
}

export interface BugReport {
  id: string
  userId?: string
  source: 'website' | 'studio' | 'sdk' | 'os'
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'triaged' | 'fixed' | 'closed'
  createdAt: string
}

export interface CrashEvent {
  id: string
  source: 'studio' | 'os'
  fingerprint: string
  message: string
  stack?: string
  version: string
  platform: string
  count: number
  firstSeenAt: string
  lastSeenAt: string
}

export interface BetaDashboardSummary {
  applicationStatus?: BetaApplicationStatus
  pendingInvitations: number
  openBugReports: number
  crashCount24h: number
  feedbackCount: number
  preferredChannel: ReleaseChannel
}

export interface SponsorDashboardSummary {
  status: 'pending' | 'active' | 'inactive'
  tier: string
  benefits: string[]
  pendingApplications: number
}

export interface PlatformIntegrationConfig {
  cloudBaseUrl: string
  accessToken?: string
  organizationId?: string
}

export interface PlatformIntegrationClient {
  getBetaDashboard(organizationId: string): Promise<BetaDashboardSummary>
  submitBetaApplication(request: {
    email: string
    organizationName: string
    useCase: string
  }): Promise<BetaApplication>
  getBetaApplication(userId: string): Promise<BetaApplication | null>
  listInvitations(organizationId: string): Promise<DeveloperInvitation[]>
  createInvitation(request: {
    organizationId: string
    email: string
    role?: string
  }): Promise<DeveloperInvitation>
  submitFeedback(request: {
    organizationId?: string
    category: FeedbackItem['category']
    message: string
    rating?: number
  }): Promise<FeedbackItem>
  listFeedback(organizationId?: string): Promise<FeedbackItem[]>
  submitBugReport(request: {
    source: BugReport['source']
    title: string
    description: string
    severity: BugReport['severity']
  }): Promise<BugReport>
  listBugReports(organizationId?: string): Promise<BugReport[]>
  listCrashes(source?: CrashEvent['source']): Promise<CrashEvent[]>
  getSponsorDashboard(organizationId: string): Promise<SponsorDashboardSummary>
  listReleaseChannels(product?: string): Promise<Array<{ product: string; channel: ReleaseChannel; version: string }>>
  getEcosystemStatus(): Promise<{ repos: string[]; features: string[]; cloudVersion: string }>
  listSdkDownloads(version?: string): Promise<unknown[]>
  listUpdates(product?: 'website' | 'studio' | 'sdk' | 'os'): Promise<unknown[]>
}

function createEmptyIntegrationClient(): PlatformIntegrationClient {
  return {
    async getBetaDashboard() {
      return {
        pendingInvitations: 0,
        openBugReports: 0,
        crashCount24h: 0,
        feedbackCount: 0,
        preferredChannel: 'stable',
      }
    },
    async submitBetaApplication(request) {
      return {
        id: 'beta-local',
        userId: 'local',
        email: request.email,
        organizationName: request.organizationName,
        useCase: request.useCase,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
    },
    async getBetaApplication() {
      return null
    },
    async listInvitations() {
      return []
    },
    async createInvitation(request) {
      return {
        id: 'invite-local',
        email: request.email,
        organizationId: request.organizationId,
        role: request.role ?? 'developer',
        status: 'pending',
        expiresAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }
    },
    async submitFeedback(request) {
      return {
        id: 'feedback-local',
        category: request.category,
        message: request.message,
        rating: request.rating,
        status: 'new',
        createdAt: new Date().toISOString(),
      }
    },
    async listFeedback() {
      return []
    },
    async submitBugReport(request) {
      return {
        id: 'bug-local',
        source: request.source,
        title: request.title,
        description: request.description,
        severity: request.severity,
        status: 'open',
        createdAt: new Date().toISOString(),
      }
    },
    async listBugReports() {
      return []
    },
    async listCrashes() {
      return []
    },
    async getSponsorDashboard() {
      return { status: 'active', tier: 'Partner', benefits: [], pendingApplications: 0 }
    },
    async listReleaseChannels() {
      return []
    },
    async getEcosystemStatus() {
      return { repos: [], features: [...INTEGRATION_FEATURES], cloudVersion: '0.0.0' }
    },
    async listSdkDownloads() {
      return []
    },
    async listUpdates() {
      return []
    },
  }
}

export function createPlatformIntegrationClient(_config: PlatformIntegrationConfig): PlatformIntegrationClient {
  return createEmptyIntegrationClient()
}

export function createStubIntegrationClient(_options?: { organizationId?: string }): PlatformIntegrationClient {
  return createEmptyIntegrationClient()
}
