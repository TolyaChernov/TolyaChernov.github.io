const ID = import.meta.env.VITE_ANALYTICS_ID?.trim()

function dntEnabled(): boolean {
  try {
    const nav = navigator as Navigator & { msDoNotTrack?: string }
    const flag = nav.doNotTrack ?? nav.msDoNotTrack ?? (window as Window & { doNotTrack?: string }).doNotTrack
    return flag === '1' || flag === 'yes'
  } catch {
    return false
  }
}

export function initAnalytics(): void {
  if (!ID || dntEnabled()) return

  const inject = () => {
    if (document.querySelector('script[data-analytics="umami"]')) return
    const script = document.createElement('script')
    script.defer = true
    script.src = 'https://cloud.umami.is/script.js'
    script.dataset.websiteId = ID
    script.dataset.doNotTrack = 'true'
    script.dataset.analytics = 'umami'
    document.head.appendChild(script)
  }

  if (document.readyState === 'complete') {
    inject()
  } else {
    window.addEventListener('load', inject, { once: true })
  }
}

export function track(
  name: string,
  data?: Record<string, string | number | boolean>,
): void {
  if (!ID || dntEnabled()) return
  try {
    window.umami?.track(name, data)
  } catch {
    // ignore
  }
}
