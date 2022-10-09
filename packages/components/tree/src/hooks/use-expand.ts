import { cloneDeep } from "lodash-es";
import { onMounted, Ref, shallowRef } from "vue-demi";
import { TreeProps } from "../props";
import { InnerTreeNode, TreeNodeKey } from "../types";

export default ({
  isSearchingRef,
  filteredExpandedKeys,
  nodeList,
  currentExpandedKeys,
  updateExpandedKeys,
  props,
  emit,
  allKeys,
}: {
  isSearchingRef: Ref<boolean>;
  filteredExpandedKeys: Ref<TreeNodeKey[]>;
  nodeList: Map<TreeNodeKey, InnerTreeNode>;
  currentExpandedKeys: Ref<TreeNodeKey[]>;
  updateExpandedKeys: (keys: TreeNodeKey[]) => void;
  props: TreeProps;
  emit: any;
  allKeys: Ref<TreeNodeKey[]>;
}) => {

  const expandingNode: Ref<InnerTreeNode | null> = shallowRef(null);

  function expandNode(val: TreeNodeKey, event: Event) {
    const node = nodeList.get(val)
    if (!node) return

    expandingNode.value = node
    let values: TreeNodeKey[] = cloneDeep(currentExpandedKeys.value)
    const index = values.indexOf(val)
    // 已经展开
    if (index !== -1) {
      values.splice(index, 1)
      // 让动画早点动起来??
      node.isExpanded.value = false
    } else {
      if (props.accordion) {
        values = values.filter((item) => node.indexPath.includes(item));
      }
      values.push(val)
      // 让动画早点动起来??
      node.isExpanded.value = true
    }
    updateExpandedKeys(values);
    emit('expand', {
      expandedKeys: values,
      event,
      node,
      expanded: values.includes(val),
    });
  }
  onMounted(() => {
    if (props.defaultExpandAll && currentExpandedKeys.value.length === 0) {
      updateExpandedKeys(
        allKeys.value.filter((value) => !nodeList.get(value).isLeaf),
      );
    }
  });
  return {
    expandingNode,
    expandNode
  }
}