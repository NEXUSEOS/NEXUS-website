import { Button, GlassPanel, Heading, Text } from '../ui'
import './PageError.css'

interface PageErrorProps {
  title?: string
  message: string
  onRetry?: () => void
}

export default function PageError({ title = 'Something went wrong', message, onRetry }: PageErrorProps) {
  return (
    <GlassPanel className="page-error" role="alert">
      <Heading as="h2" level="title">{title}</Heading>
      <Text variant="muted">{message}</Text>
      {onRetry ? (
        <div className="page-error__action">
          <Button variant="secondary" onClick={onRetry}>Try again</Button>
        </div>
      ) : null}
    </GlassPanel>
  )
}
