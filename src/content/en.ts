import type { Dictionary } from './types'

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
    role: 'Flutter / Tauri / Wails developer',
    tagline:
      'Custom software — mobile, desktop, and web: CRM, ops tools, accounting, online and offline.',
    telegram: 'Message on Telegram',
    github: 'GitHub',
  },
  about: {
    prompt: '~/about',
    command: 'cat about.md',
    paragraphs: [
      'I am Anatoly. I build apps to order: mobile with Flutter, desktop with Tauri and Wails, web with Vue. Most often these are work tools — accounting, inventory, production, reporting, CRM.',
      'I take a job from scenarios to release: clarify how people will use the app, ship a prototype, finish a build, and support it after launch. I am comfortable with offline-first apps and a local database.',
      'Fastik, Cut Stock, and Food Diary are public — download them below and try them yourself.',
    ],
    stats: [{ value: '3', label: 'apps available to download' }],
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
        platformLabel: 'Desktop · Windows',
        description:
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
    release: {
      version: 'v{version}',
      size: '{size} MB',
      os: {
        windows: 'Windows',
        android: 'Android',
      },
    },
    installNote: {
      summary: 'Warning when opening the file?',
      windows:
        'The file is not code-signed. Windows SmartScreen may show a warning — click More info, then Run anyway.',
      android:
        'Allow installs from unknown sources for your browser or file manager. Play Protect may ask for confirmation.',
      sha256: 'SHA-256',
    },
    gallery: {
      open: 'Open screenshot',
      close: 'Close',
      prev: 'Previous screenshot',
      next: 'Next screenshot',
      thumb: 'Screenshot {n}',
      of: '{name}: screenshot {n} of {total}',
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
    newTab: '(opens in a new tab)',
  },
  notFound: {
    title: '404 — page not found',
    message: 'This path does not exist. Head back home.',
    home: 'Home',
  },
}
