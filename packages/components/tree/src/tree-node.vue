<template>
	<div :class="ns.b()"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue-demi'
import { useNamespace } from '../../shared'
import { treeNodeProps } from './props'
export default defineComponent({
	props: treeNodeProps,
	setup(props, { emit }) {
		const ns = useNamespace('tree-node')
		return {
			ns,
		}
	},
})
</script>
<style></style>
