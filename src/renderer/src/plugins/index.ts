/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import PerfectScrollbar from "vue3-perfect-scrollbar"
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import VueApexCharts from "vue3-apexcharts"

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app
    .use(router)
    .use(PerfectScrollbar)
    .use(VueApexCharts)
    .use(pinia)
    .use(vuetify)
}
