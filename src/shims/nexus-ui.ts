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

type Component<T> = import('react').ComponentType<T>

export const Button = null as unknown as Component<ButtonProps>
export const Container = null as unknown as Component<ContainerProps>
export const GlassPanel = null as unknown as Component<GlassPanelProps>
export const Heading = null as unknown as Component<HeadingProps>
export const Section = null as unknown as Component<SectionProps>
export const Text = null as unknown as Component<TextProps>
