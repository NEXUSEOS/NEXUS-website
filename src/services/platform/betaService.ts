import { getWebsiteIntegrationClient } from './integrationService'

const CLOUD_URL = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

export function getBetaClient(accessToken?: string, organizationId?: string) {
  return getWebsiteIntegrationClient(accessToken, organizationId)
}

export { CLOUD_URL }
