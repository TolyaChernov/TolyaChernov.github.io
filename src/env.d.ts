/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYTICS_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

interface UmamiTracker {
  track: (
    event: string,
    data?: Record<string, string | number | boolean>,
  ) => void
}

interface Window {
  umami?: UmamiTracker
}
