import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Brandon Daza | Software Architect',
        short_name: 'Brandon Daza',
        description: 'Ecosistema Digital de Ingeniería y Soluciones Tecnológicas',
        theme_color: '#050505',
        background_color: '#050505',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'img/favicon/favicon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/favicon/favicon.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'img/favicon/favicon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
