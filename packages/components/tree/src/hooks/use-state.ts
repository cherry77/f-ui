import { useNormalModel } from "@f-ui/components/shared";
import { TreeProps } from "../props";
import { TreeNodeKey } from "../types";

export default ({ props, emit }: { props: TreeProps; emit: any }) => {
  const [currentExpandedKeys, updateExpandedKeys] = useNormalModel(props, emit, { prop: 'expandedKeys' })

  const [currentCheckedKeys, updateCheckedKeys] = useNormalModel(props, emit, { prop: 'checkedKeys' })

  const [currentSelectedKeys, updateSelectedKeys] = useNormalModel(props, emit, { prop: 'selectedKeys' })

  const hasSelected = (value: TreeNodeKey) =>
    currentSelectedKeys.value.includes(value);

  return {
    currentExpandedKeys,
    updateExpandedKeys,
    currentCheckedKeys,
    updateCheckedKeys,
    currentSelectedKeys,
    updateSelectedKeys,
    hasSelected
  }
}