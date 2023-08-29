import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INode {
  nodeId: number;
  chainId: number;
  contractAddress: string;
  contractFunction: string;
  inputData?: { value: any }[];
}

export interface nodeDataState {
  nodeEdges: any[];
  nodeData: { [key: number]: INode[] };
}

const initialState: nodeDataState = {
  nodeEdges: [],
  nodeData: {},
};

export const nodeDataSlice = createSlice({
  name: "nodeData",
  initialState,
  reducers: {
    setNodeEdges: (state, action: PayloadAction<any[]>) => {
      state.nodeEdges = action.payload;
    },
    updateNode: (
      state,
      action: PayloadAction<{ nodeId: number; updatedNodeData: INode }>
    ) => {
      const { nodeId, updatedNodeData } = action.payload;
      state.nodeData[nodeId] = [updatedNodeData];
    },
  },
});

export const { updateNode, setNodeEdges } = nodeDataSlice.actions;

export default nodeDataSlice.reducer;
