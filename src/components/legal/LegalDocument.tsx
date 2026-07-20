import type { LegalSection } from '../../content/legalContent'
import { GlassPanel, Heading, Text } from '../ui'
import './LegalDocument.css'

interface LegalDocumentProps {
  sections: LegalSection[]
}

export default function LegalDocument({ sections }: LegalDocumentProps) {
  return (
    <div className="legal-document">
      {sections.map((section) => (
        <GlassPanel key={section.title} className="legal-document__section">
          <Heading as="h2" level="title">{section.title}</Heading>
          {section.paragraphs.map((paragraph) => (
            <Text key={paragraph.slice(0, 40)} variant="muted" className="legal-document__paragraph">
              {paragraph}
            </Text>
          ))}
        </GlassPanel>
      ))}
    </div>
  )
}
