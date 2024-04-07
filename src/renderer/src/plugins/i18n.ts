/**
 * plugins/i18n.ts
 */

import { createI18n } from 'vue-i18n'
import {messages} from "../i18n/i18n"

export default createI18n({
  locale: 'zhHans', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

