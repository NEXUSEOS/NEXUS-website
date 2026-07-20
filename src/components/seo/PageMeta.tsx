import { useEffect } from 'react'
import { company, defaultSeo, getSiteUrl } from '../../config'

export interface PageMetaProps {
  title?: string
  description?: string
  path?: string
}

function upsertMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  const selector = `meta[${attribute}="${name}"]`
  let element = document.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

/**
 * PageMeta — Sets document title, meta description, Open Graph, and Twitter tags.
 */
export default function PageMeta({ title, description, path = '' }: PageMetaProps) {
  const pageTitle = title ? `${title} | ${company.shortName}` : defaultSeo.title
  const pageDescription = description ?? defaultSeo.description

  useEffect(() => {
    const siteUrl = getSiteUrl()
    const normalizedPath = path === '/' ? '' : path
    const canonicalUrl = `${siteUrl}${normalizedPath}`

    document.title = pageTitle
    upsertMeta('description', pageDescription)
    upsertMeta('og:title', pageTitle, 'property')
    upsertMeta('og:description', pageDescription, 'property')
    upsertMeta('og:type', defaultSeo.ogType, 'property')
    upsertMeta('og:url', canonicalUrl, 'property')
    upsertMeta('og:image', `${siteUrl}${defaultSeo.ogImage}`, 'property')
    upsertMeta('twitter:card', defaultSeo.twitterCard)
    upsertMeta('twitter:title', pageTitle)
    upsertMeta('twitter:description', pageDescription)
  }, [pageTitle, pageDescription, path])

  return null
}
