import { useNormalModel } from "@f-ui/components/shared";
import { TreeProps } from "../props";

export default ({ props, emit }: { props: TreeProps; emit: any }) => {
  const [currentExpandedKeys, updateExpandedKeys] = useNormalModel(props, emit, { prop: 'expandedKeys' })

  const [currentCheckedKeys, updateCheckedKeys] = useNormalModel(props, emit, { prop: 'checkedKeys' })

  return {
    currentExpandedKeys,
    updateExpandedKeys,
    currentCheckedKeys,
    updateCheckedKeys
  }
}