import type { App } from 'vue-demi'
import * as components from './src'

const INSTALLED_KEY = Symbol('INSTALLED_KEY')
export const install = (app: App) => {
  if (app[INSTALLED_KEY]) return

  app[INSTALLED_KEY] = true
  components.forEach((c) => app.use(c))
}
