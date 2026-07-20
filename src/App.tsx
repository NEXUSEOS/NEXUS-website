import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'
import ScrollToTop from './router/ScrollToTop'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  )
}
