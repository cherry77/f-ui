import type { VNodeChild, Ref } from 'vue-demi'
export type TreeNodeKey = string | number;

export interface TreeNode {
  value: TreeNodeKey
  label: string
  children?: TreeNode[]
  disabled?: boolean
  selectable?: boolean
  checkable?: boolean
  isLeaf?: boolean
  prefix?: string | (() => VNodeChild);
  suffix?: string | (() => VNodeChild);
  [key: string]: any;
}

export interface InnerTreeNode extends TreeNode {
  origin?: TreeNode
  level?: number
  hasChildren?: boolean
  indexPath?: TreeNodeKey[]
  childrenPath?: TreeNodeKey[];
  children?: InnerTreeNode[];
  isExpanded?: Ref<boolean>;
  isChecked?: Ref<boolean>;
  isIndeterminate?: Ref<boolean>;
}
