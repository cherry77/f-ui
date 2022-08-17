<template>
  <div id="app">
    <DMenu>
      <DMenuItem>1</DMenuItem>
      <DSubMenu>
        <DMenuItem>2</DMenuItem>
        <DMenuItem>3</DMenuItem>
        <DMenuItem>4</DMenuItem>
      </DSubMenu>
    </DMenu>
  </div>
</template>

<script>
import {DMenu, DMenuItem, DSubMenu} from 'f-ui'

export default {
  name: 'App',
  components: {
    DMenu,
    DMenuItem,
    DSubMenu
  }
}
</script>

<style>

</style>
