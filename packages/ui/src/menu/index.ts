import { withInstall } from '@f-ui/utils'

import Menu from './src/menu.vue'
import MenuItem from './src/menu-item.vue'
import SubMenu from './src/sub-menu.vue'
import RecursiveMenu from './src/recursive-menu.vue'
import SimpleMenu from './src/simple-menu/index.vue'

export const DMenu = withInstall(Menu, {
  MenuItem,
  SubMenu,
  RecursiveMenu,
})
export default DMenu
export const DMenuItem = withInstall(MenuItem)
export const DSubMenu = withInstall(SubMenu)
export const DSimpleMenu = withInstall(SimpleMenu)
