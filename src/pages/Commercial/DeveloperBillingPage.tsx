import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { useAuth } from '../../hooks'
import { listOrganizations } from '../../services/developer/developerPortalService'
import {
  cancelSubscription,
  fetchOrgBillingDashboard,
  fetchOrgInvoices,
  fetchOrgSubscriptions,
  validateLicense,
} from '../../services/commercial/commercialService'
import { Button, Heading, Text } from '../../components/ui'

export default function DeveloperBillingPage() {
  const { user } = useAuth()
  const [orgId, setOrgId] = useState<string | null>(null)
  const [dashboard, setDashboard] = useState<Record<string, number | boolean> | null>(null)
  const [subscriptions, setSubscriptions] = useState<Array<{ id: string; status: string }>>([])
  const [invoices, setInvoices] = useState<Array<{ id: string; invoiceNumber: string; amountCents: number; status: string }>>([])
  const [licenseValid, setLicenseValid] = useState<boolean | null>(null)

  useEffect(() => {
    if (!user) return
    void listOrganizations().then(async (orgs) => {
      const id = orgs[0]?.id
      if (!id) return
      setOrgId(id)
      const [dash, subs, inv, validation] = await Promise.all([
        fetchOrgBillingDashboard(id),
        fetchOrgSubscriptions(id),
        fetchOrgInvoices(id),
        validateLicense(id),
      ])
      setDashboard(dash.dashboard)
      setSubscriptions(subs.subscriptions)
      setInvoices(inv.invoices)
      setLicenseValid(validation.validation.valid)
    })
  }, [user])

  async function handleCancel(subscriptionId: string) {
    if (!orgId) return
    await cancelSubscription(orgId, subscriptionId)
    const subs = await fetchOrgSubscriptions(orgId)
    setSubscriptions(subs.subscriptions)
  }

  return (
    <PageShell route={{ path: '/developers/portal/billing', title: 'Billing', description: 'Manage subscriptions, invoices, and licenses.' }}>
      <Heading as="h1" level="heading">Developer Billing</Heading>
      <Text variant="muted">Subscriptions, usage billing, invoices, and license validation.</Text>

      {!user && <Text><Link to={routes.login?.path ?? '/auth/login'}>Sign in</Link> to view billing.</Text>}

      {dashboard && (
        <ul style={{ marginTop: 'var(--spacing-6)' }}>
          <li>Active subscriptions: {String(dashboard.activeSubscriptions ?? 0)}</li>
          <li>Invoice total (30d): ${((Number(dashboard.invoiceTotalCents ?? 0)) / 100).toFixed(2)}</li>
          <li>License valid: {licenseValid ? 'Yes' : 'No'}</li>
          <li>Stripe: {dashboard.stripeConfigured ? 'live' : 'local ledger'}</li>
        </ul>
      )}

      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Subscriptions</Heading>
        {subscriptions.length === 0 ? (
          <Text variant="muted">No active subscription. <Link to="/pricing">View plans</Link></Text>
        ) : (
          <ul>
            {subscriptions.map((s) => (
              <li key={s.id}>
                {s.status}{' '}
                {s.status === 'active' && (
                  <Button variant="secondary" onClick={() => void handleCancel(s.id)}>Cancel</Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Invoices</Heading>
        <ul>
          {invoices.map((inv) => (
            <li key={inv.id}>{inv.invoiceNumber} — ${(inv.amountCents / 100).toFixed(2)} ({inv.status})</li>
          ))}
        </ul>
      </section>

      <p style={{ marginTop: 'var(--spacing-6)' }}>
        <Link to="/developers/portal/payouts">Developer payouts</Link> · <Link to="/pricing">Change plan</Link>
      </p>
    </PageShell>
  )
}
