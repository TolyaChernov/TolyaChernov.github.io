<script setup lang="ts">
import { projects } from '../content/projects'
import { useLang } from '../composables/useLang'
import ProjectCard from './ProjectCard.vue'
import SectionHeading from './SectionHeading.vue'

const { t } = useLang()
</script>

<template>
  <section
    id="projects"
    class="section"
    aria-labelledby="projects-heading"
    v-reveal
  >
    <div class="container">
      <SectionHeading
        id="projects-heading"
        :prompt="t.projects.prompt"
        :command="t.projects.command"
      />
      <div class="grid">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
          :text="t.projects.items[project.id]"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  gap: var(--space-5);
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
