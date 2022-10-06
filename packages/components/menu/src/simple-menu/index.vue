<template>
  <Menu>
    <template v-for="item in items" :key="item.name">
      <RecursiveMenu :item="item" />
    </template>
  </Menu>
</template>
<script lang="ts">
import { defineComponent } from 'vue-demi'
import Menu from './../menu.vue'
import RecursiveMenu from './../recursive-menu.vue'
import type { MenuType } from '@f-ui/components/menu/types'
import type { PropType } from 'vue-demi'
export default defineComponent({
  name: 'DSimpleMenu',
  components: {
    Menu,
    RecursiveMenu,
  },
  props: {
    items: {
      type: Array as PropType<MenuType[]>,
      default: () => [],
    },
  },
})
</script>
<style></style>
