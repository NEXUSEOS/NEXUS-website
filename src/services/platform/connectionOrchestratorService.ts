import { EPIC_PLATFORM_SERVICES } from '../../config/platformServices'
import { cloudFetch, CloudApiError, getAccessToken } from './cloudApiClient'

export type ConnectionRow = {
  serviceId: string
  service: string
  serviceName?: string
  name?: string
  category: string
  status: string
  health?: string
  healthScore?: number
  owner?: string
  version?: string
  latencyMs?: number | null
  missingSecrets: string[]
  configuredSecrets?: string[] | number
  dependencies?: string[]
  requiredFeatures?: string[]
  blockedFeatures?: string[]
  recoveryActions?: string[]
  lastValidation?: string | null
  lastFailure?: string | null
  lastFailureReason?: string | null
  diagnostics?: Array<{ name?: string; passed?: boolean; message?: string }>
  optional?: boolean
}

export type HealthMatrixResponse = {
  generatedAt: string
  environment: string
  connections: ConnectionRow[]
  summary: { total?: number; connected?: number; healthy?: number; degraded?: number; failed?: number; percent?: number }
}

function buildLocalFallback(): HealthMatrixResponse {
  const hasSupabase = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
  const hasCloud = Boolean(import.meta.env.VITE_NEXUS_CLOUD_URL)

  const connections: ConnectionRow[] = EPIC_PLATFORM_SERVICES.filter((s) => s.connectionId).map((svc) => {
    let status = 'not_configured'
    if (svc.connectionId === 'supabase' && hasSupabase) status = 'configuration_required'
    if (svc.connectionId === 'website') status = hasSupabase && hasCloud ? 'configuration_required' : 'not_configured'
    if (svc.connectionId === 'cloud-api' && hasCloud) status = 'configuration_required'

    return {
      serviceId: svc.connectionId!,
      service: svc.name,
      serviceName: svc.name,
      name: svc.name,
      category: svc.category,
      status,
      health: status === 'not_configured' ? 'unknown' : 'degraded',
      healthScore: status === 'not_configured' ? 0 : 25,
      owner: svc.owner,
      missingSecrets: status === 'not_configured' ? ['Connect in Setup Wizard'] : ['Sign in as platform admin'],
      dependencies: [],
      recoveryActions: ['connect', 'validate'],
      lastValidation: null,
      optional: false,
    }
  })

  return {
    generatedAt: new Date().toISOString(),
    environment: import.meta.env.MODE,
    connections,
    summary: {
      total: connections.length,
      connected: 0,
      healthy: 0,
      degraded: connections.filter((c) => c.status === 'configuration_required').length,
      failed: connections.filter((c) => c.status === 'not_configured').length,
      percent: 0,
    },
  }
}

export async function fetchConnectionDashboard(): Promise<{ rows: ConnectionRow[]; environment: string; generatedAt: string }> {
  try {
    return await cloudFetch('/v1/connections/dashboard')
  } catch (err) {
    if (err instanceof CloudApiError && (err.code === 'unreachable' || err.code === 'unauthorized')) {
      const fallback = buildLocalFallback()
      return { rows: fallback.connections, environment: fallback.environment, generatedAt: fallback.generatedAt }
    }
    throw err
  }
}

export async function fetchConnectionHealthMatrix(): Promise<HealthMatrixResponse> {
  try {
    return await cloudFetch<HealthMatrixResponse>('/v1/connections/health-matrix')
  } catch (err) {
    if (err instanceof CloudApiError && (err.code === 'unreachable' || err.code === 'unauthorized')) {
      return buildLocalFallback()
    }
    throw err
  }
}

export async function fetchConnectionCenter(): Promise<Record<string, unknown>> {
  try {
    return await cloudFetch('/v1/connections/connection-center')
  } catch (err) {
    if (err instanceof CloudApiError && (err.code === 'unreachable' || err.code === 'unauthorized')) {
      const matrix = buildLocalFallback()
      return {
        generatedAt: matrix.generatedAt,
        degraded: true,
        message: 'Cloud API not configured — showing local service catalog',
        healthMatrix: matrix,
        setupPath: '/admin/setup',
      }
    }
    throw err
  }
}

export async function validateConnectionService(serviceId: string) {
  if (!getAccessToken()) throw new CloudApiError('Sign in as platform admin to validate connections', 401, 'unauthorized')
  return cloudFetch(`/v1/connections/${serviceId}/validate`, { method: 'POST' })
}

export async function repairConnectionService(serviceId: string) {
  if (!getAccessToken()) throw new CloudApiError('Sign in as platform admin to repair connections', 401, 'unauthorized')
  return cloudFetch(`/v1/connections/${serviceId}/repair`, { method: 'POST' })
}

export async function reconnectConnectionService(serviceId: string) {
  if (!getAccessToken()) throw new CloudApiError('Sign in as platform admin to reconnect', 401, 'unauthorized')
  return cloudFetch(`/v1/connections/${serviceId}/reconnect`, { method: 'POST' })
}

export async function fetchConnectionDiagnostics(serviceId: string) {
  if (!getAccessToken()) throw new CloudApiError('Sign in as platform admin for diagnostics', 401, 'unauthorized')
  return cloudFetch(`/v1/connections/${serviceId}/diagnostics`)
}

export async function fetchValidationHistory(serviceId: string) {
  if (!getAccessToken()) throw new CloudApiError('Sign in as platform admin for validation history', 401, 'unauthorized')
  return cloudFetch<{ logs: unknown[] }>(`/v1/connections/${serviceId}/validation-history`)
}

export async function validateAllConnections() {
  if (!getAccessToken()) throw new CloudApiError('Sign in as platform admin to validate all', 401, 'unauthorized')
  return cloudFetch('/v1/connections/validate-all', { method: 'POST' })
}
