import { useCallback, useState } from 'react'
import { GlassPanel, Heading, Text } from '../../components/ui'
import { useAsyncMount, useAuth } from '../../hooks'
import { fetchDeveloperProjects } from '../../services/platform/integrationService'
import '../../layouts/PortalLayout.css'

export default function DeveloperProjects() {
  const { session } = useAuth()
  const token = session?.access_token
  const [projects, setProjects] = useState<Array<{ id: string; name: string; status: string }>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadProjects = useCallback(async () => {
    if (!token) {
      setProjects([])
      setError(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      setProjects(await fetchDeveloperProjects(token))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects')
      setProjects([])
    } finally {
      setLoading(false)
    }
  }, [token])

  useAsyncMount(loadProjects)

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
      {!loading && !token ? (
        <Text variant="muted">Sign in to view cloud-synced projects.</Text>
      ) : null}
      {!loading && token && projects.length === 0 && !error ? (
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
