import {
  absoluteUrl,
  langPath,
  projects,
  SITE,
  type Project,
} from './content/projects'
import { en } from './content/en'
import { ru } from './content/ru'
import type { Lang } from './content/types'

const dictionaries = { ru, en } as const

const OS_LABEL: Record<string, string> = {
  windows: 'Windows',
  android: 'Android',
}

export function buildJsonLd(lang: Lang): Record<string, unknown> {
  const dict = dictionaries[lang]
  const personId = `${SITE.siteUrl}/#person`
  const pageUrl = absoluteUrl(langPath(lang))

  const softwareApps = (projects as readonly Project[]).map((project) => {
    const text = dict.projects.items[project.id]
    const download = project.links.download
    const shot = project.screenshots[0]
    const screenshotUrl = shot
      ? absoluteUrl(`/projects/${shot.file}`)
      : undefined

    return {
      '@type': 'SoftwareApplication',
      '@id': `${SITE.siteUrl}/#app-${project.id}`,
      name: text.name,
      description: text.description,
      applicationCategory:
        project.platform === 'mobile'
          ? 'LifestyleApplication'
          : 'BusinessApplication',
      operatingSystem: OS_LABEL[project.release.os] ?? project.release.os,
      downloadUrl: download,
      ...(project.release.version
        ? { softwareVersion: project.release.version }
        : {}),
      fileSize: `${project.release.sizeMb} MB`,
      screenshot: screenshotUrl,
      author: { '@id': personId },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    }
  })

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE.nameRu,
        alternateName: SITE.nameEn,
        url: SITE.siteUrl + '/',
        jobTitle: 'Software Developer',
        image: SITE.ogImage,
        sameAs: [SITE.github, SITE.telegram],
        knowsAbout: [
          'Flutter',
          'Dart',
          'Tauri',
          'Rust',
          'Wails',
          'Go',
          'Vue',
          'TypeScript',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${pageUrl}#website`,
        name: dict.meta.title,
        url: pageUrl,
        description: dict.meta.description,
        inLanguage: lang === 'ru' ? 'ru-RU' : 'en-US',
        publisher: { '@id': personId },
      },
      ...softwareApps,
    ],
  }
}
