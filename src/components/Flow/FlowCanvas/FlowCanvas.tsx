import React, { useCallback, useMemo, useRef } from "react";
import "reactflow/dist/style.css";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import { StyledFlowCanvas } from "./StyledFlowCanvas";
import ToolbarDock from "../../Toolbar/ToolbarDock/ToolbarDock";
import { StartNode } from "../StartNode/StartNode";
import { CallNode } from "../CallNode/CallNode";

let id = 1;
const getId = () => `${id++}`;

export default function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: `0`,
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

  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);

  const { project } = useReactFlow();

  const onConnectStart = useCallback((_: any, { nodeId }: any) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event: any) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const { top, left } = (
          reactFlowWrapper.current as any
        ).getBoundingClientRect();
        const id = getId();

        setNodes((nds) =>
          nds.concat({
            id,
            type: "call",
            position: project({
              x: event.clientX - left - 75,
              y: event.clientY - top,
            }),
            data: {
              text: "Call",
            },
          })
        );

        setEdges((eds) =>
          eds.concat({
            id,
            source: connectingNodeId.current,
            target: id,
          } as any)
        );
      }
    },
    [project, setEdges, setNodes]
  );

  const nodeTypes = useMemo(() => ({ start: StartNode, call: CallNode }), []);

  return (
    <StyledFlowCanvas ref={reactFlowWrapper}>
      <ReactFlow
        key={nodes.length}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
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
