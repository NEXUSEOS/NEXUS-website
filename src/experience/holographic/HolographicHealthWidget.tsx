import type { ReactNode } from 'react'

export interface HolographicHealthWidgetProps {
  label: string
  value: string | number
  status?: 'healthy' | 'degraded' | 'critical' | 'unknown'
  children?: ReactNode
}

const STATUS_CLASS: Record<NonNullable<HolographicHealthWidgetProps['status']>, string> = {
  healthy: 'cx-health--healthy',
  degraded: 'cx-health--degraded',
  critical: 'cx-health--critical',
  unknown: 'cx-health--unknown',
}

/** Animated health widget for Mission Control and Command Center. */
export default function HolographicHealthWidget({
  label,
  value,
  status = 'unknown',
  children,
}: HolographicHealthWidgetProps) {
  return (
    <div className={`cx-health cx-hologram mc-hologram ${STATUS_CLASS[status]}`} role="status">
      <span className="cx-hologram__label">{label}</span>
      <div className="cx-hologram__scanlines" aria-hidden="true" />
      <strong className="cx-health__value mc-stat-value">{value}</strong>
      {children}
    </div>
  )
}
