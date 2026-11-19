export const stackGroups = [
  {
    id: 'mobile',
    items: ['Flutter', 'Dart', 'Riverpod', 'Drift', 'go_router', 'fl_chart'],
  },
  {
    id: 'desktop',
    items: ['Tauri 2', 'Rust', 'Wails', 'Go', 'SQLite'],
  },
  {
    id: 'web',
    items: ['Vue 3', 'TypeScript', 'Vite', 'PrimeVue'],
  },
  {
    id: 'backend',
    items: ['Node.js', 'SQLite', 'GitHub Actions', 'GitLab CI'],
  },
] as const

export type StackGroupId = (typeof stackGroups)[number]['id']
