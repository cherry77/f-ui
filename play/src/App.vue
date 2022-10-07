<template>
	<Tree :data="treeData" checkable />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Tree from '@f-ui/components/tree'
const treeData = ref([
	...Array.from({ length: 3 }).map((_, index) => ({
		value: `key_${index}`,
		label: `Parent node ${index}`,
		children:
			index % 2 === 0
				? Array.from({ length: 2 }).map((_, index2) => ({
						value: `key_${index}_${index2}`,
						label: `Leaf node ${index}-${index2}`,
						children:
							index % 2 === 0
								? Array.from({ length: 3 }).map(
										(_, index3) => ({
											value: `key_${index}_${index2}_${index3}`,
											label: `Leaf node ${index}-${index2}-${index3}`,
										})
								  )
								: undefined,
				  }))
				: undefined,
	})),
])
</script>
<style scoped></style>
