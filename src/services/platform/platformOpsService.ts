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

async function platformOpsFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...init?.headers as Record<string, string> }
  const token = getAccessToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}/v1/platform-ops${path}`, { ...init, headers })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `Platform Ops error ${res.status}`)
  }
  return res.json() as Promise<T>
}

export interface SetupState {
  initialized: boolean
  currentStep: number
  completed: boolean
  setupRunId: string | null
}

export interface WizardDefinition {
  steps: Array<{ step: number; id: string; title: string; fields?: string[]; connectionServiceId?: string }>
  totalSteps: number
}

export async function fetchAdministratorState() {
  return platformOpsFetch<{
    hasAdministrator: boolean
    memberCount: number
    initialized: boolean
    requiresSetupWizard: boolean
  }>('/setup/admin-state')
}

export async function registerAdministrator(input: { adminName: string; adminEmail: string }) {
  return platformOpsFetch('/setup/register-administrator', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function fetchSetupState() {
  return platformOpsFetch<SetupState>('/setup/state')
}

export async function fetchSetupDefinition() {
  return platformOpsFetch<WizardDefinition>('/setup/definition')
}

export async function startSetup() {
  return platformOpsFetch<{ setupRunId: string; currentStep: number }>('/setup/start', { method: 'POST' })
}

export async function saveSetupStep(setupRunId: string, stepId: string, data: Record<string, unknown>, stepNumber: number) {
  return platformOpsFetch(`/setup/${setupRunId}/steps/${stepId}`, {
    method: 'PUT',
    body: JSON.stringify({ data, stepNumber }),
  })
}

export async function validateSetupStep(setupRunId: string, stepId: string) {
  return platformOpsFetch<{ passed: boolean; detail?: string }>(`/setup/${setupRunId}/validate/${stepId}`, { method: 'POST' })
}

export async function completeSetup(setupRunId: string) {
  return platformOpsFetch<{ message: string; completed: boolean }>(`/setup/${setupRunId}/complete`, { method: 'POST' })
}

export async function fetchAdminDashboard() {
  return platformOpsFetch<Record<string, unknown>>('/admin/dashboard')
}
