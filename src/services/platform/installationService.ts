const CLOUD_URL = import.meta.env.VITE_NEXUS_CLOUD_URL ?? 'http://localhost:8787'

async function installationFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const tokenKey = Object.keys(localStorage).find((k) => k.startsWith('sb-') && k.endsWith('-auth-token'))
  let token = ''
  if (tokenKey) {
    try {
      token = (JSON.parse(localStorage.getItem(tokenKey) ?? '{}') as { access_token?: string }).access_token ?? ''
    } catch {
      token = ''
    }
  }
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/installation${path}`, {
    ...init,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })
  if (!res.ok) throw new Error(`Installation API failed (${res.status})`)
  return (await res.json()) as T
}

export async function fetchInstallationState() {
  return installationFetch<{
    initialized: boolean
    completed: boolean
    requiresInstallationCenter: boolean
    readinessScore: number
  }>('/state')
}

export async function fetchInstallationDashboard() {
  return installationFetch<Record<string, unknown>>('/dashboard')
}

export async function fetchMissionControlInstallationCenter() {
  const tokenKey = Object.keys(localStorage).find((k) => k.startsWith('sb-') && k.endsWith('-auth-token'))
  let token = ''
  if (tokenKey) {
    try {
      token = (JSON.parse(localStorage.getItem(tokenKey) ?? '{}') as { access_token?: string }).access_token ?? ''
    } catch {
      token = ''
    }
  }
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/mission-control/installation-center`, {
    headers: { Authorization: token ? `Bearer ${token}` : '' },
  })
  if (!res.ok) throw new Error(`Mission Control installation center failed (${res.status})`)
  return (await res.json()) as Record<string, unknown>
}
