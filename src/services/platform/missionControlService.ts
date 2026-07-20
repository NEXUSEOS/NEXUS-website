const CLOUD_URL = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

function getAccessToken(): string | undefined {
  try {
    const key = Object.keys(localStorage).find((k) => k.startsWith('sb-') && k.endsWith('-auth-token'))
    if (!key) return undefined
    const raw = localStorage.getItem(key)
    if (!raw) return undefined
    return (JSON.parse(raw) as { access_token?: string }).access_token
  } catch {
    return undefined
  }
}

async function missionFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(init?.headers as Record<string, string>) }
  const token = getAccessToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/mission-control${path}`, { ...init, headers })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `Mission Control error ${res.status}`)
  }
  return res.json() as Promise<T>
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
  const token = getAccessToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/command-center/mission-control`, { headers })
  if (!res.ok) throw new Error(`Mission Control error ${res.status}`)
  return res.json() as Promise<Record<string, unknown>>
}

export async function fetchMissionControlHomepage() {
  const token = getAccessToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/mission-control/homepage`, { headers })
  if (!res.ok) throw new Error(`Mission Control homepage error ${res.status}`)
  return res.json() as Promise<Record<string, unknown>>
}

export async function fetchRepositoryInfrastructure() {
  return missionFetch<{ dashboard: Record<string, unknown> }>('/repository-infrastructure')
}

export async function fetchGitHubDeploymentStatus() {
  const token = getAccessToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/mission-control/github-deployment`, { headers })
  if (!res.ok) throw new Error(`GitHub deployment status error ${res.status}`)
  return res.json() as Promise<{ status: Record<string, unknown> }>
}

export async function runMissionControlAction(endpoint: string, method: 'GET' | 'POST' = 'POST') {
  const token = getAccessToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}${endpoint}`, { method, headers })
  if (!res.ok) throw new Error(`Action failed (${res.status})`)
  return res.json()
}
