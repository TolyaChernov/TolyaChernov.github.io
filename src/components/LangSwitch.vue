<script setup lang="ts">
import { useLang } from '../composables/useLang'
import type { Lang } from '../content/types'

const { lang, setLang, t } = useLang()

function select(code: Lang): void {
  setLang(code)
}
</script>

<template>
  <div class="switch" role="group" :aria-label="t.a11y.langSwitch">
    <button
      type="button"
      class="opt"
      :aria-pressed="lang === 'ru'"
      @click="select('ru')"
    >
      RU
    </button>
    <button
      type="button"
      class="opt"
      :aria-pressed="lang === 'en'"
      @click="select('en')"
    >
      EN
    </button>
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
}

.opt[aria-pressed='true'] {
  background: var(--surface-2);
  color: var(--text);
  box-shadow: inset 0 0 0 1px var(--border-strong);
}
</style>
