import '@f-ui/theme-chalk/src/components/tree.scss'
import { reactive, ref } from 'vue-demi'
import FTree from '@f-ui/components/tree'

export default {
  title: 'Components/Tree',
  component: { FTree },
  props: {
    to: {
      type: String,
      default: ''
    },
  },
  argTypes: {
    onClick: {}
  }
}

const Template = (args) => ({
  components: { FTree },
  setup () {
    return { args };
  },
  template: `
    <FTree v-bind="args" />`,
});

export const BasicUsage = Template.bind({});
const data = [
  ...Array.from({ length: 3 }).map((_, index) => ({
    value: `key_${index}`,
    label: `Parent node ${index}`,
    children:
      index % 2 === 0
        ? Array.from({ length: 2 }).map((_, index2) => ({
          value: `key_${index}_${index2}`,
          label: `Leaf node ${index}-${index2}`,
          children:
            index % 2 === 0
              ? Array.from({ length: 3 }).map(
                (_, index3) => ({
                  value: `key_${index}_${index2}_${index3}`,
                  label: `Leaf node ${index}-${index2}-${index3}`,
                })
              )
              : undefined,
        }))
        : undefined,
  })),
]
BasicUsage.args = {
  data: data,
  checkable: true,
  cascade: true
};