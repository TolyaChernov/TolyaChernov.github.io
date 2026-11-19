<script setup lang="ts">
import { track, type EventMap } from '../analytics'
import { useLang } from '../composables/useLang'

type Trackable = {
  [K in keyof EventMap]: EventMap[K] extends undefined ? K : never
}[keyof EventMap]

const props = withDefaults(
  defineProps<{
    href: string
    label: string
    variant?: 'primary' | 'ghost' | 'command'
    event?: Trackable
    external?: boolean
  }>(),
  {
    variant: 'primary',
    external: true,
  },
)

const { t } = useLang()

function onClick(): void {
  if (props.event) track(props.event)
}
</script>

<template>
  <a
    class="cta"
    :class="variant"
    :href="href"
    :aria-label="label"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    @click="onClick"
  >
    <slot>{{ label }}</slot>
    <span v-if="external" class="sr-only">{{ t.a11y.newTab }}</span>
  </a>
</template>

<style scoped>
.cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.55rem 1.1rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 180ms var(--ease);
}

.cta::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  box-shadow: inset 0 0 0 1px var(--accent-text);
  transition: opacity 180ms var(--ease);
}

.cta:hover {
  transform: translateY(-1px);
}

.cta:hover::before {
  opacity: 1;
}

.primary {
  background: var(--accent);
  color: var(--on-accent);
  border: 1px solid transparent;
}

.ghost {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border-strong);
}

.command {
  background: var(--surface-2);
  color: var(--accent-text);
  border: 1px solid var(--border-strong);
  font-size: var(--fs-sm);
  padding-inline: 1rem;
}
</style>
