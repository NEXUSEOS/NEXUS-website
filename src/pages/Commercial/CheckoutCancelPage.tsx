import { Link } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { Heading, Text } from '../../components/ui'

export default function CheckoutCancelPage() {
  return (
    <PageShell route={{ path: '/checkout/cancel', title: 'Checkout Cancelled', description: 'Checkout was cancelled.' }}>
      <Heading as="h1" level="heading">Checkout Cancelled</Heading>
      <Text variant="muted">No charges were made. You can try again anytime.</Text>
      <p style={{ marginTop: 'var(--spacing-6)' }}>
        <Link to="/pricing">View pricing</Link> · <Link to="/waitlist">Join waitlist</Link>
      </p>
    </PageShell>
  )
}
