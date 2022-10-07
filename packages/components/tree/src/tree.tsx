import { defineComponent, provide, VNodeChild } from 'vue-demi'
import TreeNode from './tree-node'
import useData from './hooks/use-data'
import { treeProps, TREE_PROVIDE_KEY } from './props'
import { TreeNodeKey } from './types'
import { isFunction, isString } from 'lodash-es'
import { useNamespace } from '../../shared'
export default defineComponent({
  name: 'FTree',
  props: treeProps,
  setup(props, { emit }) {
    const ns = useNamespace('tree')
    const { nodeList, allKeys } = useData({
      props,
      emit,
    })
    console.log('nodeList=========', nodeList)

    provide(TREE_PROVIDE_KEY, {
      props,
      nodeList,
      // selectNode,
      // expandNode,
      // checkNode,
      // hasSelected,
      // handleDragstart,
      // handleDragenter,
      // handleDragover,
      // handleDragleave,
      // handleDragend,
      // handleDrop,
      // dragOverInfo,
    });

    const renderNode = (value: TreeNodeKey) => {
      const node = nodeList.get(value)
      const itemSlots: { [key: string]: () => VNodeChild | string } = {}
      if (isFunction(node.prefix)) {
        itemSlots.prefix = node.prefix
      }
      if (isString(node.prefix)) {
        itemSlots.prefix = () => node.prefix as string
      }
      if (isFunction(node.suffix)) {
        itemSlots.suffix = node.suffix
      }
      if (isString(node.suffix)) {
        itemSlots.suffix = () => node.suffix as string
      }
      return (
        <TreeNode
          key={node.uid}
          level={node.level}
          value={node.value}
          label={node.label}
          disabled={node.disabled}
          selectable={node.selectable}
          checkable={node.checkable}
          isLeaf={node.isLeaf}
          v-slots={itemSlots}
          draggable={props.draggable && !node.disabled}
        ></TreeNode>
      )
    }

    return () => (
      <div class={ns.b()}>
        {allKeys.value.map((value) => renderNode(value))}
      </div>
    )
  },
})
