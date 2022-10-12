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
    const ns = useNamespace('tree')
    const {
      root,
      disabled,
      selectable,
      checkable,
      isExpanded,
      isSelected,
      isChecked,
      isIndeterminate,
      // isInline,
      // isFirst,
    } = useTreeNode(props)

    const classes = computed(() => [
      ns.e('node'),
      disabled.value && ns.em('node', 'disabled'),
      isSelected.value && ns.em('node', 'selected'),
    ])

    const style = computed(() => ({
      paddingLeft: (props.level - 1) * INDENT + 'px',
    }))

    const handleToggle = (event: Event) => {
      if (disabled.value) return
      return root?.expandNode(props.value, event)
    }

    const handleClickContent = (event: Event) => {
      if (disabled.value) return;
      // 默认 select 行为
      if (selectable.value) {
        return root.selectNode(props.value, event);
      }
      // 再 check 行为
      if (checkable.value) {
        return root.checkNode(props.value, event);
      }
      // 再展开行为
      if (!props.isLeaf) {
        handleToggle(event);
      }
    }

    const handleClickCheckbox = (event: Event) => {
      if (disabled.value) return
      if (checkable.value) {
        return root.checkNode(props.value, event)
      }
    };

    const renderToggle = () => {
      if (props.isLeaf) {
        return <span class={ns.e('node-toggle')}></span>
      }
      return (
        <span class={ns.e('node-toggle')} onClick={handleToggle}>
          <FIcon class={isExpanded.value ? 'f-icon-arrow_down' : 'f-icon-arrow_right'}></FIcon>
        </span>
      )
    }

    const renderCheckbox = () => {
      if (!checkable.value) return null
      return (
        <span class={ns.e('checkbox')}>
          <input type="checkbox" indeterminate={isIndeterminate.value} checked={isChecked.value} disabled={disabled.value} onClick={handleClickCheckbox}></input>
        </span>
      )
    }

    return () => (
      <div class={classes.value} style={style.value}>
        {renderToggle()}
        {renderCheckbox()}
        <span class={ns.e('content')} onClick={handleClickContent}>{props.label}</span>
      </div>
    )
  }
})
