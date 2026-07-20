import './LoadingFallback.css'

export default function LoadingFallback() {
  return (
    <div className="loading-fallback" role="status" aria-live="polite">
      Loading…
    </div>
  )
}
