import React, { useCallback, useMemo } from "react";
import "reactflow/dist/style.css";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from "reactflow";
import { StyledFlowCanvas } from "./StyledFlowCanvas";
import Toolbar from "../Toolbar/Toolbar";

export default function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  return (
    <StyledFlowCanvas>
      <ReactFlow
        key={nodes.length}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap pannable />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
      <Toolbar />
    </StyledFlowCanvas>
  );
}
