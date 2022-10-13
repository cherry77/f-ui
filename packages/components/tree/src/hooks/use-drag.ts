import { onUnmounted, ref } from "vue-demi";
import { UseNamespace } from "../../../shared";
import { DropPosition, InnerTreeNode, TreeNodeKey } from "../types";

export default ({
  nodeList,
  emit,
  expandNode,
  ns
}: {
  nodeList: Map<TreeNodeKey, InnerTreeNode>;
  emit: any;
  expandNode: (value: TreeNodeKey, event: Event) => void;
  ns: UseNamespace;
}) => {
  let dragNode: InnerTreeNode | null;
  const dragOverInfo = ref<{ node: InnerTreeNode; position: DropPosition; }>();
  let overBeginTimeMap: { [propName: TreeNodeKey]: number } = {};

  let timer: number;
  onUnmounted(() => {
    if (timer) {
      clearTimeout(timer);
    }
  });

  const handleDragstart = (value: TreeNodeKey, event: DragEvent) => {
    const node = nodeList.get(value);
    dragNode = node;
    emit('dragstart', { node, event });
  };

  const handleDragenter = (value: TreeNodeKey, event: DragEvent) => {
    const node = getTargetNode(value);
    if (!node) return;
    emit('dragenter', { node, event });
  };

  const handleDragover = (value: TreeNodeKey, event: DragEvent) => {
    event.preventDefault();
    const node = getTargetNode(value);
    if (!node) {
      dragOverInfo.value = null;
      return;
    }
    emit('dragover', { node, event });
    // 悬浮1s以上展开节点
    if (!overBeginTimeMap[value]) {
      overBeginTimeMap[value] = Date.now();
    } else {
      if (
        Date.now() - overBeginTimeMap[value] > 1000 &&
        node.hasChildren &&
        !node.isExpanded.value
      ) {
        expandNode(value, event);
      }
    }
    const targetNodeEl = document.querySelector(`.${ns.e('node')}[data-value='${value}']`);
    // 悬浮节点大小位置信息
    const { height: targetElOffsetHeight } =
      targetNodeEl.getBoundingClientRect();
    let mousePosition: DropPosition;
    const targeEl = event.currentTarget as HTMLElement;
    // 焦点节点大小位置信息
    const { top: elClientTop } = targeEl.getBoundingClientRect();
    const eventOffsetY = event.clientY - elClientTop;
    if (eventOffsetY <= targetElOffsetHeight / 2) {
      mousePosition = 'before';
    } else {
      mousePosition = 'after';
    }
    dragOverInfo.value = {
      node: node,
      position: mousePosition,
    };
    // 300毫秒后没有后续则表示已经移出
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (dragOverInfo.value?.node === node) {
        dragOverInfo.value = null;
      }
    }, 300);
  };

  const handleDragleave = (value: TreeNodeKey, event: DragEvent) => {
    const node = getTargetNode(value);
    if (!node) return;
    emit('dragleave', { node, event });
  };

  const handleDrop = (value: TreeNodeKey, event: DragEvent) => {
    const node = getTargetNode(value);
    if (!node) return;
    if (!dragOverInfo.value) {
      return;
    }
    emit('drop', { ...dragOverInfo.value, dragNode, event });
  };

  const handleDragend = (value: TreeNodeKey, event: DragEvent) => {
    resetDragState();
    const node = nodeList.get(value);
    emit('dragend', { node, event });
  };


  function getTargetNode(value: TreeNodeKey) {
    if (!dragNode) return
    const node = nodeList.get(value);
    if (!node) return;
    if (node.indexPath.includes(dragNode.value)) return;
    return node;
  }

  function resetDragState(): void {
    dragNode = null;
    overBeginTimeMap = {};
    dragOverInfo.value = null;
  }

  return {
    handleDragstart,
    handleDragenter,
    handleDragover,
    handleDragleave,
    handleDrop,
    handleDragend,
    dragOverInfo
  }
}