import type { Dictionary } from './types'

export const en: Dictionary = {
  meta: {
    title: 'Anatoly Chernov — apps for Windows, Linux, and Android',
    description:
      'My apps: Cut Stock, Fastik, and Food Diary. Download them here or reach me on Telegram.',
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
    role: 'Windows · Linux · Android',
    tagline:
      'I build apps for Windows, Linux, and Android. This page collects my projects — from engineering calculations and file search to a food diary.',
    projects: 'View projects',
    github: 'GitHub',
  },
  about: {
    prompt: '~/about',
    command: 'cat about.md',
    paragraphs: [
      'I am Anatoly. I build my own mobile and desktop apps. Among them are engineering tools, local file search, and a food diary. I care about apps that can work offline and keep data on the device.',
    ],
  },
  projects: {
    prompt: '~/projects',
    command: 'ls projects/',
    items: {
      diary: {
        name: 'Food Diary',
        platformLabel: 'Android',
        description:
          'Log meals and track calories with data stored locally on your device.',
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
        platformLabel: 'Windows',
        description:
          'Search files by name and content, including PDF, Word, and Excel.',
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
        platformLabel: 'Windows',
        description:
          'Engineering calculations for sheet, bar, tube, and shaped stock, plus a fits and tolerances reference.',
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
    heading: 'Get in touch',
    lead: 'Have a question about an app or an idea for a joint project? Message me on Telegram',
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
