import { isUndefined } from 'lodash-es'
import { computed, inject } from 'vue-demi'
import { TreeNodeProps, TREE_PROVIDE_KEY } from '../props'

export default (props: TreeNodeProps) => {
	const root = inject(TREE_PROVIDE_KEY)

	const node = root.nodeList.get(props.value)

	const expanded = computed(() => node.expanded?.value)

	// TODO
	const selected = computed(() => true)

	const checked = computed(() => node.checked.value)

	const indeterminate = computed(() => node.indeterminate.value)

	const disabled = computed(() => props.disabled)

	const selectable = computed(() =>
		isUndefined(props.selectable) ? root.props.selectable : props.selectable
	)

	const checkable = computed(() =>
		isUndefined(props.checkable) ? root.props.checkable : props.checkable
	)

	return {
		root,
		disabled,
		expanded,
		selected,
		checked,
		indeterminate,
		selectable,
		checkable,
		// isFirst,
	}
}
