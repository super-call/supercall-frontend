import React from "react";
import FlowCanvas from "@/components/Flow/FlowCanvas/FlowCanvas";
import { ReactFlowProvider } from "reactflow";

export default function FlowView() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}
