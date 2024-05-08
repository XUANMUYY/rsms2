/// <reference types="vitest" />
// Plugins
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import ViteFonts from 'unplugin-fonts/vite'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import markdownRawPlugin from 'vite-raw-plugin'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import VueDevTools from 'vite-plugin-vue-devtools'

// Utilities
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src/renderer/src', import.meta.url)),
        '@renderer': resolve('src/renderer/src')
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
    },
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss'
        }
      }),
      ViteFonts({
        google: {
          families: [
            {
              name: 'Roboto',
              styles: 'wght@100;300;400;500;700;900'
            }
          ]
        }
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      markdownRawPlugin({
        fileRegex: /\.sql$/
      }),
      // VueDevTools()
    ],
    define: { 'process.env': {} },
    test: {
      globals: true,
      environment: 'happy-dom'
    }
  }
})
