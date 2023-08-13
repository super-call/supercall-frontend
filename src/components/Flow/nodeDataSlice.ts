import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface nodeDataState {
  nodeEdges: [];
  nodeData: {
    [key: number]: {
      nodeId: number;
      chainId: number;
      contractAddress: string;
      contractFunction: string;
    }[];
  };
}

const initialState: nodeDataState = {
  nodeEdges: [],
  nodeData: {},
};

export const nodeDataSlice = createSlice({
  name: "nodeData",
  initialState,
  reducers: {
    setNodeEdges: (state, action: PayloadAction<[]>) => {
      state.nodeEdges = action.payload;
    },
    updateNode: (
      state,
      action: PayloadAction<{
        nodeId: number;
        chainId: number;
        contractAddress: string;
        contractFunction: string;
      }>
    ) => {
      const { nodeId, chainId, contractAddress, contractFunction } =
        action.payload;

      state.nodeData = {
        ...state.nodeData,
        [nodeId]: [
          ...(state.nodeData[nodeId] || []),
          {
            nodeId,
            chainId,
            contractAddress,
            contractFunction,
          },
        ],
      };
    },
  },
});

export const { updateNode, setNodeEdges } = nodeDataSlice.actions;

export default nodeDataSlice.reducer;
