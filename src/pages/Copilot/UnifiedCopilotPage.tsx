import { useEffect, useState } from 'react'
import { Heading, Text } from '../../components/ui'
import {
  copilotChat,
  fetchAutonomousWorkflows,
  fetchConversationHistory,
  fetchCopilotAssistants,
  runAutonomousWorkflow,
  runCopilotAgent,
  type CopilotAssistantType,
} from '../../services/copilot/copilotService'

const PORTAL_ASSISTANTS: Array<{ type: CopilotAssistantType; label: string }> = [
  { type: 'unified', label: 'Unified Copilot' },
  { type: 'developer_copilot', label: 'Developer Copilot' },
  { type: 'marketplace', label: 'Marketplace Copilot' },
  { type: 'sponsor', label: 'Sponsor Copilot' },
  { type: 'customer', label: 'Customer Copilot' },
  { type: 'fleet', label: 'Fleet Copilot' },
  { type: 'manufacturing', label: 'Manufacturing Copilot' },
  { type: 'command_center', label: 'Command Center Copilot' },
  { type: 'atlas', label: 'Atlas Copilot' },
]

function orgId(): string {
  return localStorage.getItem('nexus-organization-id') ?? ''
}

export default function UnifiedCopilotPage() {
  const [assistants, setAssistants] = useState(PORTAL_ASSISTANTS)
  const [assistantType, setAssistantType] = useState<CopilotAssistantType>('unified')
  const [message, setMessage] = useState('How can NEXUS AI help my organization today?')
  const [reply, setReply] = useState<string | null>(null)
  const [workflows, setWorkflows] = useState<Array<{ key: string; name: string }>>([])
  const [history, setHistory] = useState<Array<{ id: string; title: string }>>([])
  const [mode, setMode] = useState<'chat' | 'agent' | 'workflow'>('chat')
  const [selectedWorkflow, setSelectedWorkflow] = useState('knowledge_search')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    void fetchCopilotAssistants()
      .then((d) => {
        if (d.assistants.length) {
          setAssistants(d.assistants.map((a: { id: string; name: string }) => ({ type: a.id as CopilotAssistantType, label: a.name })))
        }
      })
      .catch(() => undefined)
  }, [])

  useEffect(() => {
    const id = orgId()
    if (!id) return
    void fetchAutonomousWorkflows(id).then((d) => setWorkflows(d.workflows)).catch(() => setWorkflows([]))
    void fetchConversationHistory(id).then((d) => setHistory(d.conversations.slice(0, 10))).catch(() => setHistory([]))
  }, [])

  async function submit() {
    const id = orgId()
    if (!id) {
      setError('Set nexus-organization-id in localStorage after selecting an organization')
      return
    }
    setBusy(true)
    setError(null)
    try {
      if (mode === 'agent') {
        const data = await runCopilotAgent(id, message, assistantType)
        setReply(data.result.content)
      } else if (mode === 'workflow') {
        const data = await runAutonomousWorkflow(id, selectedWorkflow, { description: message })
        setReply(data.result.content)
      } else {
        const data = await copilotChat(id, message, assistantType)
        setReply(data.response.content)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Copilot request failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section aria-labelledby="unified-copilot-title">
      <Heading as="h1" level="heading" id="unified-copilot-title">NEXUS AI Copilot</Heading>
      <Text variant="body">Unified intelligence layer — role-based assistants, agents, and autonomous workflows.</Text>
      <label>
        Mode
        <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}>
          <option value="chat">Chat</option>
          <option value="agent">Autonomous agent</option>
          <option value="workflow">Autonomous workflow</option>
        </select>
      </label>
      <label>
        Assistant
        <select value={assistantType} onChange={(e) => setAssistantType(e.target.value as CopilotAssistantType)}>
          {assistants.map((a) => (
            <option key={a.type} value={a.type}>{a.label}</option>
          ))}
        </select>
      </label>
      {mode === 'workflow' && (
        <label>
          Workflow
          <select value={selectedWorkflow} onChange={(e) => setSelectedWorkflow(e.target.value)}>
            {workflows.map((w) => (
              <option key={w.key} value={w.key}>{w.name}</option>
            ))}
          </select>
        </label>
      )}
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} aria-label="Message" />
      <button type="button" onClick={() => void submit()} disabled={busy}>
        {busy ? 'Processing…' : 'Submit'}
      </button>
      {error && <p role="alert">{error}</p>}
      {reply && <pre>{reply}</pre>}
      {history.length > 0 && (
        <details>
          <summary>Recent conversations</summary>
          <ul>
            {history.map((c) => (
              <li key={c.id}>{c.title || c.id.slice(0, 8)}</li>
            ))}
          </ul>
        </details>
      )}
    </section>
  )
}
