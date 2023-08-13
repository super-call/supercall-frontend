export function combineNodeUtil(nodeEdge: any, nodeData: any) {
  const edgeArray: any = [];

  nodeEdge.forEach((edge: any) => {
    const sourceId = edge.source;
    const targetId = edge.target;

    const sourceName = nodeData[sourceId];
    const targetName = nodeData[targetId];

    edgeArray.push(
      [sourceName, targetName].filter(function (element) {
        return element !== undefined;
      })
    );
  });

  return edgeArray;
}
