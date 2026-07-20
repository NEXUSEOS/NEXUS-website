import { Link } from 'react-router-dom'
import { routes } from '../../config/routes'
import { useBehaviors } from '../../behavior'
import { useAuth } from '../../hooks'
import { GlassPanel, Heading, Text } from '../../components/ui'
import '../../layouts/PortalLayout.css'

export default function BehaviorList() {
  const { user, profile } = useAuth()
  const { behaviors } = useBehaviors()
  const author = profile?.full_name ?? user?.email ?? 'Developer'

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Behavior Library
        </Heading>
        <Text variant="muted">
          Create, version, and publish robot behaviors. Architecture preview — no on-robot execution.
        </Text>
      </div>

      <div className="download-card__actions">
        <Link to={routes.developerPortalBehaviorNew.path} className="button button--primary">
          Create Behavior
        </Link>
        <Link to={`${routes.docsSdk.path}/behavior-api`} className="button button--secondary">
          Behavior API Docs
        </Link>
      </div>

      <div className="download-grid" style={{ marginTop: 'var(--spacing-8)' }}>
        {behaviors.length === 0 ? (
          <GlassPanel className="download-card">
            <Text variant="muted">No behaviors yet. Create your first draft as {author}.</Text>
          </GlassPanel>
        ) : (
          behaviors.map((behavior) => (
            <GlassPanel key={behavior.behaviorId} className="download-card">
              <Heading as="h2" level="title">
                {behavior.name}
              </Heading>
              <Text variant="caption">
                v{behavior.version} · {behavior.status} · {behavior.safetyLevel}
              </Text>
              <Text variant="muted">{behavior.description}</Text>
              <Link
                to={`${routes.developerPortalBehaviors.path}/${behavior.behaviorId}`}
                className="button button--ghost"
              >
                Open behavior
              </Link>
            </GlassPanel>
          ))
        )}
      </div>
    </div>
  )
}
