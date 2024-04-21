<template>
  {{ msg }}
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { computedAsync } from '@vueuse/core'
// const msg = computed(() => {
//   let res = null
//     ; (async () => {
//       res = await Promise.resolve('Hello World')
//     })()
//   console.log('=====', res)
//   return res
// })
// const msg = computed(() => 'Hello World')
const msg = computed(() => Promise.resolve('Hello World'))
</script>
<style scoped></style>
