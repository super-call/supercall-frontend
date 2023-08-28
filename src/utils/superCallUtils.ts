export function convertEdgeNodeToArray(
  edges: any[],
  nodes: Record<number, any[]>
): any[] {
  const nodeMap = new Map<number, any>();
  for (const nodeId in nodes) {
    nodes[nodeId].forEach((node) => {
      if (!nodeMap.has(node.nodeId)) {
        nodeMap.set(node.nodeId, { ...node, subNodes: [] });
      }
    });
  }
  edges.forEach((edge) => {
    const sourceNode = nodeMap.get(Number(edge.source));
    const targetNode = nodeMap.get(Number(edge.target));

    if (sourceNode && targetNode) {
      sourceNode.subNodes.push(targetNode);
    }
  });

  return Array.from(nodeMap.values()).filter((node) => {
    return edges.some(
      (edge) => edge.source === "0" && edge.target === String(node.nodeId)
    );
  });
}
