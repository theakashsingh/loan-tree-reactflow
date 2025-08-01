import { NODE_TYPES } from "../constant.js/nodeTypes";

// Get allowed children for each node type
export const getAllowedChildren = nodeType => {
  switch (nodeType) {
    case NODE_TYPES.ACCOUNT:
      return [NODE_TYPES.LOAN, NODE_TYPES.COLLATERAL];
    case NODE_TYPES.LOAN:
      return [NODE_TYPES.COLLATERAL];
    case NODE_TYPES.COLLATERAL:
      return [];
    default:
      return [];
  }
};

// Get descendants of a node
export const getDescendants = (nodeId, data) => {
  const descendants = [];
  const children = data.filter(item => item.parentId === nodeId);

  children.forEach(child => {
    descendants.push(child.id);
    descendants.push(...getDescendants(child.id, data));
  });

  return descendants;
};

// Count children for a node
export const countChildren = (nodeId, data) => {
  return data.filter(item => item.parentId === nodeId).length;
};

// Convert flat tree data to hierarchical structure
export const convertToHierarchicalJSON = data => {
  const buildTree = (parentId = null) => {
    return data
      .filter(item => item.parentId === parentId)
      .map(item => ({
        id: item.id,
        type: item.type,
        children: buildTree(item.id),
      }));
  };

  return buildTree();
};
