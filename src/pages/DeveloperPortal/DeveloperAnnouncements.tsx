import { GlassPanel, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

const announcements = [
  {
    title: 'NEXUS SDK 0.1.0-beta',
    date: '2026-07-01',
    body: 'Initial SDK release entering beta with core platform bindings.',
  },
  {
    title: 'Developer Portal Launch',
    date: '2026-07-10',
    body: 'Production-ready developer portal with authenticated downloads and analytics.',
  },
  {
    title: 'API Key Management',
    date: '2026-07-15',
    body: 'Programmatic API key creation, rotation, and scoped permissions are available in the Developer Portal.',
  },
]

export default function DeveloperAnnouncements() {
  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Announcements
        </Heading>
        <Text variant="muted">Platform updates for NEXUS developers.</Text>
      </div>
      <div className="download-grid">
        {announcements.map((item) => (
          <GlassPanel key={item.title} className="download-card">
            <Heading as="h3" level="title">
              {item.title}
            </Heading>
            <Text variant="caption">{item.date}</Text>
            <Text variant="muted">{item.body}</Text>
          </GlassPanel>
        ))}
      </div>
    </div>
  )
}
