export type CinematicMode = 'default' | 'bridge' | 'showroom' | 'studio' | 'cloud' | 'mission'

export interface RouteTheme {
  mode: CinematicMode
  ambientHue: number
  nebulaPrimary: string
  nebulaSecondary: string
  bloom: string
}

const ROUTE_THEMES: Record<string, RouteTheme> = {
  '/': { mode: 'default', ambientHue: 38, nebulaPrimary: 'rgba(201, 184, 150, 0.14)', nebulaSecondary: 'rgba(180, 131, 139, 0.1)', bloom: 'rgba(201, 184, 150, 0.25)' },
  '/admin': { mode: 'bridge', ambientHue: 195, nebulaPrimary: 'rgba(100, 180, 220, 0.12)', nebulaSecondary: 'rgba(80, 140, 200, 0.08)', bloom: 'rgba(100, 200, 255, 0.2)' },
  '/marketplace': { mode: 'showroom', ambientHue: 280, nebulaPrimary: 'rgba(180, 140, 220, 0.12)', nebulaSecondary: 'rgba(140, 100, 200, 0.08)', bloom: 'rgba(200, 160, 255, 0.22)' },
  '/studio': { mode: 'studio', ambientHue: 160, nebulaPrimary: 'rgba(120, 200, 170, 0.1)', nebulaSecondary: 'rgba(80, 160, 140, 0.08)', bloom: 'rgba(140, 220, 190, 0.18)' },
  '/technology': { mode: 'cloud', ambientHue: 210, nebulaPrimary: 'rgba(100, 160, 230, 0.14)', nebulaSecondary: 'rgba(60, 120, 200, 0.1)', bloom: 'rgba(120, 180, 255, 0.2)' },
}

export function resolveRouteTheme(pathname: string): RouteTheme {
  if (pathname.startsWith('/admin')) return ROUTE_THEMES['/admin']!
  const exact = ROUTE_THEMES[pathname]
  if (exact) return exact
  return ROUTE_THEMES['/']!
}
