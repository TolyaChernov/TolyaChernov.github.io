<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../content/projects'
import type { ProjectText } from '../content/types'
import { useLang } from '../composables/useLang'
import { track } from '../analytics'
import ProjectGallery from './ProjectGallery.vue'

const props = defineProps<{
  project: Project
  text: ProjectText
}>()

const { t } = useLang()

const download = computed(() => {
  const href = props.project.links.download
  return href ? { href, label: props.text.links.download } : null
})

const secondaryLinks = computed(() => {
  const links = props.project.links
  const labels = props.text.links
  const out: { key: string; href: string; label: string }[] = []
  if (links.repo) {
    out.push({ key: 'repo', href: links.repo, label: labels.repo })
  }
  if (links.store) {
    out.push({ key: 'store', href: links.store, label: labels.store })
  }
  return out
})

const releaseLine = computed(() => {
  const release = props.project.release
  const labels = t.value.projects.release
  const size = labels.size.replace('{size}', String(release.sizeMb))
  const os = labels.os[release.os]
  const parts = [size, os]
  if (release.version) {
    parts.unshift(labels.version.replace('{version}', release.version))
  }
  return parts.join(' · ')
})

const installNote = computed(() => {
  const notes = t.value.projects.installNote
  return notes[props.project.release.os]
})

function downloadAria(): string {
  return `${props.text.links.download} ${props.text.name}`
}

function linkAria(label: string): string {
  return `${label} ${props.text.name}`
}

function onDownload(): void {
  track('project_download', {
    project: props.project.id,
    os: props.project.release.os,
    version: props.project.release.version ?? '',
  })
}

function onLink(key: string): void {
  track('project_link', { project: props.project.id, link: key })
}

function onInstallToggle(e: Event): void {
  const el = e.target as HTMLDetailsElement
  if (el.open) {
    track('install_note_open', { project: props.project.id })
  }
}
</script>

<template>
  <article class="card window" :style="{ '--project-accent': project.accent }">
    <div class="window-chrome">
      <span class="window-dot" /><span class="window-dot" /><span
        class="window-dot"
      />
      <span class="window-title">{{ text.name }}</span>
    </div>

    <div class="intro">
      <h3 class="title">{{ text.name }}</h3>
      <p class="desc">{{ text.description }}</p>
    </div>

    <ProjectGallery
      :project="project"
      :name="text.name"
      :placeholder="text.placeholder"
    />

    <div class="body">
      <ul class="stack">
        <li v-for="tech in project.stack" :key="tech" class="pill">
          {{ tech }}
        </li>
      </ul>
      <div v-if="download || secondaryLinks.length" class="links">
        <a
          v-if="download"
          class="download-btn"
          :href="download.href"
          :aria-label="downloadAria()"
          target="_blank"
          rel="noopener noreferrer"
          @click="onDownload"
        >
          {{ download.label }}
          <span class="sr-only">{{ t.a11y.newTab }}</span>
        </a>
        <a
          v-for="link in secondaryLinks"
          :key="link.key"
          class="link"
          :href="link.href"
          :aria-label="linkAria(link.label)"
          target="_blank"
          rel="noopener noreferrer"
          @click="onLink(link.key)"
        >
          {{ link.label }}
          <span class="sr-only">{{ t.a11y.newTab }}</span>
        </a>
      </div>
      <p class="platform mono muted">{{ text.platformLabel }}</p>
      <p v-if="download" class="release mono muted">{{ releaseLine }}</p>
      <details v-if="download" class="install" @toggle="onInstallToggle">
        <summary>{{ t.projects.installNote.summary }}</summary>
        <p>{{ installNote }}</p>
        <p v-if="project.release.sha256" class="hash mono">
          <span class="hash-label">{{ t.projects.installNote.sha256 }}</span>
          <code>{{ project.release.sha256 }}</code>
        </p>
      </details>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  transition: transform 180ms var(--ease);
}

.card:hover {
  transform: translateY(-2px);
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  box-shadow: inset 0 0 0 1px var(--project-accent);
  transition: opacity 180ms var(--ease);
  z-index: 1;
}

.card:hover::before {
  opacity: 0.7;
}

.intro {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-5) var(--space-5) var(--space-4);
}

.body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
  flex: 1;
}

.title {
  font-size: var(--fs-lg);
  margin: 0;
}

.platform {
  margin: 0;
  font-size: var(--fs-xs);
  color: var(--project-accent);
}

.desc {
  margin: 0;
  color: var(--text);
  font-size: var(--fs-sm);
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  margin-top: auto;
  padding-top: var(--space-1);
}

.download-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  background: var(--accent);
  color: var(--on-accent);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 180ms var(--ease);
}

.download-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  box-shadow: inset 0 0 0 1px var(--accent-text);
  transition: opacity 180ms var(--ease);
}

.download-btn:hover {
  transform: translateY(-1px);
}

.download-btn:hover::before {
  opacity: 1;
}

.link {
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  color: var(--accent-text);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.release {
  margin: 0;
  font-size: var(--fs-xs);
}

.install {
  font-size: var(--fs-xs);
  color: var(--muted);
}

.install summary {
  cursor: pointer;
  color: var(--accent-text);
  font-family: var(--font-mono);
}

.install p {
  margin: var(--space-2) 0 0;
  line-height: var(--lh);
}

.hash {
  word-break: break-all;
}

.hash-label {
  display: block;
  margin-bottom: var(--space-1);
  color: var(--muted);
}

.hash code {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--text);
}
</style>
