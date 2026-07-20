import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { useAuth } from '../../hooks'
import { listOrganizations } from '../../services/developer/developerPortalService'
import { createSponsorAgreement, fetchSponsorAgreements, signSponsorAgreement } from '../../services/commercial/commercialService'
import { Button, Heading, Text } from '../../components/ui'

const SPONSOR_TIERS = [
  { sponsorTier: 'partner', title: 'Partner Sponsorship', amountCents: 2500000 },
  { sponsorTier: 'premier', title: 'Premier Sponsorship', amountCents: 10000000 },
  { sponsorTier: 'founding', title: 'Founding Sponsor', amountCents: 25000000 },
]

export default function SponsorBillingPage() {
  const { user } = useAuth()
  const [orgId, setOrgId] = useState<string | null>(null)
  const [agreements, setAgreements] = useState<Array<{ id: string; title: string; sponsorTier: string; amountCents: number; status: string }>>([])

  useEffect(() => {
    if (!user) return
    void listOrganizations().then(async (orgs) => {
      const id = orgs[0]?.id
      if (!id) return
      setOrgId(id)
      const data = await fetchSponsorAgreements(id)
      setAgreements(data.agreements)
    })
  }, [user])

  async function handleCreate(tier: typeof SPONSOR_TIERS[number]) {
    if (!orgId) return
    const { agreement } = await createSponsorAgreement(orgId, tier)
    setAgreements((prev) => [...prev, { id: agreement.id, title: tier.title, sponsorTier: tier.sponsorTier, amountCents: tier.amountCents, status: agreement.status }])
  }

  async function handleSign(agreementId: string) {
    if (!orgId) return
    const { agreement } = await signSponsorAgreement(orgId, agreementId)
    setAgreements((prev) => prev.map((a) => (a.id === agreementId ? { ...a, status: agreement.status } : a)))
  }

  return (
    <PageShell route={{ path: '/sponsors/portal/billing', title: 'Sponsor Billing', description: 'Sponsor agreements and billing.' }}>
      <Heading as="h1" level="heading">Sponsor Billing</Heading>
      <Text variant="muted">Sponsor agreements, tier billing, and subscription management.</Text>

      {!user && <Text><Link to={routes.login?.path ?? '/auth/login'}>Sign in</Link> to manage sponsor billing.</Text>}

      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Available tiers</Heading>
        <ul>
          {SPONSOR_TIERS.map((t) => (
            <li key={t.sponsorTier} style={{ marginBottom: 'var(--spacing-4)' }}>
              {t.title} — ${(t.amountCents / 100).toLocaleString()}/year
              {orgId && (
                <Button variant="secondary" onClick={() => void handleCreate(t)} style={{ marginLeft: 'var(--spacing-3)' }}>
                  Create agreement
                </Button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Your agreements</Heading>
        {agreements.length === 0 ? (
          <Text variant="muted">No sponsor agreements yet.</Text>
        ) : (
          <ul>
            {agreements.map((a) => (
              <li key={a.id}>
                {a.title} ({a.sponsorTier}) — ${(a.amountCents / 100).toLocaleString()} — {a.status}
                {a.status === 'draft' && orgId && (
                  <Button variant="primary" onClick={() => void handleSign(a.id)} style={{ marginLeft: 'var(--spacing-3)' }}>
                    Sign & activate
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <p style={{ marginTop: 'var(--spacing-6)' }}>
        <Link to={routes.sponsorOnboarding.path}>Sponsor onboarding</Link> · <Link to="/waitlist">Sponsor waitlist</Link>
      </p>
    </PageShell>
  )
}
