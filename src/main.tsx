import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@nexus/design-system/globals.css'
import '@nexus/theme/globals.css'
import './styles/living-glass.css'
import Bootstrap from './Bootstrap'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Bootstrap />
  </StrictMode>,
)
