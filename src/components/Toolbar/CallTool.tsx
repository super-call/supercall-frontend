import React, { useState } from "react";
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
import SuccessModal from "./SuccessModal/SuccessModal";

export default function CallTool() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hash, setHash] = useState('');
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const nodeData = useSelector((state: { nodeData: nodeDataState }) => {
    return state.nodeData.nodeData;
  });

  const nodeEdges = useSelector((state: { nodeData: nodeDataState }) => {
    return state.nodeData.nodeEdges;
  });

  const userContract = useSelector(
    (state: { userContract: userContractState }) => {
      return state.userContract.contractData;
    }
  );

  const handleClick = async () => {
    const callArray = convertEdgeNodeToArray(nodeEdges, nodeData);
    const axlCall = await axlCallMapping(callArray, userContract);
    const axlCallEncoded = axlCall.map((call) => call.encode());
    const totalFee = axlCall
      .reduce((acc, cur) => acc + +cur.calculateTotalFee(), 0)
      .toString();
    const _hash = await aggregate(
      "0x98206CFfa3df6C8A83EC77fbce63C96ba7F4C4a4",
      axlCallEncoded,
      BigInt(totalFee)
    );
    console.log(_hash);
    if (_hash) {
      setHash(_hash || '');
      showModal();
    }
  };

  return (
    <>
      <ToolbarItem
        name="Call"
        onClick={() => handleClick()}
        color={theme.colors.primary}
        icon={<PlayCircleOutlined />}
      />
      <SuccessModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        hash={hash}
      />
    </>
  );
}
