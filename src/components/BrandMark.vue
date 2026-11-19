<script setup lang="ts">
import { computed } from 'vue'
import { useLang } from '../composables/useLang'

defineProps<{
  title: string
}>()

const { lang, langPath } = useLang()
const home = computed(() => langPath(lang.value))
</script>

<template>
  <a class="brand" :href="home" :aria-label="title">
    <svg
      class="mark"
      viewBox="0 0 40 40"
      width="32"
      height="32"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="8"
        fill="var(--surface)"
        stroke="var(--border-strong)"
        stroke-width="1.5"
      />
      <text
        x="20"
        y="26"
        text-anchor="middle"
        font-family="JetBrains Mono, monospace"
        font-size="14"
        font-weight="700"
        fill="var(--accent-text)"
      >
        AC
      </text>
    </svg>
  </a>
</template>

<style scoped>
.brand {
  display: inline-flex;
  text-decoration: none;
  border-radius: var(--radius-sm);
}

.mark {
  display: block;
}
</style>
