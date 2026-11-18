<script setup lang="ts">
import { SITE } from '../content/projects'
import { useLang } from '../composables/useLang'
import CtaButton from './CtaButton.vue'
import SectionHeading from './SectionHeading.vue'

const { t } = useLang()
</script>

<template>
  <section
    id="contact"
    class="section"
    aria-labelledby="contact-heading"
    v-reveal
  >
    <div class="container">
      <SectionHeading
        id="contact-heading"
        :prompt="t.contact.prompt"
        :command="t.contact.command"
      />
      <div class="panel window">
        <div class="window-chrome">
          <span class="window-dot" /><span class="window-dot" /><span
            class="window-dot"
          />
          <span class="window-title">{{ t.contact.windowTitle }}</span>
        </div>
        <div class="body">
          <p class="invite">{{ t.contact.heading }}</p>
          <p class="lead muted">{{ t.contact.lead }}</p>
          <div class="actions">
            <CtaButton
              :href="SITE.telegram"
              :label="t.contact.telegramCommand"
              variant="command"
              event="click_telegram"
            >
              <span class="prompt" aria-hidden="true">$ </span
              >{{ t.contact.telegramCommand }}
            </CtaButton>
            <CtaButton
              :href="SITE.github"
              :label="t.contact.github"
              variant="ghost"
              event="click_github"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.panel {
  overflow: hidden;
}

.body {
  padding: var(--space-6) var(--space-5);
  display: grid;
  gap: var(--space-4);
}

.invite {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--fs-2xl);
  font-weight: 700;
  line-height: var(--lh-tight);
}

.lead {
  max-width: 32rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.prompt {
  color: var(--muted);
}
</style>
