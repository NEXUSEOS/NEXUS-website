import { sponsorshipTiers } from '../../config/portals'
import { GlassPanel, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

export default function SponsorTiers() {
  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Sponsorship Tiers
        </Heading>
        <Text variant="muted">Explore NEXUS partnership levels and benefits.</Text>
      </div>
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
    </div>
  )
}
