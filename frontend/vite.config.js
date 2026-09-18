import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-icon.svg'],
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'JerseyHub - Premium Football Jerseys',
        short_name: 'JerseyHub',
        description: 'Authentic football jerseys for every fan. Shop club, international and retro collections.',
        theme_color: '#2563eb',
        background_color: '#0f1117',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-icon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'pwa-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'pwa-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        // Never precache the HTML app shell. A cached index.html can refer to
        // hashed chunks removed by a later Vercel deployment, causing 404s on
        // lazy-loaded routes. Fetch navigations from the network instead.
        globPatterns: ['**/*.{js,css,svg,png,ico}'],
        navigateFallback: null,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'jerseyhub-pages',
              networkTimeoutSeconds: 4,
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 24 * 60 * 60
              }
            }
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/jersey') || url.pathname.startsWith('/category') || url.pathname.startsWith('/product'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'jerseyhub-api-cache',
              networkTimeoutSeconds: 4,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60
              }
            }
          }
        ]
      }
    })
  ],
})
