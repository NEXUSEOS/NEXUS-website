import { company } from '../../config'
import './SkipLink.css'

export default function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to {company.shortName} main content
    </a>
  )
}
