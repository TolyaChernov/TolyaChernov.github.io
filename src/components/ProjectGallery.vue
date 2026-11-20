<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { Project } from '../content/projects'
import { useLang } from '../composables/useLang'
import { track } from '../analytics'
import ProjectPlaceholder from './ProjectPlaceholder.vue'

const props = defineProps<{
  project: Project
  name: string
  placeholder: string
}>()

const { t } = useLang()

const urlModules = import.meta.glob<string>('../assets/projects/*.{webp,png}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const mobileSrcsetModules = import.meta.glob<string>(
  '../assets/projects/*.{webp,png}',
  {
    eager: true,
    query: '?w=240;480;720&format=webp&as=srcset',
    import: 'default',
  },
)

const desktopSrcsetModules = import.meta.glob<string>(
  '../assets/projects/*.{webp,png}',
  {
    eager: true,
    query: '?w=640;960;1280&format=webp&as=srcset',
    import: 'default',
  },
)

function resolveUrl(file: string): string | null {
  const keyWebp = `../assets/projects/${file}`
  const keyPng = `../assets/projects/${file.replace(/\.webp$/, '.png')}`
  const hit = urlModules[keyWebp] ?? urlModules[keyPng]
  return typeof hit === 'string' ? hit : null
}

function resolveSrcset(file: string): string | null {
  const keyWebp = `../assets/projects/${file}`
  const keyPng = `../assets/projects/${file.replace(/\.webp$/, '.png')}`
  const map =
    props.project.platform === 'mobile'
      ? mobileSrcsetModules
      : desktopSrcsetModules
  const hit = map[keyWebp] ?? map[keyPng]
  return typeof hit === 'string' ? hit : null
}

const shots = computed(() =>
  props.project.screenshots.map((shot, index) => {
    const src = resolveUrl(shot.file)
    const srcset = src ? resolveSrcset(shot.file) : null
    return {
      ...shot,
      index,
      src,
      srcset,
    }
  }),
)

const hasAny = computed(() => shots.value.some((s) => s.src))
const active = ref(0)
const lightboxOpen = ref(false)
const dialog = ref<HTMLDialogElement | null>(null)
const trigger = ref<HTMLElement | null>(null)

const current = computed(() => shots.value[active.value] ?? shots.value[0])
const total = computed(() => shots.value.length)

const sizes = computed(() =>
  props.project.platform === 'mobile'
    ? '12rem'
    : '(min-width: 900px) 30vw, 100vw',
)

function altFor(index: number): string {
  return t.value.projects.gallery.of
    .replace('{name}', props.name)
    .replace('{n}', String(index + 1))
    .replace('{total}', String(total.value))
}

function select(index: number): void {
  active.value = index
}

async function openLightbox(): Promise<void> {
  if (!current.value?.src) return
  trigger.value = document.activeElement as HTMLElement
  lightboxOpen.value = true
  track('gallery_open', { project: props.project.id, index: active.value })
  await nextTick()
  dialog.value?.showModal()
}

function closeLightbox(): void {
  lightboxOpen.value = false
  dialog.value?.close()
  trigger.value?.focus?.()
}

function prev(): void {
  active.value = (active.value - 1 + total.value) % total.value
}

function next(): void {
  active.value = (active.value + 1) % total.value
}

function onDialogKey(e: KeyboardEvent): void {
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prev()
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    next()
  }
}

watch(lightboxOpen, (open) => {
  if (!open) dialog.value?.close()
})
</script>

<template>
  <div class="gallery" :class="project.platform">
    <template v-if="hasAny && current?.src">
      <button
        type="button"
        class="main"
        :aria-label="t.projects.gallery.open"
        @click="openLightbox"
      >
        <img
          :src="current.src"
          :srcset="current.srcset ?? undefined"
          :sizes="sizes"
          :alt="altFor(current.index)"
          :width="current.width"
          :height="current.height"
          loading="lazy"
          decoding="async"
        />
      </button>

      <div v-if="shots.length > 1" class="thumbs" role="group">
        <button
          v-for="shot in shots"
          :key="shot.file"
          type="button"
          class="thumb"
          :aria-pressed="shot.index === active"
          :aria-label="
            t.projects.gallery.thumb.replace('{n}', String(shot.index + 1))
          "
          @click="select(shot.index)"
        >
          <img
            v-if="shot.src"
            :src="shot.src"
            :alt="altFor(shot.index)"
            loading="lazy"
            decoding="async"
          />
        </button>
      </div>
    </template>

    <ProjectPlaceholder
      v-else
      :text="placeholder"
      :platform="project.platform"
    />

    <dialog
      v-if="hasAny"
      ref="dialog"
      class="lightbox"
      @close="lightboxOpen = false"
      @keydown="onDialogKey"
    >
      <div class="lightbox-inner">
        <button
          type="button"
          class="close"
          :aria-label="t.projects.gallery.close"
          @click="closeLightbox"
        >
          ×
        </button>
        <button
          v-if="shots.length > 1"
          type="button"
          class="nav prev"
          :aria-label="t.projects.gallery.prev"
          @click="prev"
        >
          ‹
        </button>
        <img
          v-if="current?.src"
          :src="current.src"
          :alt="altFor(current.index)"
          :width="current.width"
          :height="current.height"
        />
        <button
          v-if="shots.length > 1"
          type="button"
          class="nav next"
          :aria-label="t.projects.gallery.next"
          @click="next"
        >
          ›
        </button>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.gallery {
  background: var(--surface-2);
  border-top: 1px solid var(--border);
}

.main {
  appearance: none;
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
}

.desktop .main img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top;
  vertical-align: middle;
}

.mobile {
  display: grid;
  place-items: center;
  padding: var(--space-4);
}

.mobile .main {
  width: auto;
}

.mobile .main img {
  width: min(100%, 12rem);
  height: auto;
  border-radius: 1rem;
  border: 1px solid var(--border-strong);
  vertical-align: middle;
}

.thumbs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4) var(--space-4);
  justify-content: center;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
}

.thumb {
  appearance: none;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--surface);
  cursor: pointer;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb[aria-pressed='true'] {
  border-color: var(--accent-text);
  box-shadow: inset 0 0 0 1px var(--accent-text);
}

.lightbox {
  padding: 0;
  border: 0;
  background: transparent;
  max-width: min(96vw, 72rem);
  max-height: 92vh;
}

.lightbox::backdrop {
  background: rgb(0 0 0 / 0.78);
}

.lightbox-inner {
  position: relative;
  display: grid;
  place-items: center;
  padding: var(--space-6);
}

.lightbox-inner img {
  max-width: min(92vw, 70rem);
  max-height: 82vh;
  width: auto;
  height: auto;
  border-radius: var(--radius);
  border: 1px solid var(--border-strong);
}

.close,
.nav {
  appearance: none;
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  font-family: var(--font-mono);
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-sm);
  font-size: 1.4rem;
  line-height: 1;
  z-index: 2;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-pill);
  font-size: 1.5rem;
  line-height: 1;
  z-index: 2;
}

.nav.prev {
  left: 0;
}

.nav.next {
  right: 0;
}
</style>
