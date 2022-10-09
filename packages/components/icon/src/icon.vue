<template>
  <i class="f-icon iconfont" :style="style">
    <slot />
  </i>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue-demi'
import { iconProps } from './icon'
import type { IconProps } from './icon'
export default defineComponent({
  name: 'FIcon',
  props: iconProps,
  setup(props: IconProps) {
    const style = computed(() => {
      if (!props.size && !props.color) {
        return {}
      }
      return {
        ...(props.size ? { 'font-size': `${props.size}px` } : {}),
        ...(props.color ? { color: `${props.color}px` } : {}),
      }
    })
    return {
      style,
    }
  },
})
</script>
<style>

</style>
