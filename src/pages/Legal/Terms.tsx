import { MarketingPage } from '../../components/marketing'
import LegalDocument from '../../components/legal/LegalDocument'
import { websiteRoutes } from '../../config'
import { termsSections } from '../../content/legalContent'
import { productPages } from '../../content/productPages'

export default function Terms() {
  const content = productPages.terms
  return (
    <MarketingPage route={websiteRoutes.terms} {...content}>
      <LegalDocument sections={termsSections} />
    </MarketingPage>
  )
}
