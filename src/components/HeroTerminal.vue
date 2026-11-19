<script setup lang="ts">
import { computed } from 'vue'
import { SITE } from '../content/projects'
import { useLang } from '../composables/useLang'
import { useTyping } from '../composables/useTyping'
import CtaButton from './CtaButton.vue'

const { t } = useLang()
const command = computed(() => t.value.hero.command)
const { shown, done } = useTyping(command)
</script>

<template>
  <section class="hero section" aria-labelledby="hero-name">
    <div class="container">
      <div class="window hero-window">
        <div class="window-chrome">
          <span class="window-dot" /><span class="window-dot" /><span
            class="window-dot"
          />
          <span class="window-title">{{ t.hero.windowTitle }}</span>
        </div>
        <div class="body">
          <p class="line mono" :aria-label="t.hero.command">
            <span class="typed" aria-hidden="true">{{ shown }}</span>
            <span v-if="!done" class="cursor-blink" aria-hidden="true">▍</span>
          </p>

          <div class="output" :class="{ show: done }">
            <h1 id="hero-name" class="name">{{ t.hero.name }}</h1>
            <p class="role mono muted">{{ t.hero.role }}</p>
            <p class="tagline">{{ t.hero.tagline }}</p>
            <div class="actions">
              <CtaButton
                :href="SITE.telegram"
                :label="t.hero.telegram"
                event="click_telegram"
              />
              <CtaButton
                :href="SITE.github"
                :label="t.hero.github"
                variant="ghost"
                event="click_github"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: var(--space-6);
}

.hero-window {
  min-height: 22rem;
}

.body {
  padding: var(--space-5);
  min-height: 16rem;
}

.line {
  margin: 0 0 var(--space-5);
  font-size: var(--fs-sm);
  color: var(--accent-text);
  min-height: 1.5em;
}

.cursor-blink {
  display: inline-block;
  margin-left: 1px;
  color: var(--accent-text);
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.output {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity var(--dur) var(--ease),
    transform var(--dur) var(--ease);
}

.output.show {
  opacity: 1;
  transform: none;
}

.name {
  font-size: var(--fs-3xl);
  margin-bottom: var(--space-2);
}

.role {
  margin-bottom: var(--space-4);
  font-size: var(--fs-sm);
}

.tagline {
  max-width: 36rem;
  margin-bottom: var(--space-5);
  color: var(--text);
  font-size: var(--fs-lg);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

@media (prefers-reduced-motion: reduce) {
  .output {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
