import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/bullion-bank/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    headers: {
      'Content-Security-Policy': [
        "default-src 'self' https: wss: ws: data:",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https:",
        "style-src 'self' 'unsafe-inline' https:",
        "frame-src 'self' https://www.tradingview-widget.com https://www.tradingview.com",
      ].join('; '),
    },
    proxy: {
      '/api-wilayah': {
        target: 'https://emsifa.github.io/api-wilayah-indonesia/api',
        changeOrigin: true,
        followRedirects: true,
        rewrite: (path) => path.replace(/^\/api-wilayah/, ''),
      },
    },
  },
})
