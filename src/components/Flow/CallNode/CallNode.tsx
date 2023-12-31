import { useCallback, useEffect, useMemo, useState } from "react";
import { Handle, Position } from "reactflow";
import { StyledCallNode } from "./StyledCallNode";
import { StyledNodeBackdrop } from "../StyledNodeBackdrop";
import { useDispatch, useSelector } from "react-redux";
import { userContractState } from "@/components/Toolbar/ImportABITool/userContractSlice";
import { Select } from "antd";
import { getSupportedChainConfigs } from "@/constants/chainList";
import { updateNode } from "../nodeDataSlice";
import { Input } from "antd";
import {
  setSelectedChainId,
  setSelectedContractIndex,
  setSelectedFunctionIndex,
  setInputFields,
  initializeNode,
} from "./callNodeSlice";

interface RootState {
  callNode: {
    [id: number]: {
      selectedChainId: number | undefined;
      selectedContractIndex: number | undefined;
      selectedFunctionIndex: number | undefined;
      inputFields: { value: any }[];
    };
  };
}

export function CallNode({ data }: { data: { text: string } }) {
  const dispatch = useDispatch();

  const id = +data.text;

  const contractData = useSelector(
    (state: { userContract: userContractState }) => {
      return state.userContract.contractData;
    }
  );

  const callNodeState = useSelector((state: RootState) => state.callNode);

  const {
    selectedChainId,
    selectedContractIndex,
    selectedFunctionIndex,
    inputFields,
  } = callNodeState[id] || {};

  useEffect(() => {
    if (!callNodeState[id]) {
      dispatch(initializeNode({ id }));
    }
  }, []);

  const contractFunctions = useMemo(() => {
    if (selectedChainId === null || selectedChainId === undefined) return [];
    if (selectedContractIndex === null || selectedContractIndex === undefined)
      return [];
    return contractData[selectedChainId][
      selectedContractIndex
    ].contractABI.filter((func) => func.type === "function");
  }, [selectedChainId, selectedContractIndex]);

  const handleInputChange = (index: number, event: any) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = {
      ...newInputFields[index],
      value: event.target.value,
    };
    dispatch(setInputFields({ id, value: newInputFields }));
  };

  const handleSelectFunction = (selectFuncIndex: number) => {
    const newInputFields: { value: any }[] = [];
    contractFunctions[selectFuncIndex].inputs.forEach((input) => {
      newInputFields.push({ value: "" });
    });
    dispatch(setInputFields({ id, value: newInputFields }));
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
    const contractFunction = contractFunctions[selectedFunctionIndex].name;

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
  }, [selectedFunctionIndex, inputFields, handleDisptachState]);

  return (
    <div style={{ position: "relative" }}>
      <Handle type="target" position={Position.Top} />
      <StyledCallNode>
        <Select
          value={selectedChainId}
          onChange={(value) => {
            dispatch(setSelectedChainId({ id, value }));
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
              dispatch(setSelectedContractIndex({ id, value }));
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
              dispatch(setSelectedFunctionIndex({ id, value }));
              handleSelectFunction(value);
            }}
            className="nodrag"
            placeholder="Contract Function"
            style={{ width: "100%", marginTop: "7px" }}
            options={[
              ...(contractData[selectedChainId][selectedContractIndex]
                ? contractFunctions.map((func, i) => {
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
            <hr />
            {contractData[selectedChainId][selectedContractIndex]
              ? contractFunctions[selectedFunctionIndex].inputs.map(
                  (input, i) => {
                    return (
                      <Input
                        style={{ marginTop: "7px" }}
                        key={i}
                        value={inputFields[i] ? inputFields[i].value : ""}
                        onChange={(event) => handleInputChange(i, event)}
                        placeholder={`${input.name} (${input.type})`}
                      />
                    );
                  }
                )
              : null}
          </div>
        ) : null}
      </StyledCallNode>
      <Handle type="source" position={Position.Bottom} id={`${data.text}`} />
      <StyledNodeBackdrop />
    </div>
  );
}
