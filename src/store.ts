import { configureStore } from "@reduxjs/toolkit";
import userContractReducer from "./components/Toolbar/ImportABITool/userContractSlice";
import nodeDataReducer from "./components/Flow/nodeDataSlice";
import callNodeReducer from "./components/Flow/CallNode/callNodeSlice";

export const store = configureStore({
  reducer: {
    userContract: userContractReducer,
    nodeData: nodeDataReducer,
    callNode: callNodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
