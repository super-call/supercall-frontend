import React from "react";
import { useSelector } from "react-redux";
import { PlayCircleOutlined } from "@ant-design/icons";
import { AxelarQueryAPI, Environment } from "@axelar-network/axelarjs-sdk";

import ToolbarItem from "./ToolbarItem/ToolbarItem";
import theme from "@/styles/theme";
import { nodeDataState } from "../Flow/nodeDataSlice";
import { convertEdgeNodeToArray } from "@/utils/superCallUtils";
import { userContractState } from "./ImportABITool/userContractSlice";

import { aggregate } from "@/services/contract/axlSuperCall";
import { axlCallMapping } from "@/services/axlService";

export default function CallTool() {
  const nodeData = useSelector((state: { nodeData: nodeDataState }) => {
    return state.nodeData.nodeData;
  });

  const nodeEdges = useSelector((state: { nodeData: nodeDataState }) => {
    return state.nodeData.nodeEdges;
  });

  const userContract = useSelector((state: { userContract: userContractState }) => {
    return state.userContract.contractData;
  });

  const handleClick = async () => {
    const callArray = convertEdgeNodeToArray(nodeEdges, nodeData);
    const axlCall = axlCallMapping(callArray, userContract);
    const axlCallEncoded = axlCall.map((call) => call.encode());
    console.log(axlCallEncoded);
    const hash = await aggregate('0x98206CFfa3df6C8A83EC77fbce63C96ba7F4C4a4', axlCallEncoded);
    console.log(hash);
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
