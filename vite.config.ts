import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

export default ({ mode }: { mode: string }) => {
  loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [vue(), VueDevTools()],
    define: {
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version)
    },
    build: {
      assetsInlineLimit: 40960,
      chunkSizeWarningLimit: 1000,
      target: 'ESNext',
      minify: false,
      cssCodeSplit: false,
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          format: 'esm',
          minifyInternalExports: false
        }
      }
    },
    esbuild: {
      supported: {
        'top-level-await': true
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}
