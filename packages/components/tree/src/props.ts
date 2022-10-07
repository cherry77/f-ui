import type { PropType, ExtractPropTypes, Ref, InjectionKey } from 'vue-demi'
import { InnerTreeNode, TreeNode, TreeNodeKey } from './types'
import { CHECK_STRATEGY } from './const'

export const treeProps = {
	data: {
		type: Array as PropType<TreeNode[]>,
		default(): TreeNode[] {
			return []
		},
	},
	defaultExpandAll: {
		type: Boolean,
		default: false,
	},
	expandedKeys: {
		type: Array as PropType<TreeNodeKey[]>,
		default(): TreeNodeKey[] {
			return []
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
			return []
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
			return []
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
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>

export const treeNodeProps = {
	value: {
		type: [String, Number] as PropType<string | number>,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	disabled: {
		type: Boolean,
	},
	selectable: {
		type: Boolean,
	},
	checkable: {
		type: Boolean,
	},
	isLeaf: {
		type: Boolean,
		default: false,
	},
	level: {
		type: Number,
		default: 0,
	},
	draggable: {
		type: Boolean,
		default: false,
	},
} as const
export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>

export interface TreeInst {
	props: TreeProps
	selectNode: (value: TreeNodeKey, event: Event) => void
	expandNode: (value: TreeNodeKey, event: Event) => void
	checkNode: (value: TreeNodeKey, event: Event) => void
	hasSelected: (value: TreeNodeKey) => boolean
	nodeList: Map<TreeNodeKey, InnerTreeNode>
	handleDragstart: (value: TreeNodeKey, event: DragEvent) => void
	handleDragenter: (value: TreeNodeKey, event: DragEvent) => void
	handleDragover: (value: TreeNodeKey, event: DragEvent) => void
	handleDragleave: (value: TreeNodeKey, event: DragEvent) => void
	handleDragend: (value: TreeNodeKey, event: DragEvent) => void
	handleDrop: (value: TreeNodeKey, event: DragEvent) => void
	dragOverInfo: Ref<{
		node: InnerTreeNode
		// position: DropPosition
	}>
}

export const TREE_PROVIDE_KEY: InjectionKey<TreeInst> = Symbol('FTree')
