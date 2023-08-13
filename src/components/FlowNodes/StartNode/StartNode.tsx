import { Handle, Position } from "reactflow";
import { StyledStartNode } from "./StyledStartNode";

export function StartNode({ data }: { data: { text: string } }) {
  return (
    <>
      <StyledStartNode>
        <p>{data.text}</p>
        <Handle
          key={"start-node"}
          type="source"
          position={Position.Bottom}
          id={`start-node`}
        />
      </StyledStartNode>
    </>
  );
}
