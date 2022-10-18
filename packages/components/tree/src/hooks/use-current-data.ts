import { ref, watch } from "vue-demi";
import type { Ref } from "vue-demi";
import { InnerTreeNode, TreeNodeKey } from "../types";
import { debounce } from "lodash-es";
import { concat } from "@f-ui/utils";

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
    const expandedKeys = isSearchingRef.value
      ? filteredExpandedKeys.value
      : currentExpandedKeys.value;

    const keys = isSearchingRef.value ? filteredKeys.value : allKeys.value;

    if (expandingNode.value) {
      const node = expandingNode.value;
      // 展开后
      if (node.isExpanded.value) {
        const index = currentData.value.indexOf(node.value);
        addNode(node.children, index + 1);
      } else {
        const index = currentData.value.indexOf(node.value);
        deleteNode(node.childrenPath, index + 1);
      }
      expandingNode.value = null;
      return;
    }

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
  };

  const _addNode = (nodes: InnerTreeNode[], res: TreeNodeKey[] = []) => {
    nodes.forEach((node) => {
      res.push(node.value);
      if (node.hasChildren && node.isExpanded.value) {
        _addNode(node.children, res);
      }
    });
  };

  const addNode = (nodes: InnerTreeNode[], index: number) => {
    const res: TreeNodeKey[] = [];
    _addNode(nodes, res);
    const arr1 = currentData.value.slice(0, index);
    const arr2 = currentData.value.slice(index);
    concat(arr1, res);
    concat(arr1, arr2);
    currentData.value = arr1;
  };

  const deleteNode = (keys: TreeNodeKey[], index: number) => {
    let len = 0;
    keys.forEach((key) => {
      if (key === currentData.value[index + len]) {
        len += 1;
      }
    });
    currentData.value.splice(index, len);
  };

  watch(
    [filteredExpandedKeys, filteredKeys],
    debounce(() => {
      if (!isSearchingRef.value) return;
      computeCurrentData();
    }, 10),
  );


  // currentExpandedKeys 需要deep watch
  watch(
    [currentExpandedKeys, allKeys],
    debounce(() => {
      if (isSearchingRef.value) return;
      computeCurrentData();
    }, 10),
    {
      immediate: true,
      deep: true,
    },
  );

  watch([isSearchingRef], () => {
    computeCurrentData();
  });

  return {
    currentData
  }
}