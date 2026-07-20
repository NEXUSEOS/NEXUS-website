import { developerFetch } from '../developer/developerPortalService'

export async function openCustomerPortal(organizationId: string, returnUrl: string) {
  const data = await developerFetch<{ portal: { url: string } }>(
    `/v1/organizations/${organizationId}/billing/customer-portal`,
    { method: 'POST', body: JSON.stringify({ returnUrl }) },
  )
  return data.portal.url
}

export async function requestRefund(organizationId: string, amountCents: number, reason: string, stripePaymentIntentId?: string) {
  return developerFetch(`/v1/organizations/${organizationId}/billing/refunds`, {
    method: 'POST',
    body: JSON.stringify({ amountCents, reason, stripePaymentIntentId }),
  })
}

export async function submitNps(organizationId: string, score: number, feedback?: string) {
  return developerFetch(`/v1/organizations/${organizationId}/operations/nps`, {
    method: 'POST',
    body: JSON.stringify({ surveyKey: 'platform-nps', score, feedback }),
  })
}

export async function fetchCustomerSuccessHealth(organizationId: string) {
  return developerFetch<{ health: Record<string, unknown> }>(
    `/v1/organizations/${organizationId}/operations/customer-success`,
  )
}

export async function fetchOperationsNotifications(organizationId: string) {
  return developerFetch<{ notifications: Array<{ id: string; title: string; body: string; read: boolean }> }>(
    `/v1/organizations/${organizationId}/operations/notifications`,
  )
}
