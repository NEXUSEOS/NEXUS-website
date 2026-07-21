import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface LivingGlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

export default function LivingGlassButton({
  variant = 'primary',
  children,
  className,
  ...props
}: LivingGlassButtonProps) {
  const classes = [
    'button',
    'living-glass-button',
    `living-glass-button--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
