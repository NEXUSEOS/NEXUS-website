import type { HTMLAttributes, ReactNode } from 'react'

export interface LivingGlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  interactive?: boolean
}

export default function LivingGlassCard({
  children,
  interactive = true,
  className,
  ...props
}: LivingGlassCardProps) {
  const classes = [
    'living-glass',
    'living-glass-card',
    interactive ? 'living-glass--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
