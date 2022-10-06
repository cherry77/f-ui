import type { PropType, ExtractPropTypes } from 'vue-demi'
import { TreeNode, TreeNodeKey } from './types'
import { CHECK_STRATEGY } from './const';

export const treeProps = {
  data: {
    type: Array as PropType<TreeNode[]>,
    default(): TreeNode[] {
      return []
    }
  },
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  expandedKeys: {
    type: Array as PropType<TreeNodeKey[]>,
    default(): TreeNodeKey[] {
      return [];
    },
  },
  accordion: {
    type: Boolean,
    default: false,
  },
  selectable: {
    type: Boolean,
    default: true,
  },
  selectedKeys: {
    type: Array as PropType<TreeNodeKey[]>,
    default(): TreeNodeKey[] {
      return [];
    },
  },
  cascade: {
    type: Boolean,
    default: false,
  },
  checkable: {
    type: Boolean,
    default: false,
  },
  checkStrictly: {
    type: String as PropType<
      typeof CHECK_STRATEGY[keyof typeof CHECK_STRATEGY]
    >,
    default: CHECK_STRATEGY.ALL,
  },
  checkedKeys: {
    type: Array as PropType<TreeNodeKey[]>,
    default(): TreeNodeKey[] {
      return [];
    },
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  childrenField: {
    type: String,
    default: 'children',
  },
  valueField: {
    type: String,
    default: 'value',
  },
  labelField: {
    type: String,
    default: 'label',
  },
  remote: {
    type: Boolean,
    default: false,
  },
  loadData: {
    type: Function as PropType<(node: TreeNode) => Promise<any>>,
  },
  filterMethod: {
    type: Function as PropType<
      (filterText: string, node: TreeNode) => boolean
    >,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  virtualList: {
    type: Boolean,
    default: false,
  },
  cancelable: {
    type: Boolean,
    default: true,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
} as const
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;