<script setup lang="ts">
defineProps<{
  text: string
  platform: 'mobile' | 'desktop'
}>()
</script>

<template>
  <div class="ph" :class="platform" aria-hidden="true">
    <div class="screen">
      <div class="chrome">
        <span class="dot" /><span class="dot" /><span class="dot" />
      </div>
      <pre class="code mono">{{ text }}</pre>
    </div>
  </div>
</template>

<style scoped>
.ph {
  display: grid;
  place-items: center;
  width: 100%;
  background:
    linear-gradient(180deg, rgb(108 92 231 / 0.08), transparent 60%),
    var(--surface-2);
  border-top: 1px solid var(--border);
}

.ph.desktop {
  aspect-ratio: 16 / 10;
  padding: var(--space-4);
}

.ph.mobile {
  aspect-ratio: 9 / 16;
  max-height: 22rem;
  margin-inline: auto;
  padding: var(--space-4);
}

.screen {
  width: min(100%, 28rem);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  background: var(--bg);
  overflow: hidden;
}

.mobile .screen {
  width: min(100%, 11rem);
  border-radius: 1rem;
}

.chrome {
  display: flex;
  gap: 0.35rem;
  padding: 0.45rem 0.6rem;
  border-bottom: 1px solid var(--border);
}

.dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--border-strong);
}

.code {
  margin: 0;
  padding: var(--space-4);
  font-size: var(--fs-xs);
  color: var(--muted);
  white-space: pre-wrap;
}
</style>
