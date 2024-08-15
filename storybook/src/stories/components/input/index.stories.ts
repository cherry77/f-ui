import { DInput } from '@f-ui/components'
import { simpleMenuProps } from './args'
import { Template } from './template'
export default {
	title: '基础组件 /Input',
	component: DInput,
	tags: ['autodocs'],
	argTypes: simpleMenuProps,
}

export const 基础使用 = Template.bind({})
基础使用.args = {
	value: 122,
}
