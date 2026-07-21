import type { ReactNode } from 'react'
import { useCinematicTheme } from '../theme'
import { useAdaptiveAnimation } from '../adaptive'

export interface VolumetricLayerProps {
  children?: ReactNode
  className?: string
  intensity?: 'subtle' | 'medium' | 'strong'
  variant?: 'nebula' | 'spotlight' | 'fog'
}

/** CSS gradient volumetric lighting layer tied to cinematic theme. */
export default function VolumetricLayer({
  children,
  className,
  intensity = 'medium',
  variant = 'nebula',
}: VolumetricLayerProps) {
  const theme = useCinematicTheme()
  const { reducedMotion } = useAdaptiveAnimation()
  const classes = [
    'cx-volumetric',
    `cx-volumetric--${variant}`,
    `cx-volumetric--${intensity}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <div
      className={classes}
      data-cinematic-mode={theme.mode}
      data-reduced-motion={reducedMotion ? 'true' : undefined}
      aria-hidden={children ? undefined : true}
    >
      {children}
    </div>
  )
}
