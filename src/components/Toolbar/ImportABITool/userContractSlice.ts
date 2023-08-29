import { chainList } from "@/constants/chainList";
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

const initialState: userContractState = loadStateFromLocalStorage() || {
  contractData: {},
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
      localStorage.setItem("userContractState", JSON.stringify(state));
    },
  },
});

export const { addContract } = userContractSlice.actions;

export default userContractSlice.reducer;
