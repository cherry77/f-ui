import { useNormalModel } from "@f-ui/components/shared";
import { TreeProps } from "../props";

export default ({ props, emit }: { props: TreeProps; emit: any }) => {
  const [currentExpandedKeys, updateExpandedKeys] = useNormalModel(props, emit, { prop: 'expandedKeys' })
  return {
    currentExpandedKeys,
    updateExpandedKeys
  }
}