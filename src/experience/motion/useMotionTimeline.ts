import { useCallback, useEffect, useRef, useState } from 'react'
import { useAdaptiveAnimation } from '../adaptive'

export interface TimelineStep {
  id: string
  durationMs?: number
  delayMs?: number
  run?: () => void
}

export interface MotionTimelineState {
  currentStep: number
  isRunning: boolean
  isComplete: boolean
}

/** Lightweight timeline runner for choreographed multi-step animations. */
export function useMotionTimeline(steps: TimelineStep[]) {
  const { reducedMotion } = useAdaptiveAnimation()
  const [state, setState] = useState<MotionTimelineState>({
    currentStep: -1,
    isRunning: false,
    isComplete: false,
  })
  const timersRef = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }, [])

  const run = useCallback(() => {
    clearTimers()
    if (steps.length === 0) return

    if (reducedMotion) {
      steps.forEach((step) => step.run?.())
      setState({ currentStep: steps.length - 1, isRunning: false, isComplete: true })
      return
    }

    setState({ currentStep: -1, isRunning: true, isComplete: false })
    let elapsed = 0

    steps.forEach((step, index) => {
      elapsed += step.delayMs ?? 0
      const startId = window.setTimeout(() => {
        step.run?.()
        setState((prev) => ({ ...prev, currentStep: index }))
      }, elapsed)
      timersRef.current.push(startId)
      elapsed += step.durationMs ?? 400
    })

    const completeId = window.setTimeout(() => {
      setState({ currentStep: steps.length - 1, isRunning: false, isComplete: true })
    }, elapsed)
    timersRef.current.push(completeId)
  }, [steps, reducedMotion, clearTimers])

  const reset = useCallback(() => {
    clearTimers()
    setState({ currentStep: -1, isRunning: false, isComplete: false })
  }, [clearTimers])

  useEffect(() => () => clearTimers(), [clearTimers])

  return { ...state, run, reset, stepCount: steps.length }
}
