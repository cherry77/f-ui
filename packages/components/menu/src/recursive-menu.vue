<template>
  <MenuItem v-if="!item.children" :key="item.name" :name="name">
    {{ item.name }}
  </MenuItem>
  <SubMenu v-else :name="name">
    <template #title>{{ item.name }}</template>
    <template v-for="child in item.children" :key="child.name">
      <DRecursiveMenu :item="child" />
    </template>
  </SubMenu>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue-demi'
import MenuItem from './menu-item.vue'
import SubMenu from './sub-menu.vue'
import type { MenuType } from '@f-ui/components/menu/types'
import type { PropType } from 'vue-demi'
export default defineComponent({
  name: 'DRecursiveMenu',
  components: {
    MenuItem,
    SubMenu,
  },
  props: {
    item: {
      type: Object as PropType<MenuType>,
      required: true,
    },
  },
  setup(props) {
    const name = computed(() => {
      return props.item.name
    })
    return {
      name,
    }
  },
})
</script>
<style></style>
