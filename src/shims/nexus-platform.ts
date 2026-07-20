import type { PlatformIntegrationClient } from './nexus-integration'
import { createStubIntegrationClient } from './nexus-integration'

export interface PlatformLayer {
  integration: PlatformIntegrationClient
  initialize(config?: { cloudBaseUrl?: string; organizationId?: string }): Promise<void>
}

export function createPlatformLayer(): PlatformLayer {
  let integration = createStubIntegrationClient()

  return {
    get integration() {
      return integration
    },
    async initialize(config) {
      integration = createStubIntegrationClient({ organizationId: config?.organizationId })
    },
  }
}
