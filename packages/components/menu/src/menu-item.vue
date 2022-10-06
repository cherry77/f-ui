<template>
  <li :class="classes" :style="paddingStyle" @click.stop="handleClick">
    <slot />
    <slot name="title" />
  </li>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  reactive,
  toRef,
} from 'vue-demi'
import { throwError } from '@f-ui/utils'
import { menuItemProps } from './menu-item'
import useMenu from './useMenu'
import type {
  MenuItemRegistered,
  MenuProvider,
  SubMenuProvider,
} from './../types'

const prefixCls = 'd-menu'
const COMPONENT_NAME = 'DMenuItem'
export default defineComponent({
  name: COMPONENT_NAME,
  props: menuItemProps,
  setup(props, { emit }) {
    const instance = getCurrentInstance()!
    // data
    const rootMenu = inject<MenuProvider>('rootMenu')
    if (!rootMenu) throwError(COMPONENT_NAME, 'can not inject root menu')

    const { parentMenu, paddingStyle, namePath } = useMenu(
      instance,
      toRef(props, 'name')
    )
    const subMenu = inject<SubMenuProvider>(`subMenu:${parentMenu.value.uid}`)
    if (!subMenu) throwError(COMPONENT_NAME, 'can not inject sub menu')

    // const active = computed(() => props.name === rootMenu.activeName)
    const item: MenuItemRegistered = reactive({
      name: props.name,
      namePath,
      active: props.name === rootMenu.activeName,
    })

    // computed
    const classes = computed(() => {
      return [
        `${prefixCls}-item`,
        {
          'is-active': props.name === rootMenu.activeName,
          'is-disabled': props.disabled,
        },
      ]
    })

    // methods
    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.handleMenuItemClick({
          name: props.name,
          namePath: namePath.value,
          // route: props.route,
        })
        emit('click', item)
      }
    }

    // lifecycle
    onMounted(() => {
      rootMenu.addMenuItem(item)
    })

    return {
      classes,
      handleClick,
      paddingStyle,
    }
  },
})
</script>
