import { useEffect, useState } from 'react'
import { Heading, Text } from '../../components/ui'
import { fetchTutorial, fetchTutorials, saveTutorialProgress } from '../../services/developer/developerPortalService'

interface TutorialStep {
  id: string
  title: string
  body: string
}

export default function DeveloperTutorialEngine() {
  const [tutorials, setTutorials] = useState<Array<{ id: string; slug: string; title: string; description: string }>>([])
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [steps, setSteps] = useState<TutorialStep[]>([])
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  useEffect(() => {
    void fetchTutorials().then((t) => {
      setTutorials(t)
      if (t[0]) setActiveSlug(t[0].slug)
    })
  }, [])

  useEffect(() => {
    if (!activeSlug) return
    void fetchTutorial(activeSlug).then((t) => {
      setSteps((t.steps as TutorialStep[]) ?? [])
      setCompleted(new Set())
    })
  }, [activeSlug])

  async function completeStep(stepId: string) {
    const tutorial = tutorials.find((t) => t.slug === activeSlug)
    if (!tutorial) return
    setCompleted((prev) => new Set([...prev, stepId]))
    await saveTutorialProgress(tutorial.id, stepId, steps.length)
  }

  return (
    <section aria-labelledby="tutorial-engine-title">
      <Heading as="h1" level="heading" id="tutorial-engine-title">Interactive Tutorials</Heading>
      <Text variant="muted">Step-by-step guides for building and publishing behaviors.</Text>
      <div role="tablist" aria-label="Tutorials" style={{ marginTop: 'var(--spacing-4)' }}>
        {tutorials.map((t) => (
          <button
            key={t.slug}
            type="button"
            role="tab"
            aria-selected={activeSlug === t.slug}
            className={`button ${activeSlug === t.slug ? 'button--primary' : 'button--secondary'}`}
            onClick={() => setActiveSlug(t.slug)}
          >
            {t.title}
          </button>
        ))}
      </div>
      {steps.length > 0 && (
        <ol style={{ marginTop: 'var(--spacing-6)' }}>
          {steps.map((step) => (
            <li key={step.id} style={{ marginBottom: 'var(--spacing-4)' }}>
              <Heading as="h2" level="title">{step.title}</Heading>
              <Text>{step.body}</Text>
              <button
                type="button"
                className="button button--ghost"
                disabled={completed.has(step.id)}
                onClick={() => void completeStep(step.id)}
              >
                {completed.has(step.id) ? 'Completed' : 'Mark complete'}
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
