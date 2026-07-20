interface PortalMetricCardProps {
  label: string
  value: string | number
}

export default function PortalMetricCard({ label, value }: PortalMetricCardProps) {
  return (
    <div className="portal-metric">
      <p className="portal-metric__label">{label}</p>
      <p className="portal-metric__value">{value}</p>
    </div>
  )
}
