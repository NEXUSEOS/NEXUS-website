export const blur = null as unknown as Record<string, string>
export type Blur = typeof blur
export const colors = null as unknown as Record<string, string>
export type Colors = typeof colors
export const duration = null as unknown as Record<string, string>
export const easing = null as unknown as Record<string, string>
export const motion = null as unknown as Record<string, unknown>
export const spring = null as unknown as Record<string, unknown>
export type Motion = typeof motion
export const radius = null as unknown as Record<string, string>
export type Radius = typeof radius
export const shadows = null as unknown as Record<string, string>
export type Shadows = typeof shadows
export const spacing = null as unknown as Record<string, string>
export type Spacing = typeof spacing
export const fontFamily = null as unknown as Record<string, string>
export const typography = null as unknown as Record<string, unknown>
export type FontFamily = typeof fontFamily
export type Typography = typeof typography
export const theme = null as unknown as {
  colors: Record<string, string>
  spacing: Record<string, string>
  typography: Record<string, unknown>
  motion: Record<string, unknown>
  shadows: Record<string, string>
  blur: Record<string, string>
  radius: Record<string, string>
}
export type Theme = typeof theme

export type ThemeMode = 'dark' | 'light'

export interface ThemeOverrides {
  primaryColor?: string
  accentColor?: string
  glassIntensity?: number
  blur?: string
  animationSpeed?: 'instant' | 'fast' | 'normal' | 'slow' | 'slower'
  cornerRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  spacingScale?: number
}

export function applyThemeMode(mode: ThemeMode, root: HTMLElement = document.documentElement) {
  root.setAttribute('data-theme', mode)
}

export function applyThemeOverrides(overrides: ThemeOverrides, root: HTMLElement = document.documentElement) {
  if (overrides.primaryColor) root.style.setProperty('--color-accent', overrides.primaryColor)
  if (overrides.accentColor) root.style.setProperty('--color-accent-secondary', overrides.accentColor)
  if (overrides.glassIntensity != null) {
    root.style.setProperty('--color-glass', `rgba(248, 246, 241, ${overrides.glassIntensity})`)
  }
  if (overrides.blur) root.style.setProperty('--glass-blur', overrides.blur)
}

export async function themeTokensToCmsTheme(mode: ThemeMode = 'dark') {
  const isLight = mode === 'light'
  return {
    colors: {
      background: isLight ? '#F8F6F1' : '#0A0A0B',
      surface: isLight ? '#FFFFFF' : '#141416',
      text: isLight ? '#1A1A1A' : '#F8F6F1',
      textMuted: isLight ? '#6B6B6B' : '#A0A0A0',
      accent: '#C9B896',
      accentSecondary: '#B4838B',
      border: isLight ? '#E5E5E5' : '#2A2A2C',
    },
    spacing: theme.spacing,
    radius: theme.radius,
    typography: theme.typography,
  }
}
