import type { CSSProperties, ReactNode } from 'react'
import { useParticleMaterialize, type ParticleMaterializeOptions } from './useParticleMaterialize'

export interface ParticleMaterializeProps extends ParticleMaterializeOptions {
  children: ReactNode
  className?: string
  style?: CSSProperties
  as?: 'div' | 'section' | 'article' | 'li'
}

/** Reusable wrapper for staggered element entrance with CSS/canvas fallback. */
export default function ParticleMaterialize({
  children,
  className,
  style,
  as: Tag = 'div',
  ...options
}: ParticleMaterializeProps) {
  const { className: materializeClass, style: materializeStyle } = useParticleMaterialize(options)
  const classes = [materializeClass, className].filter(Boolean).join(' ')

  return (
    <Tag className={classes || undefined} style={{ ...materializeStyle, ...style }}>
      {children}
    </Tag>
  )
}
