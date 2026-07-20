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

function getOrganizationId(): string | undefined {
  return localStorage.getItem('nexus-organization-id') ?? undefined
}

async function commercialFetch<T>(path: string, init?: RequestInit, auth = false): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const token = getAccessToken()
  if (auth && token) headers.Authorization = `Bearer ${token}`
  const orgId = getOrganizationId()
  if (orgId) headers['X-Organization-Id'] = orgId

  const res = await fetch(`${CLOUD_URL.replace(/\/$/, '')}${path}`, { ...init, headers: { ...headers, ...init?.headers } })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `Commercial API error ${res.status}`)
  }
  return res.json() as Promise<T>
}

export type PricingPlan = {
  slug: string
  name: string
  description: string
  priceCents: number
  currency: string
  interval: string
  features: string[]
}

export async function fetchPublicPricing() {
  return commercialFetch<{ plans: PricingPlan[] }>('/v1/business/commercial/pricing')
}

export async function joinWaitlist(input: {
  email: string
  waitlistType: 'developer' | 'sponsor'
  name?: string
  company?: string
  referralCode?: string
}) {
  return commercialFetch<{ entry: { id: string; position: number; status: string } }>(
    '/v1/business/commercial/waitlist',
    { method: 'POST', body: JSON.stringify(input) },
  )
}

export async function createCheckoutSession(organizationId: string, planSlug: string, couponCode?: string) {
  const origin = window.location.origin
  return commercialFetch<{ session: { sessionId: string; checkoutUrl: string; amountCents: number } }>(
    `/v1/organizations/${organizationId}/billing/checkout`,
    {
      method: 'POST',
      body: JSON.stringify({
        planSlug,
        couponCode,
        successUrl: `${origin}/checkout/success`,
        cancelUrl: `${origin}/checkout/cancel`,
      }),
    },
    true,
  )
}

export async function completeCheckoutSession(organizationId: string, sessionId: string) {
  return commercialFetch<{ session: { status: string }; subscription: unknown }>(
    `/v1/organizations/${organizationId}/billing/checkout/${sessionId}/complete`,
    { method: 'POST' },
    true,
  )
}

export async function fetchOrgBillingDashboard(organizationId: string) {
  return commercialFetch<{ dashboard: Record<string, number | boolean> }>(
    `/v1/organizations/${organizationId}/billing/dashboard`,
    undefined,
    true,
  )
}

export async function fetchOrgSubscriptions(organizationId: string) {
  return commercialFetch<{ subscriptions: Array<{ id: string; status: string; planId: string }> }>(
    `/v1/organizations/${organizationId}/billing/subscriptions`,
    undefined,
    true,
  )
}

export async function fetchOrgInvoices(organizationId: string) {
  return commercialFetch<{ invoices: Array<{ id: string; invoiceNumber: string; amountCents: number; status: string }> }>(
    `/v1/organizations/${organizationId}/billing/invoices`,
    undefined,
    true,
  )
}

export async function fetchOrgLicenses(organizationId: string) {
  return commercialFetch<{ licenses: Array<{ id: string; licenseType: string; seats: number; status: string }> }>(
    `/v1/organizations/${organizationId}/billing/licenses`,
    undefined,
    true,
  )
}

export async function validateLicense(organizationId: string, licenseType?: string) {
  const qs = licenseType ? `?licenseType=${encodeURIComponent(licenseType)}` : ''
  return commercialFetch<{ validation: { valid: boolean; totalSeats: number } }>(
    `/v1/organizations/${organizationId}/billing/licenses/validate${qs}`,
    undefined,
    true,
  )
}

export async function fetchOrgPayouts(organizationId: string) {
  return commercialFetch<{ payouts: Array<{ id: string; amountCents: number; status: string; recipientType: string }> }>(
    `/v1/organizations/${organizationId}/billing/payouts`,
    undefined,
    true,
  )
}

export async function onboardConnectAccount(organizationId: string) {
  const origin = window.location.origin
  return commercialFetch<{ onboarding: { onboardingUrl: string; stripeAccountId: string } }>(
    `/v1/organizations/${organizationId}/billing/connect/onboard`,
    {
      method: 'POST',
      body: JSON.stringify({
        returnUrl: `${origin}/developers/portal/payouts`,
        refreshUrl: `${origin}/developers/portal/payouts`,
      }),
    },
    true,
  )
}

export async function fetchConnectAccount(organizationId: string) {
  return commercialFetch<{ account: { onboardingStatus: string; payoutsEnabled: boolean } | null }>(
    `/v1/organizations/${organizationId}/billing/connect`,
    undefined,
    true,
  )
}

export async function fetchSponsorAgreements(organizationId: string) {
  return commercialFetch<{
    agreements: Array<{ id: string; title: string; sponsorTier: string; amountCents: number; status: string }>
  }>(`/v1/organizations/${organizationId}/billing/sponsor-agreements`, undefined, true)
}

export async function createSponsorAgreement(organizationId: string, input: { sponsorTier: string; title: string; amountCents: number }) {
  return commercialFetch<{ agreement: { id: string; status: string } }>(
    `/v1/organizations/${organizationId}/billing/sponsor-agreements`,
    { method: 'POST', body: JSON.stringify(input) },
    true,
  )
}

export async function signSponsorAgreement(organizationId: string, agreementId: string) {
  return commercialFetch<{ agreement: { id: string; status: string } }>(
    `/v1/organizations/${organizationId}/billing/sponsor-agreements/${agreementId}/sign`,
    { method: 'POST' },
    true,
  )
}

export async function cancelSubscription(organizationId: string, subscriptionId: string) {
  return commercialFetch<{ subscription: { id: string; status: string } }>(
    `/v1/organizations/${organizationId}/billing/subscriptions/${subscriptionId}/cancel`,
    { method: 'POST' },
    true,
  )
}

export async function fetchRevenueForecast(organizationId: string) {
  return commercialFetch<{ forecast: { monthlyRecurringCents: number; forecast: Array<{ month: number; totalCents: number }> } }>(
    `/v1/organizations/${organizationId}/billing/forecast`,
    undefined,
    true,
  )
}
