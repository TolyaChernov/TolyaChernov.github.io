<script setup lang="ts">
import { useLang } from '../composables/useLang'
import SectionHeading from './SectionHeading.vue'

const { t } = useLang()
</script>

<template>
  <section class="section" aria-labelledby="about-heading" v-reveal>
    <div class="container">
      <SectionHeading
        id="about-heading"
        :prompt="t.about.prompt"
        :command="t.about.command"
      />
      <div class="grid">
        <div class="copy">
          <p v-for="(p, i) in t.about.paragraphs" :key="i" class="para">
            {{ p }}
          </p>
        </div>
        <ul class="stats">
          <li v-for="(s, i) in t.about.stats" :key="i" class="stat">
            <span class="value mono">{{ s.value }}</span>
            <span class="label muted">{{ s.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  gap: var(--space-6);
}

.copy {
  display: grid;
  gap: var(--space-3);
  max-width: 42rem;
}

.para {
  color: var(--text);
}

.stats {
  display: grid;
  gap: var(--space-3);
  grid-template-columns: 1fr;
}

.stat {
  padding: var(--space-4);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  display: grid;
  gap: var(--space-1);
}

.value {
  font-size: var(--fs-xl);
  color: var(--accent-text);
  font-weight: 700;
}

.label {
  font-size: var(--fs-sm);
}

@media (min-width: 720px) {
  .grid {
    grid-template-columns: 1.4fr 1fr;
    align-items: start;
  }

  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
