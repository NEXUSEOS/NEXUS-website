import { MarketingPage } from '../components/marketing'
import type { RouteConfig } from '../config'
import { productPages } from './productPages'

export function createProductPage(route: RouteConfig, key: keyof typeof productPages) {
  const content = productPages[key]
  return function ProductPage() {
    return <MarketingPage route={route} {...content} />
  }
}
