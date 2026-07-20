export interface PlatformClientConfig {
  cloudBaseUrl: string
  accessToken?: string
  organizationId?: string
}

export interface PlatformClient {
  resolveFeatureFlags(context?: {
    organizationId?: string
    role?: string
    environment?: string
    releaseChannel?: string
  }): Promise<Record<string, boolean>>
  search(query: string, resourceType?: string): Promise<Array<{
    id: string
    resourceType: string
    resourceId: string
    title: string
    excerpt?: string | null
    url?: string | null
  }>>
  getHealth(): Promise<{
    status: string
    database: string
    cmsPages: number
    platformEvents: number
    searchDocuments: number
    userProfiles: number
    checkedAt: string
  }>
}

export function createPlatformClient(_config: PlatformClientConfig): PlatformClient {
  return {
    async resolveFeatureFlags() {
      return {}
    },
    async search() {
      return []
    },
    async getHealth() {
      return {
        status: 'ok',
        database: 'ok',
        cmsPages: 0,
        platformEvents: 0,
        searchDocuments: 0,
        userProfiles: 0,
        checkedAt: new Date().toISOString(),
      }
    },
  }
}
