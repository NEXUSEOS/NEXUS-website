import type { ReactNode } from 'react'
import { AdaptiveAnimationProvider } from './adaptive'
import { AmbientEnvironment } from './ambient'
import { CinematicThemeProvider } from './theme'
import './experience.css'

export interface ExperienceProviderProps {
  children: ReactNode
}

/** Root cinematic experience shell — adaptive scaling, route themes, ambient environment. */
export function ExperienceProvider({ children }: ExperienceProviderProps) {
  return (
    <AdaptiveAnimationProvider>
      <CinematicThemeProvider>
        <AmbientEnvironment>
          {children}
        </AmbientEnvironment>
      </CinematicThemeProvider>
    </AdaptiveAnimationProvider>
  )
}
