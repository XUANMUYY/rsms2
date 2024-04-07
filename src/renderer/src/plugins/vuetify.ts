/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composable
import { createVuetify } from 'vuetify'
import { en, zhHans } from 'vuetify/locale'

const light = {
  dark: false,
  colors: {
    primary: '#1867C0',
    secondary: '#5CBBF6',
    miniBG: '#EEEEEE',
  }
}
const dark = {
  dark: true,
  colors: {
    miniBG: '#444444',
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: { light, dark }
  },
  locale: {
    locale: 'zhHans',
    messages: { zhHans, en },
  },
})
