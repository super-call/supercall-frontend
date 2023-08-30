import React from "react";
import { useSelector } from "react-redux";
import { PlayCircleOutlined } from "@ant-design/icons";
import { ethers } from "ethers";

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
    const axlCall = await axlCallMapping(callArray, userContract);
    const axlCallEncoded = axlCall.map((call) => call.encode());
    // console.log(callArray);
    // console.log(axlCall);
    console.log(axlCallEncoded);
    const totalFee = axlCall.reduce((acc, cur) => acc + +cur.calculateTotalFee(), 0).toString();
    console.log(ethers.formatEther(totalFee));
    const hash = await aggregate('0x98206CFfa3df6C8A83EC77fbce63C96ba7F4C4a4', axlCallEncoded, BigInt(totalFee));
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
