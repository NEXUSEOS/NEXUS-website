import { useCinematicTheme } from '../theme'

export interface AmbientLighting {
  hue: number
  nebulaPrimary: string
  nebulaSecondary: string
  bloom: string
  mode: string
}

/** Returns current volumetric lighting tokens from cinematic theme. */
export function useAmbientLighting(): AmbientLighting {
  const theme = useCinematicTheme()
  return {
    hue: theme.ambientHue,
    nebulaPrimary: theme.nebulaPrimary,
    nebulaSecondary: theme.nebulaSecondary,
    bloom: theme.bloom,
    mode: theme.mode,
  }
}
