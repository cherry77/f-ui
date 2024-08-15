import { DInput } from '@f-ui/components'

export const Template = (args: any) => ({
	components: { DInput },
	setup() {
		return {
			args,
		}
	},
	template: `
    <DInput/>
  `,
})
