import { Heading, Text } from '@nexus/ui'

export function MdxLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="mdx-content">
      <Heading as="h1" level="heading">
        {title}
      </Heading>
      <div className="mdx-content__body">{children}</div>
    </article>
  )
}

export function MdxCallout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="mdx-callout">
      <Text variant="body">{children}</Text>
    </aside>
  )
}
