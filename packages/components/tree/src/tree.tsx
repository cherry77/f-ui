import { defineComponent, provide, VNodeChild, TransitionGroup } from 'vue-demi'
import TreeNode from './tree-node'
import useData from './hooks/use-data'
import { treeProps, TREE_PROVIDE_KEY } from './props'
import { TreeNodeKey } from './types'
import { isFunction, isString } from 'lodash-es'
import { useNamespace } from '../../shared'
import useExpand from './hooks/use-expand'
import useState from './hooks/use-state'
import useCurrentData from './hooks/use-current-data'
import useCheck from './hooks/use-check'
import useSelect from './hooks/use-select'
export default defineComponent({
  name: 'FTree',
  props: treeProps,
  setup(props, { emit }) {
    const ns = useNamespace('tree')
    const { nodeList, allKeys } = useData({
      props,
      emit,
    })

    const {
      currentExpandedKeys,
      updateExpandedKeys,
      currentCheckedKeys,
      updateCheckedKeys,
      currentSelectedKeys,
      updateSelectedKeys,
      hasSelected,
    } = useState({ props, emit });

    console.log('nodeList=========', nodeList)

    const { expandNode, expandingNode } = useExpand({
      allKeys,
      // isSearchingRef,
      // filteredExpandedKeys,
      nodeList,
      currentExpandedKeys,
      updateExpandedKeys,
      props,
      emit,
    });

    const { selectNode } = useSelect({
      nodeList,
      currentSelectedKeys,
      updateSelectedKeys,
      props,
      emit,
    });

    const { checkNode } = useCheck({
      allKeys,
      nodeList,
      currentCheckedKeys,
      updateCheckedKeys,
      props,
      emit,
    });

    const { currentData } = useCurrentData({
      // isSearchingRef,
      // filteredExpandedKeys,
      currentExpandedKeys,
      // filteredKeys,
      allKeys,
      expandingNode,
      nodeList,
    });

    provide(TREE_PROVIDE_KEY, {
      props,
      nodeList,
      selectNode,
      expandNode,
      checkNode,
      hasSelected,
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
      if (!node) return null

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
        <TransitionGroup name={ns.m('list')}>
          {currentData.value.map(renderNode)}
        </TransitionGroup>
      </div>
    )
  },
})
