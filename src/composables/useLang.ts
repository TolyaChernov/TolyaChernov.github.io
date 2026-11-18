import { computed, ref, watch } from 'vue'
import { en } from '../content/en'
import { ru } from '../content/ru'
import type { Dictionary, Lang } from '../content/types'
import { track } from '../analytics'

const STORAGE_KEY = 'site-lang'

const dictionaries: Record<Lang, Dictionary> = { ru, en }

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ru' || saved === 'en') return saved
  } catch {
    // ignore
  }
  try {
    const nav = navigator.language.toLowerCase()
    return nav.startsWith('ru') ? 'ru' : 'en'
  } catch {
    return 'en'
  }
}

const lang = ref<Lang>(detectLang())

function applyMeta(dict: Dictionary, code: Lang): void {
  document.documentElement.lang = code
  document.title = dict.meta.title

  const setMeta = (selector: string, attr: string, value: string) => {
    const el = document.querySelector(selector)
    if (el) el.setAttribute(attr, value)
  }

  setMeta('meta[name="description"]', 'content', dict.meta.description)
  setMeta('meta[property="og:title"]', 'content', dict.meta.title)
  setMeta('meta[property="og:description"]', 'content', dict.meta.description)
  setMeta('meta[name="twitter:title"]', 'content', dict.meta.title)
  setMeta('meta[name="twitter:description"]', 'content', dict.meta.description)
  setMeta(
    'meta[property="og:locale"]',
    'content',
    code === 'ru' ? 'ru_RU' : 'en_US',
  )
}

applyMeta(dictionaries[lang.value], lang.value)

watch(lang, (value, prev) => {
  applyMeta(dictionaries[value], value)
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // ignore
  }
  if (prev !== undefined && prev !== value) {
    track('lang_change', { lang: value })
  }
})

export function useLang() {
  const t = computed(() => dictionaries[lang.value])

  function setLang(next: Lang): void {
    lang.value = next
  }

  function toggleLang(): void {
    lang.value = lang.value === 'ru' ? 'en' : 'ru'
  }

  return { lang, t, setLang, toggleLang }
}
