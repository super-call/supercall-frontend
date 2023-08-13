import { Handle, Position } from "reactflow";
import { StyledStartNode } from "./StyledStartNode";
import { StyledNodeBackdrop } from "../StyledNodeBackdrop";

export function StartNode({ data }: { data: { text: string } }) {
  return (
    <div style={{ position: "relative" }}>
      <StyledStartNode>
        <p>{data.text}</p>
        <Handle
          key={"start-node"}
          type="source"
          position={Position.Bottom}
          id={`start-node`}
        />
      </StyledStartNode>
      <StyledNodeBackdrop />
    </div>
  );
}
