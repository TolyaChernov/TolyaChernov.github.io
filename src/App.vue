<script setup lang="ts">
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { useLang } from './composables/useLang'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import AboutSection from './components/AboutSection.vue'
import ContactBlock from './components/ContactBlock.vue'
import HeroTerminal from './components/HeroTerminal.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import StackSection from './components/StackSection.vue'

const CommandPalette = defineAsyncComponent(
  () => import('./components/CommandPalette.vue'),
)

const { t } = useLang()
const paletteOpen = ref(false)

function onGlobalKey(e: KeyboardEvent): void {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    paletteOpen.value = !paletteOpen.value
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobalKey))
</script>

<template>
  <a class="skip-link" href="#main">{{ t.a11y.skip }}</a>
  <div id="top">
    <AppHeader @open-palette="paletteOpen = true" />
    <main id="main">
      <HeroTerminal />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <StackSection />
      <ContactBlock />
    </main>
    <AppFooter />
    <CommandPalette v-model:open="paletteOpen" />
  </div>
</template>
