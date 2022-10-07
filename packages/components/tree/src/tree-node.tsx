import { computed, defineComponent, render } from 'vue-demi'
import { useNamespace } from '../../shared'
import { INDENT } from './const'
import useTreeNode from './hooks/use-tree-node'
import { treeNodeProps } from './props'
export default defineComponent({
  name: 'FTreeNode',
  props: treeNodeProps,
  setup(props, { emit }) {
    const ns = useNamespace('tree-node')
    const {
      root,
      disabled,
      selectable,
      checkable,
      expanded,
      selected,
      checked,
      indeterminate,
      // isInline,
      // isFirst,
    } = useTreeNode(props)

    const classes = computed(() => [
      ns.b(),
      disabled.value && ns.m('disabled'),
      selected.value && ns.m('selected'),
    ])

    const style = computed(() => ({
      paddingLeft: (props.level - 1) * INDENT + 'px',
    }))

    const handleClickCheckbox = (event: Event) => {
      if (disabled.value) return
      if (checkable.value) {
        return root.checkNode(props.value, event)
      }
    };

    const renderCheckbox = () => {
      if (!checkable.value) return null
      return (
        <span class={ns.e('checkbox')}>
          <input type="checkbox" indeterminate={indeterminate.value} checked={checked.value} disabled={disabled.value} onClick={handleClickCheckbox}></input>
        </span>
      )
    }

    return () => (
      <div class={classes.value} style={style.value}>
        {renderCheckbox()}
        <span class={ns.e('content')}>{props.label}</span>
      </div>
    )
  }
})
