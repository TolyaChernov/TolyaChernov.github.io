export const projects = [
  {
    id: 'diary',
    accent: 'var(--c-diary)',
    platform: 'mobile',
    stack: ['Flutter', 'Dart', 'Riverpod', 'Drift', 'SQLite'],
    links: {} as {
      download?: string
      repo?: string
      store?: string
    },
    screenshot: {
      file: 'diary.webp',
      width: 1080,
      height: 2400,
    },
  },
  {
    id: 'fastik',
    accent: 'var(--c-fastik)',
    platform: 'desktop',
    stack: ['Tauri 2', 'Rust', 'Vue 3', 'TypeScript', 'SQLite'],
    links: {} as {
      download?: string
      repo?: string
      store?: string
    },
    screenshot: {
      file: 'fastik.webp',
      width: 1280,
      height: 800,
    },
  },
  {
    id: 'cutstock',
    accent: 'var(--c-cutstock)',
    platform: 'desktop',
    stack: ['Wails', 'Go', 'Vue 3', 'TypeScript', 'SQLite'],
    links: {} as {
      download?: string
      repo?: string
      store?: string
    },
    screenshot: {
      file: 'cutstock.webp',
      width: 1280,
      height: 800,
    },
  },
] as const

export type ProjectId = (typeof projects)[number]['id']
export type Project = (typeof projects)[number]

export const SITE = {
  nameRu: 'Анатолий Чернов',
  nameEn: 'Anatoly Chernov',
  telegram: 'https://t.me/anatoli_chernov',
  telegramHandle: '@anatoli_chernov',
  github: 'https://github.com/TolyaChernov',
  githubHandle: 'TolyaChernov',
  siteUrl: 'https://tolyachernov.github.io/',
  repoUrl: 'https://github.com/TolyaChernov/TolyaChernov.github.io',
} as const
