// filepath: /home/joaolucas/Legis-Frontend/frontend/frontend/vite.config.js
import { defineConfig } from 'vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
})