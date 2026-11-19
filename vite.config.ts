import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { imagetools } from 'vite-imagetools'

export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [vue(), imagetools()],
  build: {
    manifest: !isSsrBuild,
    ssrEmitAssets: true,
  },
  ssr: {
    noExternal: ['@fontsource/inter', '@fontsource/jetbrains-mono'],
  },
  server: {
    // SPA fallback so /en/ works in dev
  },
  appType: 'spa',
}))
