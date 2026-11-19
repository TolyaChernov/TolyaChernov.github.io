<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { SITE } from '../content/projects'
import { useLang } from '../composables/useLang'
import BrandMark from './BrandMark.vue'
import CtaButton from './CtaButton.vue'
import LangSwitch from './LangSwitch.vue'

const emit = defineEmits<{
  openPalette: []
}>()

const { t } = useLang()
const active = ref<string>('')
let sectionObserver: IntersectionObserver | null = null

onMounted(() => {
  const ids = ['projects', 'stack', 'contact']
  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target.id) active.value = visible.target.id
    },
    { rootMargin: '-30% 0px -50% 0px', threshold: [0.1, 0.35, 0.6] },
  )
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) sectionObserver.observe(el)
  }
})

onBeforeUnmount(() => {
  sectionObserver?.disconnect()
})
</script>

<template>
  <header class="header">
    <div class="inner container">
      <BrandMark :title="t.header.brandAria" />

      <nav class="nav" :aria-label="t.header.navLabel">
        <a href="#projects" :class="{ active: active === 'projects' }">{{
          t.header.navProjects
        }}</a>
        <a href="#stack" :class="{ active: active === 'stack' }">{{
          t.header.navStack
        }}</a>
        <a href="#contact" :class="{ active: active === 'contact' }">{{
          t.header.navContact
        }}</a>
      </nav>

      <div class="actions">
        <LangSwitch />
        <button
          type="button"
          class="palette-btn"
          :aria-label="t.header.openPalette"
          @click="emit('openPalette')"
        >
          <span class="kbd" aria-hidden="true">⌘K</span>
        </button>
        <CtaButton
          class="tg"
          :href="SITE.telegram"
          :label="t.header.telegram"
          variant="ghost"
          event="click_telegram"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--header-h);
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

.inner {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  height: 100%;
}

.nav {
  display: none;
  gap: var(--space-4);
  margin-left: var(--space-2);
}

.nav a {
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  color: var(--muted);
  text-decoration: none;
}

.nav a:hover,
.nav a.active {
  color: var(--text);
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
}

.palette-btn {
  appearance: none;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  border-radius: var(--radius-sm);
  min-width: 2.5rem;
  min-height: 2.5rem;
  padding: 0 0.55rem;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}

.palette-btn:hover {
  color: var(--text);
  border-color: var(--border-strong);
}

.tg {
  display: none;
}

@media (min-width: 720px) {
  .nav {
    display: flex;
  }

  .tg {
    display: inline-flex;
    min-height: 2.5rem;
    padding: 0.4rem 0.9rem;
  }
}
</style>
