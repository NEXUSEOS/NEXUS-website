import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { MistDissolve } from '../../components/living-glass'
import { useAdaptiveAnimation } from '../adaptive'

export interface GlobalTransitionEngineProps {
  children: ReactNode
}

const DISSOLVE_MS = 420

/** Route-level page transitions — materialize in, dissolve out via MistDissolve orchestration. */
export default function GlobalTransitionEngine({ children }: GlobalTransitionEngineProps) {
  const location = useLocation()
  const { reducedMotion } = useAdaptiveAnimation()
  const [displayPath, setDisplayPath] = useState(location.pathname)
  const [dissolving, setDissolving] = useState(false)

  useEffect(() => {
    if (location.pathname === displayPath) return

    if (reducedMotion) {
      setDisplayPath(location.pathname)
      return
    }

    setDissolving(true)
    const timer = window.setTimeout(() => {
      setDisplayPath(location.pathname)
      setDissolving(false)
    }, DISSOLVE_MS)

    return () => window.clearTimeout(timer)
  }, [location.pathname, displayPath, reducedMotion])

  return (
    <MistDissolve active={dissolving}>
      <div key={displayPath} className="lg-materialize cx-route-transition">
        {children}
      </div>
    </MistDissolve>
  )
}
