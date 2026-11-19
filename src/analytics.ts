const ID = import.meta.env.VITE_ANALYTICS_ID?.trim()

export type EventMap = {
  click_telegram: undefined
  click_github: undefined
  lang_change: { from: string; to: string; via: 'switch' | 'palette' }
  project_link: { project: string; link: string }
  project_download: { project: string; os: string; version: string }
  install_note_open: { project: string }
  gallery_open: { project: string; index: number }
  palette_open: { source: 'kbd' | 'button' }
  palette_action: { id: string }
  section_view: { id: string }
}

function dntEnabled(): boolean {
  if (typeof navigator === 'undefined') return false
  try {
    const nav = navigator as Navigator & { msDoNotTrack?: string }
    const flag =
      nav.doNotTrack ??
      nav.msDoNotTrack ??
      (window as Window & { doNotTrack?: string }).doNotTrack
    return flag === '1' || flag === 'yes'
  } catch {
    return false
  }
}

export function initAnalytics(): void {
  if (!ID || dntEnabled() || typeof document === 'undefined') return

  const inject = () => {
    if (document.querySelector('script[data-analytics="umami"]')) return
    const script = document.createElement('script')
    script.defer = true
    script.src = 'https://cloud.umami.is/script.js'
    script.dataset.websiteId = ID
    script.dataset.doNotTrack = 'true'
    script.dataset.domains = 'tolyachernov.github.io'
    script.dataset.analytics = 'umami'
    document.head.appendChild(script)
  }

  if (document.readyState === 'complete') {
    inject()
  } else {
    window.addEventListener('load', inject, { once: true })
  }
}

export function track<K extends keyof EventMap>(
  name: K,
  ...args: EventMap[K] extends undefined ? [] : [data: EventMap[K]]
): void {
  if (!ID || dntEnabled()) return
  try {
    const data = args[0]
    if (data === undefined) {
      window.umami?.track(name)
    } else {
      window.umami?.track(name, data)
    }
  } catch {
    // ignore
  }
}
