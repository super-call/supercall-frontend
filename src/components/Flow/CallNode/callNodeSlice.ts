import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CallNodeState {
  [id: number]: {
    selectedChainId: number | undefined;
    selectedContractIndex: number | undefined;
    selectedFunctionIndex: number | undefined;
    inputFields: { value: any }[];
  };
}

const initialState: CallNodeState = {};

const callNodeSlice = createSlice({
  name: "callNode",
  initialState,
  reducers: {
    initializeNode: (state, action) => {
      const { id } = action.payload;
      state[id] = {
        selectedChainId: undefined,
        selectedContractIndex: undefined,
        selectedFunctionIndex: undefined,
        inputFields: [],
      };
    },
    setInitialState: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
    setSelectedChainId: (
      state,
      action: PayloadAction<{ id: number; value: number | undefined }>
    ) => {
      state[action.payload.id].selectedChainId = action.payload.value;
      state[action.payload.id].selectedContractIndex = undefined;
      state[action.payload.id].selectedFunctionIndex = undefined;
      state[action.payload.id].inputFields = [];
    },
    setSelectedContractIndex: (
      state,
      action: PayloadAction<{ id: number; value: number | undefined }>
    ) => {
      state[action.payload.id].selectedContractIndex = action.payload.value;
      state[action.payload.id].selectedFunctionIndex = undefined;
      state[action.payload.id].inputFields = [];
    },
    setSelectedFunctionIndex: (
      state,
      action: PayloadAction<{ id: number; value: number | undefined }>
    ) => {
      state[action.payload.id].selectedFunctionIndex = action.payload.value;
      state[action.payload.id].inputFields = [];
    },
    setInputFields: (
      state,
      action: PayloadAction<{ id: number; value: { value: any }[] }>
    ) => {
      state[action.payload.id].inputFields = action.payload.value;
    },
  },
});

export const {
  initializeNode,
  setSelectedChainId,
  setSelectedContractIndex,
  setSelectedFunctionIndex,
  setInputFields,
  setInitialState,
} = callNodeSlice.actions;

export default callNodeSlice.reducer;
