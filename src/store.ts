import { configureStore } from "@reduxjs/toolkit";
import userContractReducer from "./components/Toolbar/ImportABITool/userContractSlice";
import nodeDataReducer from "./components/Flow/nodeDataSlice";

export const store = configureStore({
  reducer: {
    userContract: userContractReducer,
    nodeData: nodeDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
