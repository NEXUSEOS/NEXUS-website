export interface ParticleLoaderProps {
  label?: string
}

/** Loading skeleton — particles assemble into view. */
export default function ParticleLoader({ label = 'Materializing' }: ParticleLoaderProps) {
  return (
    <div className="lg-particle-loader" role="status" aria-live="polite">
      <div>
        <div style={{ display: 'flex', gap: 'var(--spacing-3)', justifyContent: 'center' }}>
          <span className="lg-particle-loader__dot" />
          <span className="lg-particle-loader__dot" />
          <span className="lg-particle-loader__dot" />
          <span className="lg-particle-loader__dot" />
          <span className="lg-particle-loader__dot" />
        </div>
        <p className="lg-particle-loader__label">{label}</p>
      </div>
    </div>
  )
}
