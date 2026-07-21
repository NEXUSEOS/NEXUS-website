import type { ReactNode } from 'react'

export interface HolographicLabelProps {
  children: ReactNode
  floating?: boolean
}

/** Floating holographic label with subtle flicker. */
export default function HolographicLabel({ children, floating = true }: HolographicLabelProps) {
  return (
    <span className={`cx-hologram__label${floating ? ' cx-hologram__label--float' : ''}`}>
      {children}
    </span>
  )
}
