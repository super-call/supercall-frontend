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
  canvasData: any;
}

const initialState: nodeDataState = {
  nodeEdges: [],
  nodeData: {},
  canvasData: {},
};

export const nodeDataSlice = createSlice({
  name: "nodeData",
  initialState,
  reducers: {
    setCanvasData: (state, action: PayloadAction<any>) => {
      state.canvasData = action.payload;
    },
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

export const { updateNode, setNodeEdges, setCanvasData } =
  nodeDataSlice.actions;

export default nodeDataSlice.reducer;
