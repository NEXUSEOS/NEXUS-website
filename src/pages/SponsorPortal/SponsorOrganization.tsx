import { useAuth } from '../../hooks'
import { GlassPanel, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

export default function SponsorOrganization() {
  const { profile } = useAuth()

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Organization Profile
        </Heading>
        <Text variant="muted">Your sponsor organization details.</Text>
      </div>
      <GlassPanel className="download-card">
        <div className="profile-form__grid">
          <div>
            <Text variant="caption">Organization</Text>
            <Text variant="body">{profile?.organization?.name ?? 'Not assigned'}</Text>
          </div>
          <div>
            <Text variant="caption">Slug</Text>
            <Text variant="body">{profile?.organization?.slug ?? '—'}</Text>
          </div>
          <div>
            <Text variant="caption">Contact</Text>
            <Text variant="body">{profile?.full_name ?? '—'}</Text>
          </div>
          <div>
            <Text variant="caption">Partnership Role</Text>
            <Text variant="body">{profile?.role?.name ?? 'sponsor'}</Text>
          </div>
        </div>
      </GlassPanel>
    </div>
  )
}
