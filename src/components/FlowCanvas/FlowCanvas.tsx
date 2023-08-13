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
import ToolbarDock from "../Toolbar/ToolbarDock/ToolbarDock";
import { StartNode } from "../FlowNodes/StartNode/StartNode";

export default function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: `node-0`,
      type: "start",
      position: {
        x: 700,
        y: 100,
      },
      data: {
        text: "Start",
      },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(() => ({ start: StartNode }), []);

  return (
    <StyledFlowCanvas>
      <ReactFlow
        key={nodes.length}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap pannable />
        <Background variant={BackgroundVariant.Lines} gap={40} />
      </ReactFlow>
      <ToolbarDock />
    </StyledFlowCanvas>
  );
}
