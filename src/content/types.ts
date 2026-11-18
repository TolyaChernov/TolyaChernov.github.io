import type { ProjectId } from './projects'
import type { StackGroupId } from './stack'

export type Lang = 'ru' | 'en'

export interface ProjectText {
  name: string
  platformLabel: string
  description: string
  screenshotAlt: string
  placeholder: string
  links: {
    download: string
    repo: string
    store: string
  }
}

export interface Dictionary {
  meta: {
    title: string
    description: string
  }
  header: {
    navLabel: string
    navProjects: string
    navStack: string
    navContact: string
    telegram: string
    openPalette: string
    brandAria: string
  }
  hero: {
    windowTitle: string
    command: string
    name: string
    role: string
    tagline: string
    telegram: string
    github: string
  }
  about: {
    prompt: string
    command: string
    paragraphs: string[]
    stats: { value: string; label: string }[]
  }
  services: {
    prompt: string
    command: string
    items: { name: string; description: string }[]
  }
  projects: {
    prompt: string
    command: string
    items: Record<ProjectId, ProjectText>
  }
  stack: {
    prompt: string
    command: string
    groups: Record<StackGroupId, string>
  }
  contact: {
    prompt: string
    command: string
    windowTitle: string
    heading: string
    lead: string
    telegramCommand: string
    github: string
  }
  footer: {
    copyright: string
    source: string
    exit: string
  }
  palette: {
    title: string
    placeholder: string
    empty: string
    hint: string
    closeKey: string
    items: {
      projects: string
      stack: string
      contact: string
      telegram: string
      github: string
      langRu: string
      langEn: string
    }
  }
  a11y: {
    skip: string
    langSwitch: string
    closePalette: string
  }
  notFound: {
    title: string
    message: string
    home: string
  }
}
