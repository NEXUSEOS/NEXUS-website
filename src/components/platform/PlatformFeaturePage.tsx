import { Link } from 'react-router-dom'
import { GlassPanel, Heading, Text } from '../ui'

interface PlatformFeaturePageProps {
  title: string
  description: string
  status: 'beta' | 'architecture' | 'live'
  capabilities: string[]
  relatedLinks?: { label: string; path: string }[]
}

const statusLabels = {
  beta: 'Beta',
  architecture: 'Architecture Preview',
  live: 'Live',
} as const

export default function PlatformFeaturePage({
  title,
  description,
  status,
  capabilities,
  relatedLinks = [],
}: PlatformFeaturePageProps) {
  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          {title}
        </Heading>
        <Text variant="muted">{description}</Text>
        <Text variant="caption">Status: {statusLabels[status]}</Text>
      </div>

      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Capabilities
        </Heading>
        <ul className="tier-card__benefits">
          {capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </GlassPanel>

      {relatedLinks.length > 0 ? (
        <div className="download-card__actions">
          {relatedLinks.map((link) => (
            <Link key={link.path} to={link.path} className="button button--secondary">
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}
