import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { StyledCallNode } from "./StyledCallNode";

export function CallNode({ data }: { data: { text: string } }) {
  const onChange = useCallback((evt: any) => {}, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <StyledCallNode>
        <label htmlFor="text">Call:{data.text}</label>
        <input id="text" name="text1" onChange={onChange} className="nodrag" />
        <input id="text" name="text2" onChange={onChange} className="nodrag" />
      </StyledCallNode>
      <Handle
        key={""}
        type="source"
        position={Position.Bottom}
        id={`${data.text}`}
      />
    </>
  );
}
