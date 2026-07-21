import type { HTMLAttributes, ReactNode } from 'react'

export interface LivingGlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/** Drop-in visual upgrade for GlassPanel — same children/props pattern. */
export default function LivingGlassPanel({ children, className, ...props }: LivingGlassPanelProps) {
  const classes = ['living-glass', 'living-glass-panel', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
