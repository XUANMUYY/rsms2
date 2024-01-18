// Utilities
import { createPinia } from 'pinia'
import { myPiniaPlugin } from './plugins'

const pinia = createPinia()

//plugins
pinia.use(myPiniaPlugin)

export default pinia
