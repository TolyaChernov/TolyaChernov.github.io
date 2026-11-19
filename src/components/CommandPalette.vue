<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { langPath, SITE } from '../content/projects'
import { useLang } from '../composables/useLang'
import { track } from '../analytics'
import type { Lang } from '../content/types'

const open = defineModel<boolean>('open', { default: false })

const { t, lang, setLang } = useLang()
const dialog = ref<HTMLDialogElement | null>(null)
const query = ref('')
const active = ref(0)
const input = ref<HTMLInputElement | null>(null)

type Action = {
  id: string
  label: string
  href?: string
  run: () => void
}

const actions = computed<Action[]>(() => [
  {
    id: 'projects',
    label: t.value.palette.items.projects,
    run: () => go('#projects'),
  },
  {
    id: 'stack',
    label: t.value.palette.items.stack,
    run: () => go('#stack'),
  },
  {
    id: 'contact',
    label: t.value.palette.items.contact,
    run: () => go('#contact'),
  },
  {
    id: 'telegram',
    label: t.value.palette.items.telegram,
    href: SITE.telegram,
    run: () => {
      track('click_telegram')
      window.open(SITE.telegram, '_blank', 'noopener,noreferrer')
    },
  },
  {
    id: 'github',
    label: t.value.palette.items.github,
    href: SITE.github,
    run: () => {
      track('click_github')
      window.open(SITE.github, '_blank', 'noopener,noreferrer')
    },
  },
  {
    id: 'lang-ru',
    label: t.value.palette.items.langRu,
    href: langPath('ru'),
    run: () => setLang('ru' satisfies Lang, { via: 'palette' }),
  },
  {
    id: 'lang-en',
    label: t.value.palette.items.langEn,
    href: langPath('en'),
    run: () => setLang('en' satisfies Lang, { via: 'palette' }),
  },
])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return actions.value
  return actions.value.filter((a) => a.label.toLowerCase().includes(q))
})

watch(filtered, () => {
  active.value = 0
})

function go(hash: string): void {
  const el = document.querySelector(hash)
  if (el) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  } else {
    window.location.hash = hash
  }
}

function close(): void {
  open.value = false
}

function run(action: Action): void {
  track('palette_action', { id: action.id })
  action.run()
  close()
}

function onKey(e: KeyboardEvent): void {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = Math.min(
      active.value + 1,
      Math.max(filtered.value.length - 1, 0),
    )
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = Math.max(active.value - 1, 0)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const item = filtered.value[active.value]
    if (item) run(item)
  }
}

watch(open, async (value) => {
  const el = dialog.value
  if (!el) return
  if (value) {
    if (!el.open) el.showModal()
    query.value = ''
    active.value = 0
    await nextTick()
    input.value?.focus()
  } else if (el.open) {
    el.close()
  }
})

function onDialogClose(): void {
  open.value = false
}

function onBackdrop(e: MouseEvent): void {
  if (e.target === dialog.value) close()
}
</script>

<template>
  <dialog
    ref="dialog"
    class="palette"
    :aria-label="t.palette.title"
    @close="onDialogClose"
    @click="onBackdrop"
    @keydown="onKey"
  >
    <div class="panel" @click.stop>
      <div class="top">
        <input
          ref="input"
          v-model="query"
          class="input mono"
          type="search"
          :placeholder="t.palette.placeholder"
          :aria-label="t.palette.placeholder"
          autocomplete="off"
          spellcheck="false"
        />
        <button
          type="button"
          class="close"
          :aria-label="t.a11y.closePalette"
          @click="close"
        >
          {{ t.palette.closeKey }}
        </button>
      </div>

      <ul v-if="filtered.length" class="list" role="listbox">
        <li
          v-for="(item, i) in filtered"
          :key="item.id"
          role="option"
          :aria-selected="i === active"
          class="item"
          :class="{ active: i === active, current: item.id === `lang-${lang}` }"
          @mouseenter="active = i"
          @click="run(item)"
        >
          <span class="label">{{ item.label }}</span>
        </li>
      </ul>
      <p v-else class="empty muted">{{ t.palette.empty }}</p>

      <p class="hint muted mono">{{ t.palette.hint }}</p>
    </div>
  </dialog>
</template>

<style scoped>
.palette {
  margin: auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--text);
  max-width: min(32rem, calc(100vw - 2rem));
  width: 100%;
}

.palette::backdrop {
  background: rgb(5 7 12 / 0.72);
}

.panel {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-window);
  overflow: hidden;
}

.top {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-3);
  border-bottom: 1px solid var(--border);
}

.input {
  flex: 1;
  min-width: 0;
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0.55rem 0.4rem;
  font-size: var(--fs-sm);
}

.input:focus {
  outline: none;
  box-shadow: none;
}

.close {
  appearance: none;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--muted);
  border-radius: var(--radius-sm);
  padding: 0.35rem 0.55rem;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  cursor: pointer;
}

.list {
  max-height: min(50vh, 22rem);
  overflow: auto;
  padding: var(--space-2);
}

.item {
  display: flex;
  align-items: center;
  padding: 0.7rem 0.8rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
}

.item.active {
  background: var(--surface-2);
  box-shadow: inset 0 0 0 1px var(--border-strong);
}

.item.current .label::after {
  content: ' ✓';
  color: var(--accent-2);
}

.empty {
  padding: var(--space-5);
  text-align: center;
}

.hint {
  margin: 0;
  padding: var(--space-3);
  border-top: 1px solid var(--border);
  font-size: var(--fs-xs);
}
</style>
