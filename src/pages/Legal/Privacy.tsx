import { MarketingPage } from '../../components/marketing'
import LegalDocument from '../../components/legal/LegalDocument'
import { websiteRoutes } from '../../config'
import { privacySections } from '../../content/legalContent'
import { productPages } from '../../content/productPages'

export default function Privacy() {
  const content = productPages.privacy
  return (
    <MarketingPage route={websiteRoutes.privacy} {...content}>
      <LegalDocument sections={privacySections} />
    </MarketingPage>
  )
}
