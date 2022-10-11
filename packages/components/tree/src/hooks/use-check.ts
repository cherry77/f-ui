import { shallowRef } from 'vue-demi'
import type { Ref } from "vue-demi";
import { TreeProps } from "../props";
import { InnerTreeNode, TreeNodeKey } from "../types";
import { cloneDeep } from 'lodash-es';
import { CHECK_STRATEGY } from '../const';

export default ({
  allKeys,
  nodeList,
  currentCheckedKeys,
  updateCheckedKeys,
  props,
  emit,
}: {
  allKeys: Ref<TreeNodeKey[]>;
  nodeList: Map<TreeNodeKey, InnerTreeNode>;
  currentCheckedKeys: Ref<TreeNodeKey[]>;
  updateCheckedKeys: (keys: TreeNodeKey[]) => void;
  props: TreeProps;
  emit: any;
}) => {
  const _keys: Ref<TreeNodeKey[]> = shallowRef([]);

  const computeIndeterminate = (node: InnerTreeNode) => {
    if (node.hasChildren) {
      if (node.isChecked.value) {
        node.isIndeterminate.value = false;
      } else {
        node.isIndeterminate.value = node.children.some(
          (item) =>
            item.isChecked.value || item.isIndeterminate.value,
        );
      }
    } else {
      node.isIndeterminate.value = false;
    }
  }

  const computeCheckedKeys = (_values: TreeNodeKey[], node: InnerTreeNode) => {
    const { value, isChecked, hasChildren, childrenPath, indexPath } = node

    if (isChecked?.value) {
      if (hasChildren) {
        childrenPath?.forEach(key => {
          const childNode = nodeList.get(key)
          childNode.isChecked.value = false
          const index = _values.indexOf(childNode.value);
          _values.splice(index, 1);

          childNode.isIndeterminate.value = false;
        })
      }
      let len = indexPath.length - 1
      for (len; len >= 0; len--) {
        const parentNode = nodeList.get(indexPath[len]);
        if (parentNode.isChecked.value) {
          parentNode.isChecked.value = false;
          const index = _values.indexOf(parentNode.value);
          _values.splice(index, 1);
        }
        computeIndeterminate(parentNode);
      }
    } else {
      if (hasChildren) {
        childrenPath?.forEach(key => {
          const childNode = nodeList.get(key)
          childNode.isChecked.value = true
          const index = _values.indexOf(childNode.value);
          _values.splice(index, 1);

          childNode.isIndeterminate.value = false;
        })
      }
      // 选中
      _values.push(value);
      node.isChecked.value = true;
      computeIndeterminate(node);

      let len = indexPath.length - 2;
      for (len; len >= 0; len--) {
        const parentNode = nodeList.get(indexPath[len]);
        if (
          parentNode.children.every(
            (childNode) => childNode.isChecked.value,
          )
        ) {
          parentNode.isChecked.value = true;
          _values.push(parentNode.value);
        }
        computeIndeterminate(parentNode);
      }
    }
  }


  const checkNode = (val: TreeNodeKey, event: Event) => {
    const node = nodeList.get(val)
    if (!node) return

    const _values = cloneDeep(_keys.value);
    let values;

    console.log('2', props.cascade)
    if (!props.cascade) {
      // 非关联
      const index = _values.indexOf(val);
      if (node.isChecked.value) {
        _values.splice(index, 1);
      } else {
        _values.push(val);
      }
      values = _values;
    } else {
      console.log('=====', props.checkStrictly)
      switch (props.checkStrictly) {
        case CHECK_STRATEGY.ALL:
          computeCheckedKeys(_values, node);
          break;
        case CHECK_STRATEGY.PARENT:

          break;
        case CHECK_STRATEGY.CHILD:

          break;
        default:
          break;
      }
    }
  }

  return {
    checkNode
  }
}