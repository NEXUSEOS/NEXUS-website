import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { useAuth } from '../../hooks'
import { listOrganizations } from '../../services/developer/developerPortalService'
import { fetchConnectAccount, fetchOrgPayouts, onboardConnectAccount } from '../../services/commercial/commercialService'
import { Button, Heading, Text } from '../../components/ui'

export default function DeveloperPayoutsPage() {
  const { user } = useAuth()
  const [orgId, setOrgId] = useState<string | null>(null)
  const [payouts, setPayouts] = useState<Array<{ id: string; amountCents: number; status: string }>>([])
  const [connectStatus, setConnectStatus] = useState<string>('not_connected')

  useEffect(() => {
    if (!user) return
    void listOrganizations().then(async (orgs) => {
      const id = orgs[0]?.id
      if (!id) return
      setOrgId(id)
      const [payoutData, connect] = await Promise.all([fetchOrgPayouts(id), fetchConnectAccount(id)])
      setPayouts(payoutData.payouts)
      setConnectStatus(connect.account?.onboardingStatus ?? 'not_connected')
    })
  }, [user])

  async function handleOnboard() {
    if (!orgId) return
    const { onboarding } = await onboardConnectAccount(orgId)
    if (onboarding.onboardingUrl) window.location.href = onboarding.onboardingUrl
  }

  return (
    <PageShell route={{ path: '/developers/portal/payouts', title: 'Developer Payouts', description: 'Marketplace revenue and Stripe Connect payouts.' }}>
      <Heading as="h1" level="heading">Developer Revenue & Payouts</Heading>
      <Text variant="muted">Marketplace earnings, revenue sharing, and Stripe Connect onboarding.</Text>

      <p style={{ marginTop: 'var(--spacing-6)' }}>
        Connect status: <strong>{connectStatus}</strong>
        {connectStatus !== 'complete' && orgId && (
          <Button variant="primary" onClick={() => void handleOnboard()} style={{ marginLeft: 'var(--spacing-4)' }}>
            Set up payouts
          </Button>
        )}
      </p>

      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Payout history</Heading>
        {payouts.length === 0 ? (
          <Text variant="muted">No payouts yet. Publish to the marketplace to earn revenue.</Text>
        ) : (
          <ul>
            {payouts.map((p) => (
              <li key={p.id}>${(p.amountCents / 100).toFixed(2)} — {p.status}</li>
            ))}
          </ul>
        )}
      </section>

      <p style={{ marginTop: 'var(--spacing-6)' }}>
        <Link to="/developers/portal/billing">Billing</Link> · <Link to="/developers/portal/marketplace-uploads">Marketplace uploads</Link>
      </p>
    </PageShell>
  )
}
