<template>
  <button>1111111111111{{content}}</button>
</template>
<script lang="ts">
  import {ref, defineComponent} from 'vue-demi'
  export default defineComponent({
    name: 'f-button',
    setup(props) {
      const content = ref('message')
      return {
        content
      }
    }
  })
  
</script>
<style></style>