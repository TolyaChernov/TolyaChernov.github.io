<script setup lang="ts">
import { useLang } from '../composables/useLang'
import type { Lang } from '../content/types'
import { langPath } from '../content/projects'

const { lang, setLang, t } = useLang()

function onClick(e: MouseEvent, code: Lang): void {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
    return
  }
  e.preventDefault()
  setLang(code, { via: 'switch' })
}
</script>

<template>
  <div class="switch" role="group" :aria-label="t.a11y.langSwitch">
    <a
      class="opt"
      :href="langPath('ru')"
      hreflang="ru"
      :aria-current="lang === 'ru' ? 'page' : undefined"
      @click="onClick($event, 'ru')"
    >
      RU
    </a>
    <a
      class="opt"
      :href="langPath('en')"
      hreflang="en"
      :aria-current="lang === 'en' ? 'page' : undefined"
      @click="onClick($event, 'en')"
    >
      EN
    </a>
  </div>
</template>

<style scoped>
.switch {
  display: inline-flex;
  padding: 0.15rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  background: var(--surface);
}

.opt {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  font-weight: 700;
  padding: 0.35rem 0.65rem;
  border-radius: var(--radius-pill);
  cursor: pointer;
  text-decoration: none;
}

.opt[aria-current='page'] {
  background: var(--surface-2);
  color: var(--text);
  box-shadow: inset 0 0 0 1px var(--border-strong);
}
</style>
