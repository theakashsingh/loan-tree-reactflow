import * as dagre from "dagre";
import { Position } from "reactflow";
import { LAYOUT_CONFIG } from "../constant.js/layout";

// Dagre layout configuration
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (
  nodes,
  edges,
  direction = LAYOUT_CONFIG.DEFAULT_DIRECTION
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({
    rankdir: direction,
    ranksep: LAYOUT_CONFIG.RANK_SEP,
    nodesep: LAYOUT_CONFIG.NODE_SEP,
  });

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, {
      width: LAYOUT_CONFIG.NODE_WIDTH,
      height: LAYOUT_CONFIG.NODE_HEIGHT,
    });
  });

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
    node.position = {
      x: nodeWithPosition.x - LAYOUT_CONFIG.NODE_WIDTH / 2,
      y: nodeWithPosition.y - LAYOUT_CONFIG.NODE_HEIGHT / 2,
    };
    return node;
  });

  return { nodes, edges };
};
