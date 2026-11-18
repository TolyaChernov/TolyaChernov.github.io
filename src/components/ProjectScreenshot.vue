<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../content/projects'
import ProjectPlaceholder from './ProjectPlaceholder.vue'

const props = defineProps<{
  project: Project
  alt: string
  placeholder: string
}>()

const modules = import.meta.glob<{ default: string }>(
  '../assets/projects/*.{webp,png}',
  { eager: true, query: '?url', import: 'default' },
)

const src = computed(() => {
  const file = props.project.screenshot.file
  const keyPng = `../assets/projects/${file.replace(/\.webp$/, '.png')}`
  const keyWebp = `../assets/projects/${file}`
  const hit = modules[keyWebp] ?? modules[keyPng]
  return typeof hit === 'string' ? hit : null
})
</script>

<template>
  <div class="shot" :class="project.platform">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      :width="project.screenshot.width"
      :height="project.screenshot.height"
      loading="lazy"
      decoding="async"
    />
    <ProjectPlaceholder
      v-else
      :text="placeholder"
      :platform="project.platform"
    />
  </div>
</template>

<style scoped>
.shot {
  background: var(--surface-2);
  border-top: 1px solid var(--border);
  overflow: hidden;
}

.shot.desktop img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top;
}

.shot.mobile {
  display: grid;
  place-items: center;
  padding: var(--space-4);
}

.shot.mobile img {
  width: min(100%, 12rem);
  height: auto;
  border-radius: 1rem;
  border: 1px solid var(--border-strong);
}
</style>
