import React from "react";
import ToolbarItem from "./ToolbarItem/ToolbarItem";
import theme from "@/styles/theme";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { nodeDataState } from "../Flow/nodeDataSlice";
import { AxelarQueryAPI, Environment } from "@axelar-network/axelarjs-sdk";
import { convertEdgeNodeToArray } from "@/utils/superCallUtils";
import { AxlCall } from "@super-call/sdk";

export default function CallTool() {
  const axlAPI = new AxelarQueryAPI({ environment: Environment.TESTNET });

  const nodeData = useSelector((state: { nodeData: nodeDataState }) => {
    return state.nodeData.nodeData;
  });

  const nodeEdges = useSelector((state: { nodeData: nodeDataState }) => {
    return state.nodeData.nodeEdges;
  });

  const handleClick = () => {
    console.log(convertEdgeNodeToArray(nodeEdges, nodeData));
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
