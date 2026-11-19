<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../content/projects'
import type { ProjectText } from '../content/types'
import { track } from '../analytics'
import ProjectScreenshot from './ProjectScreenshot.vue'

const props = defineProps<{
  project: Project
  text: ProjectText
}>()

const download = computed(() => {
  const href = props.project.links.download
  return href
    ? { href, label: props.text.links.download }
    : null
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

function onLink(key: string): void {
  track('project_link', { project: props.project.id, link: key })
}
</script>

<template>
  <article
    class="card window"
    :style="{ '--project-accent': project.accent }"
  >
    <div class="window-chrome">
      <span class="window-dot" /><span class="window-dot" /><span
        class="window-dot"
      />
      <span class="window-title">{{ text.name }}</span>
    </div>

    <ProjectScreenshot
      :project="project"
      :alt="text.screenshotAlt"
      :placeholder="text.placeholder"
    />

    <div class="body">
      <div class="meta">
        <h3 class="title">{{ text.name }}</h3>
        <p class="platform mono muted">{{ text.platformLabel }}</p>
      </div>
      <p class="desc">{{ text.description }}</p>
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
          :aria-label="download.label"
          target="_blank"
          rel="noopener noreferrer"
          @click="onLink('download')"
          >{{ download.label }}</a
        >
        <a
          v-for="link in secondaryLinks"
          :key="link.key"
          class="link"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          @click="onLink(link.key)"
          >{{ link.label }}</a
        >
      </div>
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

.body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
  flex: 1;
}

.title {
  font-size: var(--fs-lg);
}

.platform {
  margin-top: var(--space-1);
  font-size: var(--fs-xs);
  color: var(--project-accent);
}

.desc {
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
</style>
