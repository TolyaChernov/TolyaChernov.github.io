import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'
import { vReveal } from './composables/useReveal'
import { getHead, setLangState } from './composables/useLang'
import { buildJsonLd } from './seo'
import type { Lang } from './content/types'

import './styles/tokens.css'
import './styles/base.css'

export async function render(lang: Lang): Promise<{
  html: string
  head: ReturnType<typeof getHead>
  jsonLd: Record<string, unknown>
}> {
  setLangState(lang)

  const app = createSSRApp(App)
  app.directive('reveal', vReveal)

  const ctx = {}
  const html = await renderToString(app, ctx)

  return {
    html,
    head: getHead(lang),
    jsonLd: buildJsonLd(lang),
  }
}
