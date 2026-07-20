import { useEffect, useState } from 'react'
import { GlassPanel, Heading, Text } from '../../components/ui'
import { useAuth } from '../../hooks'
import { fetchDeveloperProjects } from '../../services/platform/integrationService'
import '../../layouts/PortalLayout.css'

export default function DeveloperProjects() {
  const { session } = useAuth()
  const [projects, setProjects] = useState<Array<{ id: string; name: string; status: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = session?.access_token
    if (!token) {
      setLoading(false)
      return
    }
    let active = true
    fetchDeveloperProjects(token)
      .then((records) => {
        if (active) setProjects(records)
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Failed to load projects')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [session?.access_token])

  return (
    <div>
      <div className="portal-layout__header">
        <Heading as="h1" level="heading">
          Projects
        </Heading>
        <Text variant="muted">Projects synced from NEXUS Cloud.</Text>
      </div>
      {loading ? <Text variant="muted">Loading projects…</Text> : null}
      {error ? <Text variant="caption">{error}</Text> : null}
      {!loading && !session?.access_token ? (
        <Text variant="muted">Sign in to view cloud-synced projects.</Text>
      ) : null}
      {!loading && session?.access_token && projects.length === 0 && !error ? (
        <Text variant="muted">No projects synced yet. Create a project in NEXUS Studio or the SDK CLI.</Text>
      ) : null}
      <div className="download-grid">
        {projects.map((project) => (
          <GlassPanel key={project.id} className="download-card">
            <Heading as="h3" level="title">
              {project.name}
            </Heading>
            <Text variant="caption">Status: {project.status}</Text>
          </GlassPanel>
        ))}
      </div>
    </div>
  )
}
