import { lazy, Suspense, useEffect, useRef, type ReactNode } from 'react'
import { useAdaptiveAnimation } from '../adaptive'
import { useCinematicTheme } from '../theme'
import './ambient.css'

const ParticleFieldCanvas = lazy(() => import('../../components/living-glass/ParticleFieldCanvas'))

export interface AmbientEnvironmentProps {
  children: ReactNode
}

/** Global background controller: particle field, mist, mouse parallax, energy waves. */
export function AmbientEnvironment({ children }: AmbientEnvironmentProps) {
  const { particleBudget, reducedMotion } = useAdaptiveAnimation()
  const theme = useCinematicTheme()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    const el = rootRef.current
    if (!el) return

    function onMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      el!.style.setProperty('--cx-parallax-x', String(x))
      el!.style.setProperty('--cx-parallax-y', String(y))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reducedMotion])

  return (
    <div
      ref={rootRef}
      className="cx-ambient"
      data-cinematic-mode={theme.mode}
    >
      <div className="cx-ambient__layer cx-ambient__nebula" aria-hidden="true" />
      <div className="cx-ambient__layer cx-ambient__mist" aria-hidden="true" />
      {particleBudget > 0 ? (
        <div className="cx-ambient__layer cx-ambient__particles" aria-hidden="true">
          <Suspense fallback={null}>
            <ParticleFieldCanvas />
          </Suspense>
        </div>
      ) : null}
      <div className="cx-ambient__layer cx-ambient__waves" aria-hidden="true" />
      <div className="cx-ambient__content">
        {children}
      </div>
    </div>
  )
}
