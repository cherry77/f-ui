import type { ExtractPropTypes, PropType } from 'vue-demi'

export const menuItemProps = {
  name: {
    type: String as PropType<string>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>
