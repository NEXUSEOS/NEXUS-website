import { useEffect, type ReactNode } from 'react'
import { useMotionTimeline, type TimelineStep } from './useMotionTimeline'

export interface MotionSequenceProps {
  steps: TimelineStep[]
  autoPlay?: boolean
  className?: string
  children?: ReactNode | ((state: ReturnType<typeof useMotionTimeline>) => ReactNode)
}

/** Declarative sequence runner — children receive timeline state when using render prop. */
export default function MotionSequence({
  steps,
  autoPlay = true,
  className,
  children,
}: MotionSequenceProps) {
  const timeline = useMotionTimeline(steps)
  const { run } = timeline

  useEffect(() => {
    if (autoPlay) run()
  }, [autoPlay, run])

  const content = typeof children === 'function' ? children(timeline) : children

  return (
    <div className={className} data-motion-step={timeline.currentStep} data-motion-complete={timeline.isComplete}>
      {content}
    </div>
  )
}
