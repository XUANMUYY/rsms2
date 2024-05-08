/// <reference types="vite/client" />

import type { ComponentOptionsMixin, ComponentPropsOptions, ComputedOptions, DefineComponent } from 'vue'
import { EmitEvents, PublicMethods, VueDatePickerProps } from '@vuepic/vue-datepicker'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.sql' {
  const content: string
  export default content
}
