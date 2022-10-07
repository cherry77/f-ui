<template>1111111</template>
<script lang="ts">
import { defineComponent } from 'vue-demi'
import useData from './hooks/use-data'
import { treeProps } from './props'
export default defineComponent({
	props: treeProps,
	setup(props, { emit }) {
		const { nodeList, allKeys } = useData({
			props,
			emit,
		})
		console.log('nodeList============', nodeList)
	},
})
</script>
<style></style>
