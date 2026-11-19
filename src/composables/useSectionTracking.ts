import { onBeforeUnmount, onMounted } from 'vue'
import { track } from '../analytics'

const SECTION_IDS = [
  'projects',
  'stack',
  'contact',
  'about',
  'services',
] as const

export function useSectionTracking(): void {
  let observer: IntersectionObserver | null = null
  const seen = new Set<string>()

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = (entry.target as HTMLElement).id
          if (!id || seen.has(id)) continue
          seen.add(id)
          track('section_view', { id })
          observer?.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -35% 0px', threshold: 0.2 },
    )

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
