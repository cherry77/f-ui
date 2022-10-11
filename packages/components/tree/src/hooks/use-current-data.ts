import { ref, watch } from "vue-demi";
import type { Ref } from "vue-demi";
import { InnerTreeNode, TreeNodeKey } from "../types";
import { debounce } from "lodash-es";

export default ({
  isSearchingRef,
  filteredExpandedKeys,
  currentExpandedKeys,
  filteredKeys,
  allKeys,
  expandingNode,
  nodeList,
}: {
  isSearchingRef: Ref<boolean>;
  filteredExpandedKeys: Ref<TreeNodeKey[]>;
  currentExpandedKeys: Ref<TreeNodeKey[]>;
  filteredKeys: Ref<TreeNodeKey[]>;
  allKeys: Ref<TreeNodeKey[]>;
  expandingNode: Ref<InnerTreeNode | null>;
  nodeList: Map<TreeNodeKey, InnerTreeNode>;
}) => {
  const currentData = ref<TreeNodeKey[]>([]);

  const computeCurrentData = () => {
    const res: TreeNodeKey[] = [];
    // const expandedKeys = isSearchingRef.value
    //   ? filteredExpandedKeys.value
    //   : currentExpandedKeys.value;
    const expandedKeys = currentExpandedKeys.value

    // const keys = isSearchingRef.value ? filteredKeys.value : allKeys.value;
    const keys = allKeys.value;
    // 缓存每个节点的展开状态，性能更优
    keys.forEach((key) => {
      const node = nodeList.get(key);
      if (node.hasChildren) {
        node.isExpanded.value = expandedKeys.includes(key);
      }
      const indexPath = node.indexPath;
      const len = indexPath.length;
      let index = 0;
      let parentExpanded = true;
      while (index < len - 1) {
        const parentNode = nodeList.get(indexPath[index]);
        if (!parentNode.isExpanded.value) {
          parentExpanded = false;
          break;
        }
        index += 1;
      }
      if (parentExpanded) {
        res.push(key);
      }
    });
    currentData.value = res;
  }

  // currentExpandedKeys 需要deep watch
  watch(
    [currentExpandedKeys, allKeys],
    debounce(() => {
      // if (isSearchingRef.value) return;
      computeCurrentData();
    }, 10),
    {
      immediate: true,
      deep: true,
    },
  );

  return {
    currentData
  }
}