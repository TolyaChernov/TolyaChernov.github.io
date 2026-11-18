<script setup lang="ts">
defineProps<{
  prompt: string
  command: string
  id?: string
}>()
</script>

<template>
  <div class="heading">
    <p class="prompt muted mono">
      <span class="path">{{ prompt }}</span>
      <span class="dollar"> $</span>
    </p>
    <h2 :id="id" class="command">{{ command }}</h2>
  </div>
</template>

<style scoped>
.heading {
  margin-bottom: var(--space-5);
}

.prompt {
  margin: 0 0 var(--space-2);
  font-size: var(--fs-sm);
}

.path {
  color: var(--accent-2);
}

.dollar {
  color: var(--muted);
}

.command {
  font-size: var(--fs-xl);
  color: var(--text);
  font-weight: 700;
}
</style>
