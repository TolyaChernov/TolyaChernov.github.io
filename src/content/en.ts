import type { Dictionary } from './types'

/** TODO(owner): review and edit all copy about yourself */
export const en: Dictionary = {
  meta: {
    title: 'Anatoly Chernov — mobile & desktop development',
    description:
      'Software developer: Flutter, desktop (Tauri, Wails), and web. Portfolio and contact via Telegram.',
  },
  header: {
    navLabel: 'Primary',
    navProjects: 'projects',
    navStack: 'stack',
    navContact: 'contact',
    telegram: 'Telegram',
    openPalette: 'Command palette',
    brandAria: 'Anatoly Chernov — home',
  },
  hero: {
    windowTitle: '~/whoami',
    command: '$ whoami',
    name: 'Anatoly Chernov',
    role: 'software developer',
    tagline:
      'Custom software — mobile, desktop, and web: CRM, ops tools, accounting, online and offline.',
    telegram: 'Message on Telegram',
    github: 'GitHub',
  },
  about: {
    prompt: '~/about',
    command: 'cat about.md',
    paragraphs: [
      'I build software to order: mobile, desktop, and web — online and offline. CRM, internal tools, production, inventory, staff accounting, reporting, and day-to-day utilities.',
      'From scenarios to release. Stack by the job: Flutter, Tauri / Wails, web. Solo or in a team — owning the product or joining an existing codebase.',
    ],
    stats: [
      { value: '3+', label: 'years of experience' }, // TODO(owner)
      { value: '3', label: 'platforms' },
    ],
  },
  services: {
    prompt: '~/services',
    command: 'ls services/',
    items: [
      {
        name: 'mobile/',
        description: 'Mobile apps with Flutter',
      },
      {
        name: 'desktop/',
        description: 'Desktop: Tauri, Wails, Windows and Linux',
      },
      {
        name: 'web/',
        description: 'Web: frontend and backend',
      },
      {
        name: 'support/',
        description: 'Feature work and maintenance for existing products',
      },
    ],
  },
  projects: {
    prompt: '~/projects',
    command: 'ls projects/',
    items: {
      diary: {
        name: 'Food Diary',
        platformLabel: 'Mobile · Flutter',
        description:
          // TODO(owner)
          'Meal tracking with a local database and a web product catalog. Offline-first, no clutter.',
        screenshotAlt: 'Food Diary app screenshot',
        placeholder: 'screenshot pending — diary',
        links: {
          download: 'Download',
          repo: 'Repository',
          store: 'Store',
        },
      },
      fastik: {
        name: 'Fastik',
        platformLabel: 'Desktop · Tauri',
        description:
          // TODO(owner)
          'Local search by name and content: AND / OR / NOT, filters, indexing. Reads PDF, Excel, Word, HTML.',
        screenshotAlt: 'Fastik app screenshot',
        placeholder: 'screenshot pending — fastik',
        links: {
          download: 'Download',
          repo: 'Repository',
          store: 'Store',
        },
      },
      cutstock: {
        name: 'Cut Stock',
        platformLabel: 'Desktop · Windows / Linux',
        description:
          // TODO(owner)
          'Process-engineer helper: sheet, bar, tube, shaped stock. Fits & tolerances ISO 286 / GOST 25346, catalogs, saved calculations.',
        screenshotAlt: 'Cut Stock app screenshot',
        placeholder: 'screenshot pending — cut stock',
        links: {
          download: 'Download',
          repo: 'Repository',
          store: 'Store',
        },
      },
    },
  },
  stack: {
    prompt: '~/stack',
    command: 'cat stack.txt',
    groups: {
      mobile: 'Mobile',
      desktop: 'Desktop',
      web: 'Web',
      backend: 'Backend / Tools',
    },
  },
  contact: {
    prompt: '~/contact',
    command: './connect',
    windowTitle: 'contact.sh',
    heading: 'Ready to talk about your project',
    lead: 'Send a short brief — I reply on Telegram.',
    telegramCommand: 'contact --telegram @anatoli_chernov',
    github: 'github.com/TolyaChernov',
  },
  footer: {
    copyright: '© {year} Anatoly Chernov',
    source: 'site source',
    exit: 'exit 0',
  },
  palette: {
    title: 'Command palette',
    placeholder: 'Find a section or action…',
    empty: 'Nothing found',
    hint: '↑↓ select · Enter open · Esc close',
    closeKey: 'Esc',
    items: {
      projects: 'Go to projects',
      stack: 'Go to stack',
      contact: 'Go to contact',
      telegram: 'Open Telegram',
      github: 'Open GitHub',
      langRu: 'Language: русский',
      langEn: 'Language: English',
    },
  },
  a11y: {
    skip: 'Skip to content',
    langSwitch: 'Language',
    closePalette: 'Close palette',
  },
  notFound: {
    title: '404 — page not found',
    message: 'This path does not exist. Head back home.',
    home: 'Home',
  },
}
