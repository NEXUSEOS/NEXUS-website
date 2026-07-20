import { routes } from '@nexus/config'
import { websiteRoutes } from './websiteRoutes'

export interface FooterLinkConfig {
  label: string
  path: string
}

export interface FooterColumnConfig {
  title: string
  links: FooterLinkConfig[]
}

/** Production footer columns — all links resolve to real routes. */
export const websiteFooterColumns: FooterColumnConfig[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Studio', path: routes.studio.path },
      { label: 'Marketplace', path: routes.marketplace.path },
      { label: 'Atlas', path: routes.atlas.path },
      { label: 'Nova', path: routes.nova.path },
      { label: 'Sentinel', path: routes.sentinel.path },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Developer Portal', path: routes.developerPortal.path },
      { label: 'Documentation', path: websiteRoutes.docs.path },
      { label: 'SDK Docs', path: websiteRoutes.docsSdk.path },
      { label: 'API Reference', path: websiteRoutes.docsApi.path },
      { label: 'Downloads', path: routes.downloadCenter.path },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', path: websiteRoutes.blog.path },
      { label: 'Roadmap', path: routes.roadmap.path },
      { label: 'Release Notes', path: websiteRoutes.releases.path },
      { label: 'Changelog', path: websiteRoutes.changelog.path },
      { label: 'Contact', path: routes.contact.path },
    ],
  },
  {
    title: 'Partners',
    links: [
      { label: 'Sponsors', path: routes.sponsors.path },
      { label: 'Sponsorship Tiers', path: routes.sponsorTiers.path },
      { label: 'Sponsor Portal', path: routes.sponsorPortal.path },
      { label: 'Investors', path: websiteRoutes.investors.path },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: websiteRoutes.about.path },
      { label: 'Vision', path: websiteRoutes.vision.path },
      { label: 'Careers', path: websiteRoutes.careers.path },
      { label: 'Contact', path: routes.contact.path },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', path: websiteRoutes.privacy.path },
      { label: 'Terms', path: websiteRoutes.terms.path },
    ],
  },
]
