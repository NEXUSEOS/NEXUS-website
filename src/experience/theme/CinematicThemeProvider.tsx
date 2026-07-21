import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { resolveRouteTheme, type CinematicMode, type RouteTheme } from './routeThemes'

const ThemeContext = createContext<RouteTheme>(resolveRouteTheme('/'))

export function useCinematicTheme(): RouteTheme {
  return useContext(ThemeContext)
}

export function useCinematicMode(): CinematicMode {
  return useCinematicTheme().mode
}

export interface CinematicThemeProviderProps {
  children: ReactNode
}

/** Applies ambient hue and nebula tokens per route/section. */
export function CinematicThemeProvider({ children }: CinematicThemeProviderProps) {
  const location = useLocation()
  const theme = resolveRouteTheme(location.pathname)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.cinematicMode = theme.mode
    root.style.setProperty('--cx-ambient-hue', String(theme.ambientHue))
    root.style.setProperty('--lg-nebula-primary', theme.nebulaPrimary)
    root.style.setProperty('--lg-nebula-secondary', theme.nebulaSecondary)
    root.style.setProperty('--lg-bloom', theme.bloom)
  }, [theme])

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}
