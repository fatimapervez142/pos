// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['oh-vue-icons/icons']
  },
  // if you use SSR, you may need:
  ssr: {
    noExternal: ['oh-vue-icons']
  }
})
