import { computed, defineComponent, render } from 'vue-demi'
import { FIcon } from '@f-ui/components'
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
      isExpanded,
      selected,
      isChecked,
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

    const handleToggle = (event: Event) => {
      if (disabled.value) return
      return root?.expandNode(props.value, event)
    }

    const handleClickCheckbox = (event: Event) => {
      if (disabled.value) return
      if (checkable.value) {
        return root.checkNode(props.value, event)
      }
    };

    const renderToggle = () => {
      if (props.isLeaf) {
        return <span class={ns.e('node-indent')}></span>
      }
      return (
        <span class={ns.e('toggle')} onClick={handleToggle}>
          <FIcon class={isExpanded.value ? 'f-icon-arrow_down' : 'f-icon-arrow_right'}></FIcon>
        </span>
      )
    }

    const renderCheckbox = () => {
      if (!checkable.value) return null
      return (
        <span class={ns.e('checkbox')}>
          <input type="checkbox" indeterminate={indeterminate.value} checked={isChecked.value} disabled={disabled.value} onClick={handleClickCheckbox}></input>
        </span>
      )
    }

    return () => (
      <div class={classes.value} style={style.value}>
        {renderToggle()}
        {renderCheckbox()}
        <span class={ns.e('content')}>{props.label}</span>
      </div>
    )
  }
})
