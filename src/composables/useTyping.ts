import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

const played = { value: false }

export function useTyping(
  text: Ref<string>,
  options: { speed?: number; startDelay?: number } = {},
) {
  const speed = options.speed ?? 42
  const startDelay = options.startDelay ?? 280
  const isSSR = import.meta.env.SSR
  const shown = ref(isSSR ? text.value : '')
  const done = ref(isSSR)
  let timer: ReturnType<typeof setTimeout> | undefined
  let index = 0
  let source = ''

  function clear(): void {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  function finish(): void {
    shown.value = source
    done.value = true
    played.value = true
  }

  function tick(): void {
    if (index >= source.length) {
      finish()
      return
    }
    index += 1
    shown.value = source.slice(0, index)
    timer = setTimeout(tick, speed)
  }

  function start(value: string): void {
    clear()
    source = value
    if (played.value || prefersReducedMotion()) {
      finish()
      return
    }
    index = 0
    shown.value = ''
    done.value = false
    timer = setTimeout(tick, startDelay)
  }

  if (!isSSR) {
    onMounted(() => start(text.value))

    watch(text, (value) => {
      if (!done.value && !played.value) {
        start(value)
        return
      }
      shown.value = value
      done.value = true
    })

    onBeforeUnmount(clear)
  } else {
    watch(
      text,
      (value) => {
        shown.value = value
        done.value = true
      },
      { immediate: true },
    )
  }

  return { shown, done }
}
