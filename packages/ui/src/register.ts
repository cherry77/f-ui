import type { Component } from 'vue-demi'
export const componentList: any = []

export function register(thirdComp: Component) {
  const ownComp = transfer(thirdComp)
  console.log('========', ownComp)
  componentList.push(ownComp)
}
function transfer(thirdComp: Component) {
  const map = {
    name: {
      AButton: 'DButton',
    },
    props: {
      type: 'type',
      size: 'size',
    },
    events: {
      click: 'click',
    },
  }
  thirdComp.name = map.name[thirdComp.name]
  // thirdComp.props.type = map.props[thirdComp.props.type]
  // thirdComp.props.size = map.props[thirdComp.props.size]
  return thirdComp
}
