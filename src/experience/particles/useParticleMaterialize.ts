import { useMemo, type CSSProperties } from 'react'
import { useAdaptiveAnimation } from '../adaptive'

export type MaterializeVariant = 'fade' | 'ripple' | 'assembly' | 'stagger'

export interface ParticleMaterializeOptions {
  variant?: MaterializeVariant
  index?: number
  staggerMs?: number
}

/** Returns CSS classes and inline style for element entrance animations. */
export function useParticleMaterialize(options: ParticleMaterializeOptions = {}) {
  const { reducedMotion } = useAdaptiveAnimation()
  const { variant = 'fade', index = 0, staggerMs = 80 } = options

  return useMemo(() => {
    if (reducedMotion) {
      return { className: '', style: undefined as CSSProperties | undefined }
    }

    const classes = ['cx-materialize']
    if (variant === 'stagger' || variant === 'assembly') {
      classes.push('cx-materialize--stagger')
    }
    if (variant === 'ripple') classes.push('cx-materialize--ripple')

    return {
      className: classes.join(' '),
      style: { animationDelay: `${index * staggerMs}ms` } as CSSProperties,
    }
  }, [reducedMotion, variant, index, staggerMs])
}
