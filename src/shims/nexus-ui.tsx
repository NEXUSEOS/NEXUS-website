import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  level?: 'display' | 'heading' | 'title'
  children: ReactNode
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  variant?: 'default' | 'compact' | 'flush'
}

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div'
  variant?: 'body' | 'caption' | 'muted'
  children: ReactNode
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`button living-glass-button living-glass-button--${variant}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={`container${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </div>
  )
}

export function GlassPanel({ children, className, ...props }: GlassPanelProps) {
  return (
    <div className={`living-glass living-glass-panel glass-panel${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </div>
  )
}

export function Heading({ as: Tag = 'h2', level: _level, children, className, ...props }: HeadingProps) {
  return (
    <Tag className={`heading${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </Tag>
  )
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={`section${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </section>
  )
}

export function Text({ as: Tag = 'p', variant = 'body', children, className, ...props }: TextProps) {
  return (
    <Tag className={`text text--${variant}${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </Tag>
  )
}
