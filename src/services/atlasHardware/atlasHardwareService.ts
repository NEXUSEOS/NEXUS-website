import { developerFetch } from '../developer/developerPortalService'

export async function fetchEngineeringCenterDashboard(organizationId?: string) {
  const q = organizationId ? `?organizationId=${encodeURIComponent(organizationId)}` : ''
  return developerFetch<{ dashboard: Record<string, unknown> }>(`/v1/command-center/atlas-hardware/engineering-center${q}`)
}

export async function fetchPrototypeDashboard(organizationId: string) {
  return developerFetch<{ dashboard: Record<string, unknown> }>(
    `/v1/command-center/atlas-hardware/prototype-dashboard?organizationId=${encodeURIComponent(organizationId)}`,
  )
}

export async function fetchManufacturingReadiness(organizationId: string) {
  return developerFetch<{ assessment: Record<string, unknown> }>(
    `/v1/command-center/atlas-hardware/manufacturing-dashboard?organizationId=${encodeURIComponent(organizationId)}`,
  )
}

export async function listHardwareComponents(organizationId: string, type?: string) {
  const q = type ? `?type=${encodeURIComponent(type)}` : ''
  return developerFetch<{ components: Array<{ partNumber: string; name: string; componentType: string; status: string }> }>(
    `/v1/organizations/${organizationId}/atlas-hardware/components${q}`,
  )
}

export async function seedBomCatalog(organizationId: string) {
  return developerFetch<{ result: { seeded: boolean; count: number } }>(
    `/v1/organizations/${organizationId}/atlas-hardware/seed-bom`,
    { method: 'POST' },
  )
}

export async function listPrototypes(organizationId: string) {
  return developerFetch<{ prototypes: unknown[] }>(`/v1/organizations/${organizationId}/atlas-hardware/prototypes`)
}
