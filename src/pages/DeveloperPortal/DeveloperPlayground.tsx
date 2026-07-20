import { useState } from 'react'
import { Heading, Text } from '../../components/ui'
import { runPlaygroundCode } from '../../services/developer/developerPortalService'

export default function DeveloperPlayground() {
  const [code, setCode] = useState('validate: my-behavior\nsemver: 1.0.0')
  const [output, setOutput] = useState('')

  async function run() {
    const session = await runPlaygroundCode(code)
    setOutput(session.output)
  }

  return (
    <section aria-labelledby="playground-title">
      <Heading as="h1" level="heading" id="playground-title">Developer Playground</Heading>
      <Text variant="muted">Run safe SDK validation snippets. Prefix with validate: or semver:</Text>
      <textarea
        rows={8}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        aria-label="Playground code"
        style={{ width: '100%', marginTop: 'var(--spacing-4)' }}
      />
      <button type="button" className="button button--primary" onClick={() => void run()}>Run</button>
      {output && <pre aria-label="Output" style={{ marginTop: 'var(--spacing-4)' }}>{output}</pre>}
    </section>
  )
}
