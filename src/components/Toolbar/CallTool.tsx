import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { PlayCircleOutlined } from "@ant-design/icons";

import ToolbarItem from "./ToolbarItem/ToolbarItem";
import theme from "@/styles/theme";
import { nodeDataState } from "../Flow/nodeDataSlice";
import { convertEdgeNodeToArray } from "@/utils/superCallUtils";
import { userContractState } from "./ImportABITool/userContractSlice";
import { Spin } from "antd";
import { aggregate } from "@/services/contract/axlSuperCall";
import { axlCallMapping } from "@/services/axlService";
import SuccessModal from "./SuccessModal/SuccessModal";
import { useNetwork } from "wagmi";
import { axSuperContract } from "@/constants/contractList";

export default function CallTool() {
  const [loading, setLoading] = useState(false);
  const network = useNetwork();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hash, setHash] = useState("");
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

  const currentChainId = useMemo(() => {
    return network.chain?.id || null;
  }, [network]);

  const handleClick = async () => {
    setLoading(true);
    const callArray = convertEdgeNodeToArray(nodeEdges, nodeData);
    console.log({ callArray });
    const axlCall = await axlCallMapping(callArray, userContract);
    console.log({ axlCall });
    const axlCallEncoded = axlCall.map((call) => call.encode());
    const totalFee = axlCall
      .reduce((acc, cur) => acc + +cur.calculateTotalFee(), 0)
      .toString();
    const publicSuperCallAddr = axSuperContract(currentChainId as any).address;
    const _hash = await aggregate(
      publicSuperCallAddr,
      axlCallEncoded,
      BigInt(totalFee)
    );
    if (_hash) {
      setHash(_hash || "");
      setLoading(false);
      showModal();
    }
    setLoading(false);
  };

  return (
    <>
      <ToolbarItem
        disabled={loading}
        name="Call"
        onClick={() => handleClick()}
        color={theme.colors.primary}
        icon={
          loading ? (
            <Spin style={{ marginBottom: "2px" }} />
          ) : (
            <PlayCircleOutlined />
          )
        }
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
