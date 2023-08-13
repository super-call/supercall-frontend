import React from "react";
import ToolbarItem from "./ToolbarItem/ToolbarItem";
import theme from "@/styles/theme";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { nodeDataState } from "../Flow/nodeDataSlice";
import { combineNodeUtil } from "@/utils/combineNodeUtil";

export default function CallTool() {
  const nodeData = useSelector((state: { nodeData: nodeDataState }) => {
    return state.nodeData.nodeData;
  });
  const nodeEdges = useSelector((state: { nodeData: nodeDataState }) => {
    return state.nodeData.nodeEdges;
  });

  const handleClick = () => {
    console.log({ nodeData, nodeEdges });
    console.log(combineNodeUtil(nodeEdges, nodeData));
  };

  return (
    <ToolbarItem
      name="Call"
      onClick={() => handleClick()}
      color={theme.colors.primary}
      icon={<PlayCircleOutlined />}
    />
  );
}
