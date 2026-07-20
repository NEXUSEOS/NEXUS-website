import { useEffect, useState } from 'react'
import { Button, Heading, Text } from '../../components/ui'
import { fetchWelcomeTour } from '../../services/launch/launchService'

interface WelcomeTourProps {
  portal: 'developer' | 'sponsor'
  storageKey?: string
}

export default function WelcomeTour({ portal, storageKey }: WelcomeTourProps) {
  const key = storageKey ?? `nexus-welcome-tour-${portal}`
  const [visible, setVisible] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [steps, setSteps] = useState<Array<{ stepKey: string; title: string; description: string }>>([])

  useEffect(() => {
    if (localStorage.getItem(key) === 'done') return
    void fetchWelcomeTour(portal)
      .then((d) => {
        if (d.steps.length > 0) {
          setSteps(d.steps)
          setVisible(true)
        }
      })
      .catch(() => {})
  }, [portal, key])

  function dismiss() {
    localStorage.setItem(key, 'done')
    setVisible(false)
  }

  function next() {
    if (stepIndex >= steps.length - 1) {
      dismiss()
      return
    }
    setStepIndex((i) => i + 1)
  }

  if (!visible || steps.length === 0) return null

  const step = steps[stepIndex]!

  return (
    <div className="cc-panel" role="dialog" aria-label="Welcome tour" style={{ position: 'fixed', bottom: 24, right: 24, maxWidth: 360, zIndex: 1000 }}>
      <Heading as="h3" level="title">{step.title}</Heading>
      <Text variant="muted">{step.description}</Text>
      <Text variant="caption">Step {stepIndex + 1} of {steps.length}</Text>
      <div className="download-card__actions">
        <Button variant="primary" onClick={next}>{stepIndex >= steps.length - 1 ? 'Finish' : 'Next'}</Button>
        <Button variant="ghost" onClick={dismiss}>Skip tour</Button>
      </div>
    </div>
  )
}
