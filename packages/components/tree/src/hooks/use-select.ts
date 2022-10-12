import { cloneDeep } from "lodash-es";
import { Ref } from "vue-demi";
import { TreeProps } from "../props";
import { InnerTreeNode, TreeNodeKey } from "../types";

export default ({
  nodeList,
  currentSelectedKeys,
  updateSelectedKeys,
  props,
  emit,
}: {
  nodeList: Map<TreeNodeKey, InnerTreeNode>;
  currentSelectedKeys: Ref<TreeNodeKey[]>;
  updateSelectedKeys: (keys: TreeNodeKey[]) => void;
  props: TreeProps;
  emit: any;
}) => {
  const selectNode = (val: TreeNodeKey, event: Event) => {
    if (!props.selectable) return

    const node = nodeList.get(val)
    const values = cloneDeep(currentSelectedKeys.value)
    const index = values.indexOf(node.value)

    if (props.multiple) {
      if (index !== -1) {
        props.cancelable && values.splice(index, 1)
      } else {
        values.push(val)
      }
    } else if (index !== -1) {
      props.cancelable && values.splice(index, 1)
    } else {
      values[0] = val
    }

    updateSelectedKeys(values);
    emit('select', {
      selectedKeys: values,
      event,
      node,
      isSelected: values.includes(val)
    });
  }
  return {
    selectNode,
  }
}