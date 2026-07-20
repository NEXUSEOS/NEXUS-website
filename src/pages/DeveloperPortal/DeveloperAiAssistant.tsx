import { useEffect, useState } from 'react'
import { Heading, Text } from '../../components/ui'
import { aiDeveloperChat, aiGenerateBehavior } from '../../services/developer/developerOpsService'

function orgId(): string {
  return localStorage.getItem('nexus-organization-id') ?? ''
}

export default function DeveloperAiAssistant() {
  const [message, setMessage] = useState('How do I publish a behavior package to the marketplace?')
  const [reply, setReply] = useState<string | null>(null)
  const [behaviorDesc, setBehaviorDesc] = useState('Patrol loop with obstacle avoidance')
  const [generatedGraph, setGeneratedGraph] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('nexus-organization-id') && orgId() === '') {
      setError('Set nexus-organization-id in localStorage after selecting an organization')
    }
  }, [])

  async function sendChat() {
    const id = orgId()
    if (!id) return
    setBusy(true)
    setError(null)
    try {
      const data = await aiDeveloperChat(id, message)
      setReply(data.result.content ?? (data.result as { message?: string }).message ?? '')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI chat failed')
    } finally {
      setBusy(false)
    }
  }

  async function generateBehavior() {
    const id = orgId()
    if (!id) return
    setBusy(true)
    setError(null)
    try {
      const data = await aiGenerateBehavior(id, behaviorDesc)
      setReply(data.result.response.content ?? (data.result.response as { message?: string }).message ?? '')
      setGeneratedGraph(data.result.graph ? JSON.stringify(data.result.graph, null, 2) : null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Behavior generation failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section aria-labelledby="ai-assistant-title">
      <Heading as="h1" level="heading" id="ai-assistant-title">AI Code Assistant</Heading>
      <Text variant="muted">Developer copilot and AI behavior generator powered by NEXUS AI Platform.</Text>
      {error && <p role="alert">{error}</p>}

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-6)' }}>Developer copilot</Heading>
      <label style={{ display: 'block' }}>
        Message
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} aria-label="Chat message" />
      </label>
      <button type="button" className="button button--primary" disabled={busy} onClick={() => void sendChat()}>Ask copilot</button>

      <Heading as="h2" level="title" style={{ marginTop: 'var(--spacing-6)' }}>AI behavior generator</Heading>
      <label style={{ display: 'block' }}>
        Behavior description
        <input value={behaviorDesc} onChange={(e) => setBehaviorDesc(e.target.value)} aria-label="Behavior description" />
      </label>
      <button type="button" className="button button--secondary" disabled={busy} onClick={() => void generateBehavior()}>Generate graph</button>

      {reply && (
        <pre aria-label="AI response" style={{ marginTop: 'var(--spacing-4)', whiteSpace: 'pre-wrap' }}>{reply}</pre>
      )}
      {generatedGraph && (
        <pre aria-label="Generated graph" style={{ marginTop: 'var(--spacing-4)' }}>{generatedGraph}</pre>
      )}
    </section>
  )
}
