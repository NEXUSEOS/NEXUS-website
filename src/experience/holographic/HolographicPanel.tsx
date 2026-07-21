import type { ReactNode } from 'react'

export interface HolographicPanelProps {
  children: ReactNode
  className?: string
  pulse?: boolean
  label?: string
}

/** Holographic panel chrome with scan lines and edge glow. */
export default function HolographicPanel({ children, className, pulse = false, label }: HolographicPanelProps) {
  const classes = ['cx-hologram', 'mc-hologram', pulse ? 'mc-hologram--pulse' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {label ? <span className="cx-hologram__label">{label}</span> : null}
      <div className="cx-hologram__scanlines" aria-hidden="true" />
      {children}
    </div>
  )
}
