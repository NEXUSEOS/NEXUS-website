import { useState } from 'react'
import { Heading, Text } from '../../components/ui'
import { generateCodeSnippet } from '../../services/developer/developerOpsService'

function orgId(): string {
  return localStorage.getItem('nexus-organization-id') ?? ''
}

export default function DeveloperCodeGenerator() {
  const [template, setTemplate] = useState<'handler' | 'test' | 'ros-bridge'>('handler')
  const [name, setName] = useState('patrolHandler')
  const [snippet, setSnippet] = useState<{ filename: string; code: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function generate() {
    const id = orgId()
    if (!id) {
      setError('Set nexus-organization-id in localStorage')
      return
    }
    setError(null)
    try {
      const data = await generateCodeSnippet(id, template, name)
      setSnippet(data.snippet)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed')
    }
  }

  return (
    <section aria-labelledby="code-gen-title">
      <Heading as="h1" level="heading" id="code-gen-title">Code Generator</Heading>
      <Text variant="muted">Generate handler stubs, test suites, and ROS bridge scaffolding.</Text>
      {error && <p role="alert">{error}</p>}
      <label style={{ display: 'block', marginTop: 'var(--spacing-4)' }}>
        Template
        <select value={template} onChange={(e) => setTemplate(e.target.value as typeof template)} aria-label="Template">
          <option value="handler">Handler</option>
          <option value="test">Test suite</option>
          <option value="ros-bridge">ROS bridge</option>
        </select>
      </label>
      <label style={{ display: 'block' }}>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} aria-label="Symbol name" />
      </label>
      <button type="button" className="button button--primary" onClick={() => void generate()}>Generate</button>
      {snippet && (
        <>
          <Text variant="muted" style={{ marginTop: 'var(--spacing-4)' }}>{snippet.filename}</Text>
          <pre aria-label="Generated code">{snippet.code}</pre>
        </>
      )}
    </section>
  )
}
