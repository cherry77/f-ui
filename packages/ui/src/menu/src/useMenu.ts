import { computed } from 'vue-demi'
import type { ComponentInternalInstance, Ref } from 'vue-demi'

export default function useMenu(
  instance: ComponentInternalInstance,
  currentName: Ref<string>
) {
  const namePath = computed(() => {
    let parent = instance.parent!
    const path = [currentName.value]
    while (parent.type.name !== 'DMenu') {
      if (parent.props.name) path.unshift(parent.props.name as string)
      parent = parent.parent!
    }
    return path
  })

  const parentMenu = computed(() => {
    let parent = instance.parent
    while (parent && !['DMenu', 'DSubMenu'].includes(parent.type.name!)) {
      parent = parent.parent
    }
    return parent!
  })

  const paddingStyle = computed(() => {
    let parent = instance.parent
    let padding = 20
    while (parent && parent.type.name !== 'DMenu') {
      if (parent.type.name === 'DSubMenu') {
        padding += 20
      }
      parent = parent.parent
    }
    return { paddingLeft: `${padding}px` }
  })
  return {
    namePath,
    parentMenu,
    paddingStyle,
  }
}
