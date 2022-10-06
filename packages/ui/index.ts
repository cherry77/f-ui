import type { App } from 'vue-demi'
import {
  DMenu,
  DMenuItem,
  DSimpleMenu,
  DSubMenu,
} from './src/index'

const components = [
  DMenu,
  DMenuItem,
  DSimpleMenu,
  DSubMenu,
]

const INSTALLED_KEY = Symbol('INSTALLED_KEY')
export const install = (app: App) => {
  if (app[INSTALLED_KEY]) return

  app[INSTALLED_KEY] = true
  components.forEach((c) => app.use(c))
}

export default {
  install
}
