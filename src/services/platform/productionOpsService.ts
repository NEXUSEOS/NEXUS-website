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

async function productionFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(init?.headers as Record<string, string>) }
  const token = getAccessToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/command-center/production${path}`, { ...init, headers })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `Production ops error ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function fetchProductionOperations() {
  return productionFetch<{ dashboard: Record<string, unknown> }>('/operations')
}

export async function fetchProductionMonitoring() {
  return productionFetch<{ dashboard: Record<string, unknown> }>('/monitoring')
}

export async function fetchProductionReadiness() {
  return productionFetch<{ readiness: Record<string, unknown> }>('/readiness')
}

export async function triggerProductionBackup(environmentSlug = 'production') {
  return productionFetch<{ result: Record<string, unknown> }>('/backup', {
    method: 'POST',
    body: JSON.stringify({ environmentSlug }),
  })
}

export async function triggerRestoreVerification(environmentSlug = 'production') {
  return productionFetch<{ result: Record<string, unknown> }>('/restore-verify', {
    method: 'POST',
    body: JSON.stringify({ environmentSlug }),
  })
}

export async function evaluateProductionAlerts() {
  return productionFetch<{ evaluation: Record<string, unknown> }>('/alerts/evaluate', { method: 'POST', body: '{}' })
}

export async function fetchReliabilityRuns(runType?: string) {
  const q = runType ? `?runType=${encodeURIComponent(runType)}` : ''
  return productionFetch<{ runs: unknown[] }>(`/reliability-runs${q}`)
}

export async function fetchPublicReadiness() {
  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/ready`)
  return res.json() as Promise<{ ready: boolean; score: number; checks: unknown[] }>
}
