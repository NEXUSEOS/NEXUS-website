import { cloudFetch, CloudApiError } from './cloudApiClient'
import { buildMissionControlFallbackHomepage } from './missionControlFallback'

async function missionFetch<T>(path: string, init?: RequestInit): Promise<T> {
  return cloudFetch<T>(`/v1/mission-control${path}`, init)
}

export async function fetchMissionControlDashboard() {
  return missionFetch<{ dashboard: Record<string, unknown> }>('/dashboard')
}

export async function fetchMissionControlOperations() {
  return missionFetch<{ operations: Record<string, unknown> }>('/operations')
}

export async function fetchMissionControlActions() {
  return missionFetch<{ actions: unknown[]; total: number }>('/actions')
}

export async function fetchMissionControlHealth() {
  return missionFetch<{ health: Record<string, unknown> }>('/health')
}

export async function fetchUnifiedMissionControl() {
  try {
    return await cloudFetch<Record<string, unknown>>('/v1/command-center/mission-control')
  } catch (err) {
    if (err instanceof CloudApiError && (err.code === 'unreachable' || err.code === 'unauthorized')) {
      return buildMissionControlFallbackHomepage()
    }
    throw err
  }
}

export async function fetchMissionControlHomepage() {
  try {
    return await cloudFetch<Record<string, unknown>>('/v1/mission-control/homepage')
  } catch (err) {
    if (err instanceof CloudApiError && (err.code === 'unreachable' || err.code === 'unauthorized')) {
      return buildMissionControlFallbackHomepage()
    }
    throw err
  }
}

export async function fetchRepositoryInfrastructure() {
  return missionFetch<{ dashboard: Record<string, unknown> }>('/repository-infrastructure')
}

export async function fetchGitHubDeploymentStatus() {
  return cloudFetch<{ status: Record<string, unknown> }>('/v1/mission-control/github-deployment')
}

export async function fetchCiBuildHealth() {
  return missionFetch<{ health: Record<string, unknown> }>('/ci-health')
}

export async function runMissionControlAction(endpoint: string, method: 'GET' | 'POST' = 'POST') {
  return cloudFetch(endpoint.startsWith('/v1') ? endpoint : `/v1${endpoint}`, { method })
}
