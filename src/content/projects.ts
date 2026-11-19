export type ProjectOs = 'windows' | 'android'

export type ProjectLinks = {
  download?: string
  repo?: string
  store?: string
}

export type ProjectScreenshot = {
  file: string
  width: number
  height: number
}

export type ProjectRelease = {
  /** Update when publishing a new build in TolyaChernov/downloads. */
  os: ProjectOs
  /** Omit until a real semver is published. */
  version?: string
  sizeMb: number
  sha256?: string
}

export const projects = [
  {
    id: 'diary',
    accent: 'var(--c-diary)',
    platform: 'mobile' as const,
    stack: ['Flutter', 'Dart', 'Riverpod', 'Drift', 'SQLite'],
    links: {
      download:
        'https://github.com/TolyaChernov/downloads/releases/latest/download/calorie-calculator.apk',
    } as ProjectLinks,
    release: {
      os: 'android',
      sizeMb: 61.0,
      sha256:
        '2b3a48373fc323dec3bf1660163a97c34676311a1d2978c55df7b3350dcc012e',
    } satisfies ProjectRelease,
    screenshots: [
      { file: 'diary.webp', width: 1080, height: 2400 },
      { file: 'diary-2.webp', width: 1080, height: 2400 },
      { file: 'diary-3.webp', width: 1080, height: 2400 },
      { file: 'diary-4.webp', width: 1080, height: 2400 },
      { file: 'diary-5.webp', width: 1080, height: 2400 },
    ] satisfies ProjectScreenshot[],
  },
  {
    id: 'fastik',
    accent: 'var(--c-fastik)',
    platform: 'desktop' as const,
    stack: ['Tauri 2', 'Rust', 'Vue 3', 'TypeScript', 'SQLite'],
    links: {
      download:
        'https://github.com/TolyaChernov/downloads/releases/latest/download/fastik.exe',
    } as ProjectLinks,
    release: {
      os: 'windows',
      sizeMb: 12.3,
      sha256:
        '7697ac0817c25c4be880619d72c0937283a861277d18409f052aed2bbb1832c4',
    } satisfies ProjectRelease,
    screenshots: [
      { file: 'fastik.webp', width: 1280, height: 800 },
      { file: 'fastik-2.webp', width: 1280, height: 800 },
      { file: 'fastik-3.webp', width: 1280, height: 800 },
    ] satisfies ProjectScreenshot[],
  },
  {
    id: 'cutstock',
    accent: 'var(--c-cutstock)',
    platform: 'desktop' as const,
    stack: ['Wails', 'Go', 'Vue 3', 'TypeScript', 'SQLite'],
    links: {
      download:
        'https://github.com/TolyaChernov/downloads/releases/latest/download/cut_stock.exe',
    } as ProjectLinks,
    release: {
      os: 'windows',
      sizeMb: 18.5,
      sha256:
        '9fc852aab1cd5ca545c8c7f8047d633b6e44cf6a3e624d50d930420870ef7650',
    } satisfies ProjectRelease,
    screenshots: [
      { file: 'cutstock.webp', width: 1280, height: 800 },
      { file: 'cutstock-2.webp', width: 1280, height: 800 },
      { file: 'cutstock-3.webp', width: 1280, height: 800 },
      { file: 'cutstock-4.webp', width: 1280, height: 800 },
      { file: 'cutstock-5.webp', width: 1280, height: 800 },
      { file: 'cutstock-6.webp', width: 1280, height: 800 },
      { file: 'cutstock-7.webp', width: 1280, height: 800 },
    ] satisfies ProjectScreenshot[],
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
  siteUrl: 'https://tolyachernov.github.io',
  repoUrl: 'https://github.com/TolyaChernov/TolyaChernov.github.io',
  ogImage: 'https://tolyachernov.github.io/og.png',
} as const

export function langPath(lang: 'ru' | 'en'): string {
  return lang === 'en' ? '/en/' : '/'
}

export function absoluteUrl(path: string): string {
  const base = SITE.siteUrl.replace(/\/$/, '')
  if (!path || path === '/') return `${base}/`
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`
}
