<template>
  <li :class="classes">
    <div
      :class="[prefixCls + '__title']"
      :style="paddingStyle"
      @click="handleClick"
    >
      <slot name="title" />
      <!-- <DIcon :class="iconClass" /> -->
    </div>
    <CollapseTransition name="slide">
      <ul v-show="opened" :class="[prefixCls]">
        <slot />
      </ul>
    </CollapseTransition>
  </li>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  provide,
  reactive,
  ref,
  toRef,
} from 'vue-demi'
// import DIcon from '@f-ui/components/icon'
import { throwError } from '@f-ui/utils'
import CollapseTransition from './collapse-transition.vue'
import useMenu from './useMenu'
import type { MenuProvider, SubMenuProvider } from './../types'

const prefixCls = 'd-sub-menu'
const COMPONENT_NAME = 'DSubMenu'
export default defineComponent({
  name: COMPONENT_NAME,
  components: {
    CollapseTransition,
    // DIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // data
    const instance = getCurrentInstance()!
    const { parentMenu, namePath, paddingStyle } = useMenu(
      instance,
      toRef(props, 'name')
    )
    const items = ref<MenuProvider['items']>({})
    const subMenus = ref<MenuProvider['subMenus']>({})

    // inject
    const rootMenu = inject<MenuProvider>('rootMenu')
    if (!rootMenu) throwError(COMPONENT_NAME, 'can not inject root menu')

    const subMenu = inject<SubMenuProvider>(`subMenu:${parentMenu.value!.uid}`)
    if (!subMenu) throwError(COMPONENT_NAME, 'can not inject sub menu')

    // computed
    const opened = computed(() => rootMenu.openedMenus.includes(props.name))
    const active = computed(() => {
      let isActive = false

      Object.values(items.value).forEach((item) => {
        if (item.active) {
          isActive = true
        }
      })

      Object.values(subMenus.value).forEach((subItem) => {
        if (subItem.active) {
          isActive = true
        }
      })
      return isActive
    })
    const item = reactive({ name: props.name, namePath, active })
    const classes = computed(() => {
      return [`${prefixCls}`]
    })
    const iconClass = computed(() => {
      return ['d-icon-arrow-down', `${prefixCls}-icon`]
    })

    // methods
    const handleClick = () => {
      rootMenu.handleSubMenuClick({
        name: props.name,
        namePath: namePath.value,
        active: false,
      })
    }

    // provide
    {
      const addSubMenu: SubMenuProvider['addSubMenu'] = (item) => {
        subMenus.value[item.name] = item
      }
      const removeSubMenu: SubMenuProvider['removeSubMenu'] = (item) => {
        delete subMenus.value[item.name]
      }
      provide<SubMenuProvider>(`subMenu:${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        // handleMouseleave,
        // mouseInChild,
      })
    }
    // lifecycle
    onMounted(() => {
      rootMenu.addSubMenu(item)
      subMenu.addSubMenu(item)
    })

    return {
      handleClick,
      opened,
      classes,
      prefixCls,
      iconClass,
      paddingStyle,
    }
  },
})
</script>
