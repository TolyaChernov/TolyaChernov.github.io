<script setup lang="ts">
import { useLang } from '../composables/useLang'
import SectionHeading from './SectionHeading.vue'

const { t } = useLang()
</script>

<template>
  <section class="section" aria-labelledby="services-heading" v-reveal>
    <div class="container">
      <SectionHeading
        id="services-heading"
        :prompt="t.services.prompt"
        :command="t.services.command"
      />
      <ul class="list window">
        <li v-for="(item, i) in t.services.items" :key="i" class="row">
          <span class="name mono">{{ item.name }}</span>
          <span class="desc">{{ item.description }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.list {
  padding: 0;
  overflow: hidden;
}

.row {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--border);
}

.row:last-child {
  border-bottom: 0;
}

.name {
  color: var(--accent-2);
  font-size: var(--fs-sm);
}

.desc {
  color: var(--text);
}

@media (min-width: 720px) {
  .row {
    grid-template-columns: 9rem 1fr;
    gap: var(--space-4);
    align-items: baseline;
  }
}
</style>
