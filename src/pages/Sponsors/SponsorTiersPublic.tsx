import PageShell from '../../components/layout/PageShell'
import { sponsorshipTiers } from '../../config/portals'
import { routes } from '../../config'
import { GlassPanel, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

export default function SponsorTiersPublic() {
  return (
    <PageShell route={routes.sponsorTiers}>
      <div className="tier-grid">
        {sponsorshipTiers.map((tier) => (
          <GlassPanel key={tier.id} className="tier-card">
            <Heading as="h2" level="title">
              {tier.name}
            </Heading>
            <Text variant="muted">{tier.price}</Text>
            <ul className="tier-card__benefits">
              {tier.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </GlassPanel>
        ))}
      </div>
    </PageShell>
  )
}
