import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { StyledCallNode } from "./StyledCallNode";
import { StyledNodeBackdrop } from "../StyledNodeBackdrop";
import { useDispatch, useSelector } from "react-redux";
import { userContractState } from "@/components/Toolbar/ImportABITool/userContractSlice";
import { Select } from "antd";
import { getSupportedChainConfigs } from "@/constants/chainList";
import { updateNode } from "../nodeDataSlice";

export function CallNode({ data }: { data: { id: number; text: string } }) {
  // const onChange = useCallback((evt: any) => {}, []);

  const dispatch = useDispatch();

  const contractData = useSelector(
    (state: { userContract: userContractState }) => {
      return state.userContract.contractData;
    }
  );

  const [selectedChainId, setSelectedChainId] = useState<number | undefined>(
    undefined
  );

  const [selectedContractIndex, setSelectedContractIndex] = useState<
    number | undefined
  >(undefined);

  const [selectedFunctionIndex, setSelectedFunctionIndex] = useState<
    number | undefined
  >(undefined);

  const handleSelectFunction = (selectFuncIndex: number) => {
    const updateNodePayload = {
      id: data.text,
      chainId: selectedChainId,
      contractAddress:
        contractData[selectedChainId as number][selectedContractIndex as number]
          .contractAddress,
      contractFunction:
        contractData[selectedChainId as number][selectedContractIndex as number]
          .contractABI[selectFuncIndex],
    };

    dispatch(
      updateNode({
        nodeId: +updateNodePayload.id,
        chainId: selectedChainId as number,
        contractAddress: updateNodePayload.contractAddress,
        contractFunction: updateNodePayload.contractFunction.name,
      })
    );
  };

  selectedChainId &&
    selectedContractIndex &&
    console.log(
      contractData,
      contractData[selectedChainId][selectedContractIndex],
      { selectedChainId, selectedContractIndex }
    );

  return (
    <div style={{ position: "relative" }}>
      <Handle type="target" position={Position.Top} />
      <StyledCallNode>
        <Select
          value={selectedChainId}
          onChange={(value) => {
            setSelectedChainId(value);
          }}
          className="nodrag"
          placeholder="Contract Chain"
          style={{ width: "100%" }}
          options={[
            ...getSupportedChainConfigs().map((chain) => {
              return {
                value: chain.id,
                label: chain.name,
              };
            }),
          ]}
        />
        {selectedChainId ? (
          <Select
            value={selectedContractIndex}
            onChange={(value) => {
              setSelectedContractIndex(value);
            }}
            className="nodrag"
            placeholder="Contract Name"
            style={{ width: "100%", marginTop: "7px" }}
            options={[
              ...(contractData[selectedChainId]
                ? contractData[selectedChainId].map((contract, i) => {
                    return {
                      value: i,
                      label: contract.contractName,
                    };
                  })
                : []),
            ]}
          />
        ) : null}
        {selectedChainId && selectedContractIndex != undefined ? (
          <Select
            value={selectedFunctionIndex}
            onChange={(value) => {
              setSelectedFunctionIndex(value);
              handleSelectFunction(value);
            }}
            className="nodrag"
            placeholder="Contract Function"
            style={{ width: "100%", marginTop: "7px" }}
            options={[
              ...(contractData[selectedChainId][selectedContractIndex]
                ? contractData[selectedChainId][
                    selectedContractIndex
                  ].contractABI.map((func, i) => {
                    return {
                      value: i,
                      label: func.name,
                    };
                  })
                : []),
            ]}
          />
        ) : null}
      </StyledCallNode>
      <Handle type="source" position={Position.Bottom} id={`${data.text}`} />
      <StyledNodeBackdrop />
    </div>
  );
}
