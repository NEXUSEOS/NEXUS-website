import { useEffect } from 'react'

export interface StructuredDataProps {
  type?: 'WebSite' | 'Article' | 'TechArticle'
  name: string
  description: string
  url: string
  datePublished?: string
  author?: string
}

/** Injects JSON-LD structured metadata for SEO. */
export default function StructuredData({
  type = 'WebSite',
  name,
  description,
  url,
  datePublished,
  author,
}: StructuredDataProps) {
  useEffect(() => {
    const scriptId = 'nexus-structured-data'
    let script = document.getElementById(scriptId) as HTMLScriptElement | null

    const payload: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': type,
      name,
      description,
      url,
    }

    if (datePublished) payload.datePublished = datePublished
    if (author) payload.author = { '@type': 'Organization', name: author }

    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(payload)

    return () => {
      script?.remove()
    }
  }, [type, name, description, url, datePublished, author])

  return null
}
