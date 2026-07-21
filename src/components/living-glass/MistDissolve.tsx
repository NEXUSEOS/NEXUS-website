import type { ReactNode } from 'react'

export interface MistDissolveProps {
  children: ReactNode
  active?: boolean
}

/** Wraps content that dissolves to particles/mist when closing. */
export default function MistDissolve({ children, active = false }: MistDissolveProps) {
  return (
    <div className={active ? 'lg-mist-dissolve' : undefined}>
      {children}
    </div>
  )
}
