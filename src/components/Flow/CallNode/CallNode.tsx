import { useCallback, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { StyledCallNode } from "./StyledCallNode";
import { StyledNodeBackdrop } from "../StyledNodeBackdrop";
import { useDispatch, useSelector } from "react-redux";
import { userContractState } from "@/components/Toolbar/ImportABITool/userContractSlice";
import { Select } from "antd";
import { getSupportedChainConfigs } from "@/constants/chainList";
import { updateNode } from "../nodeDataSlice";
import { Input } from "antd";

export function CallNode({ data }: { data: { id: number; text: string } }) {
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

  const [inputFields, setInputFields] = useState<{ value: any }[]>([]);

  const handleInputChange = (index: number, event: any) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = {
      ...newInputFields[index],
      value: event.target.value,
    };
    setInputFields(newInputFields);
  };

  const handleSelectFunction = (selectFuncIndex: number) => {
    const newInputFields: { value: any }[] = [];
    contractData[selectedChainId as number][
      selectedContractIndex as number
    ].contractABI[selectFuncIndex].inputs.forEach((input) => {
      newInputFields.push({ value: "" });
    });
    setInputFields(newInputFields);
  };

  const handleDisptachState = useCallback(() => {
    if (
      selectedChainId === undefined ||
      selectedContractIndex === undefined ||
      selectedFunctionIndex === undefined
    )
      return;

    const nodeId = +data.text;
    const contractAddress =
      contractData[selectedChainId][selectedContractIndex].contractAddress;
    const contractFunction =
      contractData[selectedChainId][selectedContractIndex].contractABI[
        selectedFunctionIndex
      ].name;

    const updatedNodeData = {
      nodeId,
      chainId: selectedChainId as number,
      contractAddress,
      contractFunction,
      inputData: inputFields,
    };

    dispatch(updateNode({ nodeId, updatedNodeData }));
  }, [
    selectedChainId,
    selectedContractIndex,
    selectedFunctionIndex,
    inputFields,
    dispatch,
    contractData,
    data.text,
  ]);

  useEffect(() => {
    handleDisptachState();
  }, [selectedFunctionIndex, inputFields, , handleDisptachState]);

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
        {selectedChainId &&
        selectedContractIndex != undefined &&
        selectedFunctionIndex !== undefined ? (
          <div style={{ marginTop: "7px" }}>
            {contractData[selectedChainId][selectedContractIndex]
              ? contractData[selectedChainId][
                  selectedContractIndex
                ].contractABI[selectedFunctionIndex].inputs.map((input, i) => {
                  return (
                    <Input
                      key={i}
                      value={inputFields[i] ? inputFields[i].value : ""}
                      onChange={(event) => handleInputChange(i, event)}
                      placeholder={`${input.name} (${input.type})`}
                    />
                  );
                })
              : null}
          </div>
        ) : null}
      </StyledCallNode>
      <Handle type="source" position={Position.Bottom} id={`${data.text}`} />
      <StyledNodeBackdrop />
    </div>
  );
}
