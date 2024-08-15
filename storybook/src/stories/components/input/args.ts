export const menuProps = {
  modelValue: {
    description:
      '当前选中菜单标识符(v-model)',
    table: {
      category: 'SimpleMenu 属性',
      type: { summary: 'string|number' },
      defaultValue: { summary: 'null' },
    },
  },
  mode: {
    description: '模式，可选值有horizontal和vertical',
    table: {
      category: 'SimpleMenu 属性',
      type: { summary: 'String' },
      defaultValue: { summary: 'vertical' },
    },
    options: ['vertical', 'horizontal'],
    control: {
      type: 'select',
    },
  },
  collapsed: {
    description: '是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）',
    table: {
      category: 'SimpleMenu 属性',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  // menuTrigger: {
  //   description: '子菜单打开的触发方式，在 mode 为 horizontal 时和 collapsed: true 时有效。',
  //   table: {
  //     category: 'SimpleMenu 属性',
  //     type: { summary: 'string' },
  //     defaultValue: { summary: 'hover' },
  //   },
  //   options: ['hover', 'click'],
  //   control: {
  //     type: 'select',
  //   },
  // },
  defaultExpandAll: {
    description: '是否默认展开全部菜单，当有 expandedKeys 时，defaultExpandAll 将失效',
    table: {
      category: 'SimpleMenu 属性',
      type: { summary: 'Boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  expandedKeys: {
    description: '展开的子菜单标识符数组(v-model)',
    table: {
      category: 'SimpleMenu 属性',
      type: { summary: 'Array' },
      defaultValue: { summary: '[]' },
    },
  },
  accordion: {
    description: '是否只保持一个子菜单的展开',
    table: {
      category: 'SimpleMenu 属性',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  labelField: {
    description: '菜单项显示的字段名， 默认字段名为label',
    table: {
      category: 'SimpleMenu 属性',
      defaultValue: { summary: 'label' },
    },
    control: { type: 'text' },
  },
  valueField: {
    description: '菜单项值的字段名， 默认字段名为value',
    table: {
      category: 'SimpleMenu 属性',
      defaultValue: { summary: 'value' },
    },
    control: { type: 'text' },
  },
}

export const simpleMenuProps = {
  ...menuProps,
  items: {
    description: '菜单数据，配置可看 MenuItem',
    table: {
      category: 'SimpleMenu 属性',
    },
  },
  dataKey: {
    description:
      '从data中的每个数据对象获取唯一键。或者使用每个数据源调用函数并返回其唯一键。其值在数据源中必须是唯一的，用于确保每一项的唯一。',
    table: {
      category: 'SimpleMenu 属性',
      type: { summary: 'String|Function	' },
      defaultValue: { summary: 'value' },
    },
    control: { type: 'text' },
  },
  labelField: {
    description: '菜单项显示的字段名， 默认字段名为label',
    table: {
      category: 'SimpleMenu 属性',
      defaultValue: { summary: 'label' },
    },
    control: { type: 'text' },
  },
  valueField: {
    description: '菜单项值的字段名， 默认字段名为value',
    table: {
      category: 'SimpleMenu 属性',
      defaultValue: { summary: 'value' },
    },
    control: { type: 'text' },
  },
  childrenField: {
    description: '菜单子项值的字段名， 默认字段名为children',
    table: {
      category: 'SimpleMenu 属性',
      defaultValue: { summary: 'children' },
    },
    control: { type: 'text' },
  },
  horizontalScroll: {
    description: '水平模式开启左右点击滚动模式',
    table: {
      category: 'SimpleMenu 属性',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  // ***********MenuItem**************
  value: {
    description: '菜单项值，保持唯一，如不唯一需要传递dataKey方法返回唯一值',
    table: {
      category: 'MenuItem 配置项',
      defaultValue: { summary: '' },
    },
    control: { type: 'text' },
  },
  label: {
    description: '菜单项显示名称，支持传递VNode',
    table: {
      category: 'MenuItem 配置项',
      type: { summary: 'String|VNode' },
      defaultValue: { summary: '' },
    },
    control: { type: 'text' },
  },
  children: {
    description: '菜单子项',
    table: {
      category: 'MenuItem 配置项',
      type: { summary: 'MenuItem[]' },
      defaultValue: { summary: '[]' },
    },
    control: { type: 'text' },
  },
  icon: {
    description: '菜单项图标，支持字符串和VNode,如果是字符串，需要加入到阿里图标库中',
    table: {
      category: 'MenuItem 配置项',
      type: { summary: 'String|VNode' },
      defaultValue: { summary: '' },
    },
    control: { type: 'text' },
  },
  disabled: {
    description: '是否禁用',
    table: {
      category: 'MenuItem 配置项',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  show: {
    description: '是否显示',
    table: {
      category: 'MenuItem 配置项',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  isGroup: {
    description: '是否是分组',
    table: {
      category: 'MenuItem 配置项',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  }
}
