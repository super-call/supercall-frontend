import { loggerABI } from "@/constants/abi/loggerABI";
import { chainList } from "@/constants/chainList";
import { DEFAULT_USER_CONTRACTS } from "@/constants/userContracts";
import { FunctionInput } from "@/utils/abiUtils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userContractState {
  contractData: {
    [key: number]: {
      contractName: string;
      contractAddress: string;
      contractABI: FunctionInput[];
    }[];
  };
}

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("userContractState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState: userContractState = {
  contractData: Object.assign(
    DEFAULT_USER_CONTRACTS,
    loadStateFromLocalStorage()
  ),
};


export const userContractSlice = createSlice({
  name: "userContract",
  initialState,
  reducers: {
    addContract: (
      state,
      action: PayloadAction<{
        chainId: keyof typeof chainList;
        contractName: string;
        contractAddress: string;
        contractABI: FunctionInput[];
      }>
    ) => {
      const { chainId, contractName, contractAddress, contractABI } =
        action.payload;
      state.contractData = {
        ...state.contractData,
        [chainId]: [
          ...(state.contractData[chainId] || []),
          {
            contractName,
            contractAddress,
            contractABI,
          },
        ],
      };
      localStorage.setItem(
        "userContractState",
        JSON.stringify(state.contractData)
      );
    },
    editContract: (
      state,
      action: PayloadAction<{
        chainId: keyof typeof chainList;
        contractName: string;
        contractAddress: string;
        contractABI: FunctionInput[];
        key: number;
      }>
    ) => {
      const { chainId, contractName, contractAddress, contractABI, key } =
        action.payload;
      state.contractData[chainId][key] = {
        contractName,
        contractAddress,
        contractABI,
      };
      localStorage.setItem("userContractState", JSON.stringify(state));
    },
    deleteContract: (
      state,
      action: PayloadAction<{
        chainId: keyof typeof chainList;
        key: number;
      }>
    ) => {
      const { chainId, key } = action.payload;
      const stateByChainId = state.contractData[chainId].filter((abi, index) => index !== key);

      state.contractData = {
        ...state.contractData,
        [chainId]: stateByChainId
      }
      localStorage.setItem("userContractState", JSON.stringify(state));
    },
  },
});

export const { addContract, editContract, deleteContract } =
  userContractSlice.actions;

export default userContractSlice.reducer;
