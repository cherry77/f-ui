import { concat } from '@f-ui/utils'
import { isNil } from 'lodash-es'
import { ref, watch } from 'vue-demi'
import type { TreeNodeKey, InnerTreeNode } from '../types'
import type { TreeProps } from '../props'

let uid = 1
const getUid = () => {
  return uid++
}

export default ({ props, emit }: { props: TreeProps; emit: any }) => {
  const nodeList: Map<TreeNodeKey, InnerTreeNode> = new Map()
  const allKeys = ref<TreeNodeKey[]>([])

  watch(
    allKeys,
    () => {
      emit('update:nodeList', nodeList);
    },
    {
      immediate: true,
    },
  );
  watch(
    [() => props.data],
    () => {
      allKeys.value = flatNodes(props.data)
    },
    {
      immediate: true,
      deep: true,
    }
  )
  function flatNodes(
    nodes: InnerTreeNode[] = [],
    children: InnerTreeNode[] = [],
    indexPath: TreeNodeKey[] = [],
    level = 1
  ) {
    return nodes.reduce((res, item) => {
      const copy = transformNode(item, indexPath, level)
      nodeList.set(copy.value, copy)

      res.push(copy.value)
      children.push(copy)
      if (copy.hasChildren) {
        const children: InnerTreeNode[] = []
        const keys = flatNodes(
          copy.children,
          children,
          copy.indexPath,
          level + 1
        )
        copy.children = children
        copy.childrenPath = keys
        concat(res, keys)
      }
      return res
    }, [])
  }

  function transformNode(
    item: InnerTreeNode,
    indexPath: TreeNodeKey[],
    level: number
  ) {
    const value = item[props.valueField]
    const label = item[props.labelField]
    const children = item[props.childrenField]
    const hasChildren = !!(Array.isArray(children) && children.length)
    let isLeaf
    if (!isNil(item.isLeaf)) {
      isLeaf = item.isLeaf
    } else if (hasChildren) {
      isLeaf = false
    } else if (props.remote) {
      isLeaf = false
    } else {
      isLeaf = true
    }

    const newItem: InnerTreeNode = {
      uid: getUid(),
      origin: item,
      value,
      label,
      isLeaf,
      children,
      hasChildren,
      indexPath: [...indexPath, value],
      level,
      prefix: item.prefix,
      suffix: item.suffix,
      disabled: item.disabled,
      selectable: item.selectable,
      checkable: item.checkable,
    }
    let copy: InnerTreeNode
    if (nodeList.get(value)) {
      // 如果存在，取存在的
      copy = nodeList.get(value)
      Object.assign(copy, newItem)
    } else {
      // 如果不存在，只需要将三个字段设置为响应式即可
      copy = Object.assign({}, newItem)
      copy.isExpanded = ref(false)
      copy.isIndeterminate = ref(false)
      copy.isChecked = ref(false)
    }
    return copy
  }
  return {
    nodeList,
    allKeys,
  }
}
