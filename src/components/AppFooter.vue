<script setup lang="ts">
import { computed } from 'vue'
import { SITE } from '../content/projects'
import { useLang } from '../composables/useLang'

const { t } = useLang()
const year = new Date().getFullYear()
const copyright = computed(() =>
  t.value.footer.copyright.replace('{year}', String(year)),
)
</script>

<template>
  <footer class="footer">
    <div class="container row">
      <p class="copy muted">{{ copyright }}</p>
      <a class="source" :href="SITE.repoUrl" target="_blank" rel="noopener noreferrer">{{
        t.footer.source
      }}</a>
      <p class="exit mono muted">{{ t.footer.exit }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding-block: var(--space-5);
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-5);
  align-items: center;
  justify-content: space-between;
  font-size: var(--fs-sm);
}

.source {
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
}

.exit {
  margin: 0;
}
</style>
