import { useEffect, useState } from 'react'
import { Heading, Text } from '../../components/ui'
import { fetchExampleLibrary } from '../../services/developer/developerOpsService'

export default function DeveloperExampleLibrary() {
  const [examples, setExamples] = useState<Array<{ slug: string; title: string; category: string; path: string }>>([])
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void fetchExampleLibrary()
      .then((data) => setExamples(data.examples))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load examples'))
  }, [])

  const categories = ['all', ...new Set(examples.map((e) => e.category))]
  const filtered = filter === 'all' ? examples : examples.filter((e) => e.category === filter)

  return (
    <section aria-labelledby="example-library-title">
      <Heading as="h1" level="heading" id="example-library-title">Example Library</Heading>
      <Text variant="muted">Curated robotics examples — behaviors, ROS bridges, simulation labs, and Atlas calibration.</Text>
      {error && <p role="alert">{error}</p>}
      <label style={{ display: 'block', marginTop: 'var(--spacing-4)' }}>
        Category
        <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Category filter">
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <ul role="list" style={{ marginTop: 'var(--spacing-4)' }}>
        {filtered.map((ex) => (
          <li key={ex.slug} style={{ marginBottom: 'var(--spacing-3)' }}>
            <strong>{ex.title}</strong> — {ex.category}
            <br />
            <code>{ex.path}</code>
          </li>
        ))}
      </ul>
    </section>
  )
}
