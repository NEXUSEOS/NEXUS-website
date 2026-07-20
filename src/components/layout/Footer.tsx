import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { company, socialLinks } from '../../config'
import { websiteFooterColumns } from '../../config/websiteFooter'
import { fetchPublishedFooter } from '../../services/cms/cmsContentService'
import { Container, Heading, Text } from '../ui'
import './Footer.css'

interface FooterColumn {
  title: string
  links: Array<{ label: string; path: string }>
}

function isExternalLink(href: string): boolean {
  return href.startsWith('http')
}

export default function Footer() {
  const [columns, setColumns] = useState<FooterColumn[]>([])
  const [copyright, setCopyright] = useState<string>(company.copyright)

  useEffect(() => {
    fetchPublishedFooter('website')
      .then((footer) => {
        const data = footer as { columns?: FooterColumn[]; copyrightText?: string | null }
        if (Array.isArray(data.columns)) setColumns(data.columns)
        if (data.copyrightText) setCopyright(data.copyrightText)
      })
      .catch(() => setColumns(websiteFooterColumns))
  }, [])

  const resolvedColumns = columns.length > 0 ? columns : websiteFooterColumns

  const socialColumn = {
    title: 'Social',
    links: socialLinks.map((link) => ({ label: link.label, path: link.href })),
  }

  const allColumns = [...resolvedColumns, socialColumn]

  return (
    <footer className="footer">
      <Container>
        <div className="footer__intro">
          <Heading as="h2" level="title">
            {company.name}
          </Heading>
          <Text variant="muted">{company.tagline}</Text>
        </div>

        <div className="footer__grid">
          {allColumns.map((column) => (
            <div key={column.title}>
              <Heading as="h3" level="title" className="footer__column-title">
                {column.title}
              </Heading>
              <ul className="footer__links">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    {isExternalLink(link.path) ? (
                      <a
                        href={link.path}
                        className="footer__link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.path} className="footer__link">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <Text variant="caption">{copyright}</Text>
          <div className="footer__social" aria-label="Social media links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
