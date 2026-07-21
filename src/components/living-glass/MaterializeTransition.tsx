import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

export interface MaterializeTransitionProps {
  children: ReactNode
}

/** Route-level materialization — sections fade in from mist on navigation. */
export default function MaterializeTransition({ children }: MaterializeTransitionProps) {
  const location = useLocation()

  return (
    <div key={location.pathname} className="lg-materialize">
      {children}
    </div>
  )
}
