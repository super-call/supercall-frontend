import React from "react";
import FlowCanvas from "@/components/Flow/FlowCanvas/FlowCanvas";
import { ReactFlowProvider } from "reactflow";

export default function FlowView({
  data,
}: {
  data?: { nodes: any[]; edges: any[] };
}) {
  return (
    <ReactFlowProvider>
      <FlowCanvas data={data} />
    </ReactFlowProvider>
  );
}
