import { useEffect, useState } from 'react'
import PageShell from '../../components/layout/PageShell'
import { Heading, Text } from '../../components/ui'
import { fetchDemoProjects } from '../../services/publicBeta/publicBetaService'

export default function DemoProjects() {
  const [projects, setProjects] = useState<Array<{ slug: string; title: string; description: string; category: string; difficulty: string; repoPath: string }>>([])

  useEffect(() => {
    void fetchDemoProjects().then((d) => setProjects(d.projects as typeof projects)).catch(() => {})
  }, [])

  return (
    <PageShell route={{ path: '/demos', title: 'Demo Projects', description: 'Robot examples, behavior demos, and sample projects.' }}>
      <Text variant="muted">Clone-ready demo projects for patrol, ROS, Atlas calibration, and manipulation.</Text>
      <ul style={{ marginTop: 'var(--spacing-8)' }}>
        {projects.map((p) => (
          <li key={p.slug} style={{ marginBottom: 'var(--spacing-6)' }}>
            <Heading as="h3" level="title">{p.title}</Heading>
            <Text variant="muted">{p.category} · {p.difficulty}</Text>
            <Text>{p.description}</Text>
            <Text variant="caption">Path: {p.repoPath}</Text>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
