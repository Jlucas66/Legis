// filepath: /home/joaolucas/Legis-Frontend/frontend/frontend/vite.config.js
import { defineConfig } from 'vite'
import { quasar } from '@quasar/vite-plugin'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 9000,
    strictPort: true,
  },

  plugins: [
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
})