import type { MenuProps } from './src/menu'
export interface MenuType {
  name: string
  icon?: string
  path: string
  disabled?: boolean
  children?: MenuType[]
  orderNo?: number
  hideMenu?: boolean
}
export interface MenuItemRegistered {
  name: string
  namePath: string[]
  active: boolean
}
export interface MenuItemClicked {
  name: string
  namePath: string[]
  // route?: RouteLocationRaw
}

export interface MenuProvider {
  items: Record<string, MenuItemRegistered>
  subMenus: Record<string, MenuItemRegistered>
  activeName?: string
  props: MenuProps
  openedMenus: string[]

  addMenuItem: (item: MenuItemRegistered) => void
  removeMenuItem: (item: MenuItemRegistered) => void
  addSubMenu: (item: MenuItemRegistered) => void
  removeSubMenu: (item: MenuItemRegistered) => void

  openMenu: (name: string, namePath: string[]) => void
  closeMenu: (name: string, namePath: string[]) => void

  handleMenuItemClick: (item: MenuItemClicked) => void
  handleSubMenuClick: (subMenu: MenuItemRegistered) => void
}

export interface SubMenuProvider {
  addSubMenu: (item: MenuItemRegistered) => void
  removeSubMenu: (item: MenuItemRegistered) => void
}
