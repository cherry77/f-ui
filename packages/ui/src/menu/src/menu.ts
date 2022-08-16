import type { ExtractPropTypes, PropType } from 'vue-demi'
export const menuProps = {
  mode: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical',
  },
  defaultActive: {
    type: String,
    default: '',
  },
  defaultOpeneds: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  collapsed: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  collapsedWidth: {
    type: Number,
    default: 48,
  },
  iconSize: {
    type: Number,
    default: 20,
  },
  collapsedIconSize: {
    type: Number,
    default: 24,
  },
  rootIndent: Number,
  indent: {
    type: Number,
    default: 32,
  },
  labelField: {
    type: String,
    default: 'label',
  },
  keyField: {
    type: String,
    default: 'key',
  },
  childrenField: {
    type: String,
    default: 'children',
  },
  defaultExpandAll: Boolean,
  disabled: Boolean,
} as const
export type MenuProps = ExtractPropTypes<typeof menuProps>
