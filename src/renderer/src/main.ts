/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import VueDatePicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'
import EChart from 'vue-echarts'
import "echarts"


// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.component('VueDatePicker', VueDatePicker)
   .component('v-chart', EChart)
app.mount('#app')
