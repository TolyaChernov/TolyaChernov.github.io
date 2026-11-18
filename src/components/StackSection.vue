<script setup lang="ts">
import { stackGroups } from '../content/stack'
import { useLang } from '../composables/useLang'
import SectionHeading from './SectionHeading.vue'
import StackGroup from './StackGroup.vue'

const { t } = useLang()
</script>

<template>
  <section id="stack" class="section" aria-labelledby="stack-heading" v-reveal>
    <div class="container">
      <SectionHeading
        id="stack-heading"
        :prompt="t.stack.prompt"
        :command="t.stack.command"
      />
      <div class="grid">
        <StackGroup
          v-for="group in stackGroups"
          :key="group.id"
          :title="t.stack.groups[group.id]"
          :items="group.items"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  gap: var(--space-4);
}

@media (min-width: 720px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
