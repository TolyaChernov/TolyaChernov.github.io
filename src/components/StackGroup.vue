<script setup lang="ts">
defineProps<{
  title: string
  items: readonly string[]
}>()
</script>

<template>
  <div class="group">
    <h3 class="title mono">{{ title }}</h3>
    <ul class="items">
      <li v-for="item in items" :key="item" class="pill">{{ item }}</li>
    </ul>
  </div>
</template>

<style scoped>
.group {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.title {
  font-size: var(--fs-sm);
  color: var(--accent-text);
}

.items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
