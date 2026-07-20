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

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(init?.headers as Record<string, string>) }
  const token = getAccessToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/platform-admin${path}`, { ...init, headers })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `Platform Admin error ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function fetchPlatformAdminDashboard() {
  return adminFetch<Record<string, unknown>>('/dashboard')
}

export async function fetchConfigRegistry() {
  return adminFetch<{ configs: unknown[]; recentVersions: unknown[] }>('/config')
}

export async function fetchServicesRegistry() {
  return adminFetch<{ services: unknown[] }>('/services')
}

export async function fetchAdminEvents(limit = 50) {
  return adminFetch<{ events: unknown[] }>(`/events?limit=${limit}`)
}

export async function fetchAdminJobs() {
  return adminFetch<{ jobs: unknown[] }>('/jobs')
}

export async function fetchJobStats() {
  return adminFetch<Record<string, number>>('/jobs/stats')
}

export async function fetchSchedulerJobs() {
  return adminFetch<{ jobs: unknown[] }>('/scheduler')
}

export async function fetchSecretsRegistry() {
  return adminFetch<{ secrets: unknown[] }>('/secrets')
}

export async function fetchActivityTimeline(limit = 100) {
  return adminFetch<{ timeline: unknown[] }>(`/activity?limit=${limit}`)
}

export async function fetchHealthReport() {
  return adminFetch<Record<string, unknown>>('/health-report')
}

export async function syncSecretsRegistry() {
  return adminFetch<{ secrets: unknown[] }>('/secrets/sync', { method: 'POST' })
}

export { adminFetch }
