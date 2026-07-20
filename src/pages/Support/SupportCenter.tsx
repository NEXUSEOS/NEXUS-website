import { Link } from 'react-router-dom'
import PageShell from '../../components/layout/PageShell'
import { routes } from '../../config'
import { Button, Heading, Text } from '../../components/ui'

export default function SupportCenter() {
  return (
    <PageShell route={routes.support}>
      <Text variant="muted">
        Get help with NEXUS Cloud, Studio, SDK, beta program access, and sponsor partnerships.
      </Text>

      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Quick links</Heading>
        <div className="download-card__actions">
          <Link to={routes.knowledgeBase.path}><Button variant="primary">Knowledge Base</Button></Link>
          <Link to={routes.feedbackPortal.path}><Button variant="secondary">Submit Feedback</Button></Link>
          <Link to={routes.issueTracking.path}><Button variant="secondary">Issue Tracking</Button></Link>
          <Link to={routes.status.path}><Button variant="ghost">System Status</Button></Link>
        </div>
      </section>

      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Programs</Heading>
        <ul>
          <li><Link to={routes.developerOnboarding.path}>Developer onboarding</Link></li>
          <li><Link to={routes.sponsorOnboarding.path}>Sponsor onboarding</Link></li>
          <li><Link to={routes.betaApply.path}>Beta application</Link></li>
          <li><Link to={routes.developerPortalTutorials.path}>Interactive tutorials</Link></li>
        </ul>
      </section>

      <section style={{ marginTop: 'var(--spacing-8)' }}>
        <Heading as="h2" level="title">Contact</Heading>
        <Text variant="muted">Open a support ticket with details about your issue.</Text>
        <Link to={routes.contact.path}><Button variant="secondary">Contact form</Button></Link>
      </section>
    </PageShell>
  )
}
