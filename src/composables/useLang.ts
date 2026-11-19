import { computed, ref, watch } from 'vue'
import { absoluteUrl, langPath, SITE } from '../content/projects'
import { en } from '../content/en'
import { ru } from '../content/ru'
import type { Dictionary, Lang } from '../content/types'
import { track } from '../analytics'

const dictionaries: Record<Lang, Dictionary> = { ru, en }

export function pathToLang(pathname: string): Lang {
  const path = pathname.replace(/\/+$/, '') || '/'
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'ru'
}

function detectLang(): Lang {
  if (typeof window === 'undefined') return 'ru'
  return pathToLang(window.location.pathname)
}

const lang = ref<Lang>(detectLang())

export function applyMeta(dict: Dictionary, code: Lang): void {
  if (typeof document === 'undefined') return

  document.documentElement.lang = code
  document.title = dict.meta.title

  const setMeta = (selector: string, attr: string, value: string) => {
    const el = document.querySelector(selector)
    if (el) el.setAttribute(attr, value)
  }

  const url = absoluteUrl(langPath(code))
  const locale = code === 'ru' ? 'ru_RU' : 'en_US'
  const altLocale = code === 'ru' ? 'en_US' : 'ru_RU'

  setMeta('meta[name="description"]', 'content', dict.meta.description)
  setMeta('meta[property="og:title"]', 'content', dict.meta.title)
  setMeta('meta[property="og:description"]', 'content', dict.meta.description)
  setMeta('meta[property="og:url"]', 'content', url)
  setMeta('meta[property="og:locale"]', 'content', locale)
  setMeta('meta[property="og:locale:alternate"]', 'content', altLocale)
  setMeta('meta[name="twitter:title"]', 'content', dict.meta.title)
  setMeta('meta[name="twitter:description"]', 'content', dict.meta.description)
  setMeta('link[rel="canonical"]', 'href', url)
}

export function getHead(langCode: Lang): {
  lang: Lang
  title: string
  description: string
  url: string
  locale: string
  alternateLocale: string
  ogImage: string
} {
  const dict = dictionaries[langCode]
  return {
    lang: langCode,
    title: dict.meta.title,
    description: dict.meta.description,
    url: absoluteUrl(langPath(langCode)),
    locale: langCode === 'ru' ? 'ru_RU' : 'en_US',
    alternateLocale: langCode === 'ru' ? 'en_US' : 'ru_RU',
    ogImage: SITE.ogImage,
  }
}

if (typeof document !== 'undefined') {
  applyMeta(dictionaries[lang.value], lang.value)
}

watch(lang, (value) => {
  applyMeta(dictionaries[value], value)
})

export function setLangState(next: Lang): void {
  lang.value = next
}

export function useLang() {
  const t = computed(() => dictionaries[lang.value])

  function setLang(
    next: Lang,
    options: { via?: 'switch' | 'palette'; navigate?: boolean } = {},
  ): void {
    const from = lang.value
    const navigate = options.navigate !== false
    if (from === next) {
      if (navigate && typeof window !== 'undefined') {
        const path = langPath(next)
        if (pathToLang(window.location.pathname) !== next) {
          history.pushState({ lang: next }, '', path)
        }
      }
      return
    }

    lang.value = next

    if (navigate && typeof window !== 'undefined') {
      history.pushState({ lang: next }, '', langPath(next))
    }

    if (options.via && from !== next) {
      track('lang_change', { from, to: next, via: options.via })
    }
  }

  function syncFromLocation(): void {
    if (typeof window === 'undefined') return
    const next = pathToLang(window.location.pathname)
    if (next !== lang.value) lang.value = next
  }

  return { lang, t, setLang, syncFromLocation, langPath }
}
