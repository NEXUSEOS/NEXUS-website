import type { ReactNode } from 'react'
import type { CmsPageLayout, CmsTheme } from './nexus-sdk-cms'

export type CmsPreviewBreakpoint = 'desktop' | 'tablet' | 'mobile'

export interface CmsPageRendererProps {
  layout: CmsPageLayout
  breakpoint?: CmsPreviewBreakpoint
  selectedComponentId?: string
  onSelectComponent?: (sectionIndex: number, componentIndex: number) => void
  editMode?: boolean
  cloudBaseUrl?: string
  onFormSubmit?: (formId: string, payload: Record<string, unknown>) => void | Promise<void>
}

export function CmsPageRenderer({ layout, breakpoint = 'desktop' }: CmsPageRendererProps) {
  return (
    <article className={`cms-page cms-page--${breakpoint}`} aria-label="CMS page content">
      {layout.sections.map((section) => (
        <section key={section.sectionKey} className="cms-section" aria-label={section.title ?? section.sectionKey}>
          {section.title ? <h2 className="cms-section__title">{section.title}</h2> : null}
          <div className="cms-section__components">
            {section.components.map((component, index) => (
              <div key={component.id ?? `${section.sectionKey}-${index}`} className="cms-component-wrap">
                <div className={`cms-component cms-component--${component.componentType}`}>
                  {String(component.props.title ?? component.componentType)}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </article>
  )
}

export function CmsThemeProvider({
  children,
  mode = 'dark',
}: {
  theme: CmsTheme | null
  mode?: 'light' | 'dark'
  children: ReactNode
}) {
  return <div className={`cms-themed cms-themed--${mode}`}>{children}</div>
}

export function useCmsTheme() {
  return { theme: null as CmsTheme | null, mode: 'dark' as const }
}

export function renderCmsComponent(
  componentType: string,
  props: Record<string, unknown>,
  key: string,
): ReactNode {
  return (
    <div key={key} className={`cms-component cms-component--${componentType}`}>
      {String(props.title ?? componentType)}
    </div>
  )
}
