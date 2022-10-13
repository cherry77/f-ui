<template>
  <Tree :data="data" checkable cascade draggable @drop="onDrop" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Tree from '@f-ui/components/tree'
const data = ref([
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

function findSiblingsAndIndex(node, nodes): any {
  if (!node || !nodes) return [null, null];
  for (let i = 0; i < nodes.length; ++i) {
    const siblingNode = nodes[i];
    if (siblingNode.value === node.value) return [nodes, i];
    const [siblings, index] = findSiblingsAndIndex(
      node,
      siblingNode.children,
    );
    if (siblings && index !== null) return [siblings, index];
  }
  return [null, null];
}

const onDrop = ({ node, dragNode, position }) => {
  const [dragNodeSiblings, dragNodeIndex] = findSiblingsAndIndex(
    dragNode,
    data.value,
  );
  if (dragNodeSiblings === null || dragNodeIndex === null) return;
  dragNodeSiblings.splice(dragNodeIndex, 1);

  if (position === 'before') {
    const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(
      node,
      data.value,
    );
    if (nodeSiblings === null || nodeIndex === null) return;
    nodeSiblings.splice(nodeIndex, 0, dragNode.origin);
  } else if (position === 'after') {
    const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(
      node,
      data.value,
    );
    console.log('===', nodeSiblings)
    if (nodeSiblings === null || nodeIndex === null) return;
    nodeSiblings.splice(nodeIndex + 1, 0, dragNode.origin);
  }
};
</script>
<style scoped>

</style>
