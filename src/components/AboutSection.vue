<script setup lang="ts">
import { useLang } from '../composables/useLang'
import SectionHeading from './SectionHeading.vue'

const { t } = useLang()
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-heading" v-reveal>
    <div class="container">
      <SectionHeading
        id="about-heading"
        :prompt="t.about.prompt"
        :command="t.about.command"
      />
      <div class="copy">
        <p v-for="(p, i) in t.about.paragraphs" :key="i" class="para">
          {{ p }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.copy {
  display: grid;
  gap: var(--space-3);
  max-width: 42rem;
}

.para {
  color: var(--text);
}
</style>
