import type { ReactNode } from 'react'
import { GlassPanel, Heading, Text } from '../ui'
import './EmptyState.css'

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <GlassPanel className="empty-state" role="status" aria-live="polite">
      <Heading as="h2" level="title">{title}</Heading>
      <Text variant="muted">{description}</Text>
      {action ? <div className="empty-state__action">{action}</div> : null}
    </GlassPanel>
  )
}
