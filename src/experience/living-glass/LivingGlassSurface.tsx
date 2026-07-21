import type { ReactNode } from 'react'
import { useAdaptiveAnimation } from '../adaptive'

export interface LivingGlassSurfaceProps {
  children: ReactNode
  className?: string
  depth?: 'surface' | 'elevated' | 'deep'
  interactive?: boolean
}

/** Applies unified Living Glass material tokens with adaptive blur budget. */
export default function LivingGlassSurface({
  children,
  className,
  depth = 'surface',
  interactive = false,
}: LivingGlassSurfaceProps) {
  const { blurBudget } = useAdaptiveAnimation()
  const classes = [
    'living-glass',
    `cx-lg-depth--${depth}`,
    interactive ? 'living-glass--interactive' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div
      className={classes}
      style={{ ['--lg-glass-blur' as string]: blurBudget > 0 ? `${blurBudget}px` : '0px' }}
    >
      {children}
    </div>
  )
}
