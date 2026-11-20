<script setup lang="ts">
import {
  defineAsyncComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'
import { useLang } from './composables/useLang'
import { useSectionTracking } from './composables/useSectionTracking'
import { track } from './analytics'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import AboutSection from './components/AboutSection.vue'
import ContactBlock from './components/ContactBlock.vue'
import HeroTerminal from './components/HeroTerminal.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import StackSection from './components/StackSection.vue'

const CommandPalette = defineAsyncComponent(
  () => import('./components/CommandPalette.vue'),
)

const { t, syncFromLocation } = useLang()
const paletteOpen = ref(false)
const paletteSource = ref<'kbd' | 'button'>('button')

useSectionTracking()

function openPalette(source: 'kbd' | 'button'): void {
  paletteSource.value = source
  paletteOpen.value = true
}

watch(paletteOpen, (value) => {
  if (value) track('palette_open', { source: paletteSource.value })
})

function onGlobalKey(e: KeyboardEvent): void {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    if (paletteOpen.value) {
      paletteOpen.value = false
    } else {
      openPalette('kbd')
    }
  }
}

function onPopState(): void {
  syncFromLocation()
}

onMounted(() => {
  window.addEventListener('keydown', onGlobalKey)
  window.addEventListener('popstate', onPopState)
  syncFromLocation()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onGlobalKey)
  window.removeEventListener('popstate', onPopState)
})
</script>

<template>
  <a class="skip-link" href="#main">{{ t.a11y.skip }}</a>
  <div id="top">
    <AppHeader @open-palette="openPalette('button')" />
    <main id="main">
      <HeroTerminal />
      <ProjectsSection />
      <AboutSection />
      <StackSection />
      <ContactBlock />
    </main>
    <AppFooter />
    <CommandPalette v-model:open="paletteOpen" />
  </div>
</template>
