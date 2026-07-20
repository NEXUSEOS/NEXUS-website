import { Link, useParams } from 'react-router-dom'
import { behaviorService, useBehaviors } from '../../behavior'
import { routes } from '../../config/routes'
import { useAuth } from '../../hooks'
import { Button, GlassPanel, Heading, Text } from '../../components/ui'
import NotFound from '../NotFound/NotFound'
import '../../layouts/PortalLayout.css'

export default function BehaviorDetail() {
  const { behaviorId } = useParams<{ behaviorId: string }>()
  const { user, profile } = useAuth()
  const { clone, publish, archive, version, refresh } = useBehaviors()
  const behavior = behaviorId ? behaviorService.get(behaviorId) : undefined
  const author = profile?.full_name ?? user?.email ?? 'Developer'

  if (!behavior) return <NotFound />

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          {behavior.name}
        </Heading>
        <Text variant="caption">
          {behavior.behaviorId} · v{behavior.version} · {behavior.status}
        </Text>
        <Text variant="muted">{behavior.description}</Text>
      </div>

      <div className="portal-metrics" aria-label="Behavior metadata">
        <GlassPanel className="portal-metric">
          <Text variant="caption">Safety Level</Text>
          <Text variant="body">{behavior.safetyLevel}</Text>
        </GlassPanel>
        <GlassPanel className="portal-metric">
          <Text variant="caption">License</Text>
          <Text variant="body">{behavior.license}</Text>
        </GlassPanel>
        <GlassPanel className="portal-metric">
          <Text variant="caption">Author</Text>
          <Text variant="body">{behavior.author}</Text>
        </GlassPanel>
        <GlassPanel className="portal-metric">
          <Text variant="caption">Updated</Text>
          <Text variant="body">{new Date(behavior.updatedAt).toLocaleString()}</Text>
        </GlassPanel>
      </div>

      <GlassPanel className="download-card">
        <Heading as="h2" level="title">
          Compatibility & Requirements
        </Heading>
        <Text variant="muted">Robots: {behavior.robotCompatibility.join(', ') || '—'}</Text>
        <Text variant="muted">Sensors: {behavior.requiredSensors.join(', ') || '—'}</Text>
        <Text variant="muted">Hardware: {behavior.requiredHardware.join(', ') || '—'}</Text>
        <Text variant="muted">AI Models: {behavior.aiModels.join(', ') || '—'}</Text>
        <Text variant="muted">Motion Packs: {behavior.motionPacks.join(', ') || '—'}</Text>
        <Text variant="muted">Dependencies: {behavior.dependencies.join(', ') || '—'}</Text>
        <Text variant="muted">Categories: {behavior.categories.join(', ')}</Text>
        <Text variant="muted">Tags: {behavior.tags.join(', ')}</Text>
      </GlassPanel>

      <div className="download-card__actions">
        <Button type="button" variant="secondary" onClick={() => version(behavior.behaviorId, 'Version bump')}>
          Version Behavior
        </Button>
        <Button type="button" variant="secondary" onClick={() => clone(behavior.behaviorId, author)}>
          Clone
        </Button>
        {behavior.status !== 'published' ? (
          <Button type="button" variant="primary" onClick={() => publish(behavior.behaviorId)}>
            Publish Draft
          </Button>
        ) : null}
        {behavior.status !== 'archived' ? (
          <Button type="button" variant="ghost" onClick={() => archive(behavior.behaviorId)}>
            Archive
          </Button>
        ) : null}
        <Button type="button" variant="ghost" onClick={() => refresh()}>
          Refresh
        </Button>
        <Link to={routes.developerPortalBehaviors.path} className="button button--ghost">
          Back to library
        </Link>
      </div>
    </div>
  )
}
