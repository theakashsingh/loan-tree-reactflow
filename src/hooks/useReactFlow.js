import { useCallback, useEffect } from "react";
import { useNodesState, useEdgesState } from "reactflow";
import { getLayoutedElements } from "../utils/layoutUtils";
import { countChildren } from "../utils/treeUtils";

export const useReactFlow = (treeData, handleNodeClick) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Convert tree data to ReactFlow format
  const convertToReactFlowData = useCallback(
    data => {
      const flowNodes = [];
      const flowEdges = [];

      data.forEach(item => {
        const childCount = countChildren(item.id, data);

        flowNodes.push({
          id: item.id,
          type: "customNode",
          data: {
            type: item.type,
            id: item.id,
            childCount,
            onNodeClick: handleNodeClick,
          },
          position: { x: 0, y: 0 },
        });

        if (item.parentId) {
          flowEdges.push({
            id: `${item.parentId}->${item.id}`,
            source: item.parentId,
            target: item.id,
            type: "default",
            style: {
              stroke: "#2563EB",
              strokeWidth: 4,
            },
            markerEnd: {
              type: "arrowclosed",
              color: "#2563EB",
              width: 25,
              height: 25,
            },
            labelStyle: { fill: "#2563EB", fontWeight: 600 },
          });
        }
      });

      return { nodes: flowNodes, edges: flowEdges };
    },
    [handleNodeClick]
  );

  // Update ReactFlow when tree data changes
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } =
      convertToReactFlowData(treeData);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      newEdges
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [treeData, convertToReactFlowData, setNodes, setEdges]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
  };
};
