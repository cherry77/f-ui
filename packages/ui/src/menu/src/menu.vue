<template>
  <ul :class="classes">
    <slot />
  </ul>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
} from 'vue-demi'
import { menuProps } from './menu'
import type { MenuProvider, SubMenuProvider } from './../types'

const prefixCls = 'd-menu'
export default defineComponent({
  name: 'DMenu',
  props: menuProps,
  emits: ['on-select', 'on-open-change'],
  setup(props, { emit }) {
    const instance = getCurrentInstance()!
    console.log('==========', instance)
    // data
    const activeName = ref<MenuProvider['activeName']>(props.defaultActive)
    const items = ref<MenuProvider['items']>({})
    const subMenus = ref<MenuProvider['subMenus']>({})
    const openedMenus = ref<MenuProvider['openedMenus']>([])

    // computed
    const classes = computed(() => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${props.mode}`]: props.mode,
        },
      ]
    })

    // methods
    const initMenu = () => {
      const activeItem = activeName.value && items.value[activeName.value]
      if (!activeItem || props.collapsed) return

      const namePath = activeItem.namePath
      // expand all subMenus of the menu item
      namePath.forEach((name) => {
        const subMenu = subMenus.value[name]
        subMenu && openMenu(name, subMenu.namePath)
      })
    }

    const openMenu: MenuProvider['openMenu'] = (name, namePath) => {
      if (openedMenus.value.includes(name)) return

      openedMenus.value.push(name)
      emit('on-open-change', name, namePath)
    }

    const closeMenu: MenuProvider['closeMenu'] = (name, namePath) => {
      const i = openedMenus.value.indexOf(name)
      if (i !== -1) {
        openedMenus.value.splice(i, 1)
      }
      emit('on-open-change', name, namePath)
    }

    const handleMenuItemClick: MenuProvider['handleMenuItemClick'] = (
      menuItem
    ) => {
      const { name } = menuItem
      if (name === undefined) return

      activeName.value = name
      emit('on-select', name)
    }

    const handleSubMenuClick: MenuProvider['handleSubMenuClick'] = ({
      name,
      namePath,
    }) => {
      const isOpened = openedMenus.value.includes(name)
      isOpened ? closeMenu(name, namePath) : openMenu(name, namePath)
    }

    // const updateActiveName = (val: string) => {}

    // watch
    watch(
      () => props.defaultActive,
      (currentActive) => {
        updateActiveName(currentActive)
      }
    )

    // provide
    {
      const addSubMenu: SubMenuProvider['addSubMenu'] = (item) => {
        subMenus.value[item.name] = item
      }

      const removeSubMenu: SubMenuProvider['removeSubMenu'] = (item) => {
        delete subMenus.value[item.name]
      }

      const addMenuItem: MenuProvider['addMenuItem'] = (item) => {
        items.value[item.name] = item
      }

      const removeMenuItem: MenuProvider['removeMenuItem'] = (item) => {
        delete items.value[item.name]
      }

      provide<MenuProvider>(
        'rootMenu',
        reactive({
          items,
          subMenus,
          activeName,
          props,
          openedMenus,
          openMenu,
          closeMenu,
          addMenuItem,
          removeMenuItem,
          addSubMenu,
          removeSubMenu,
          handleMenuItemClick,
          handleSubMenuClick,
        })
      )
      provide<SubMenuProvider>(
        `subMenu:${instance.uid}`,
        reactive({
          addSubMenu,
          removeSubMenu,
          // handleMouseleave
        })
      )
    }
    // lifecycle
    onMounted(() => {
      initMenu()
    })

    return {
      classes,
      handleMenuItemClick,
    }
  },
})
</script>
