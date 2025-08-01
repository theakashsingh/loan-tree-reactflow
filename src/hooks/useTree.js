import { useState, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import { convertToHierarchicalJSON, getDescendants } from "../utils/treeUtils";

export const useTreeData = () => {
  const [treeData, setTreeData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // Add root node
  const addRootNode = useCallback(nodeType => {
    const newNode = {
      id: uuidv4().slice(0, 6),
      type: nodeType,
      parentId: null,
    };
    setTreeData(prev => [...prev, newNode]);
  }, []);

  // Add child node
  const addChildNode = useCallback((parentId, childType) => {
    const newNode = {
      id: uuidv4().slice(0, 6),
      type: childType,
      parentId: parentId,
    };
    setTreeData(prev => [...prev, newNode]);
  }, []);

  // Delete node and all descendants
  const deleteNode = useCallback(
    nodeId => {
      const toDelete = [nodeId, ...getDescendants(nodeId, treeData)];
      const filteredData = treeData.filter(item => !toDelete.includes(item.id));

      setTreeData(filteredData);
      setSelectedNode(null);
    },
    [treeData]
  );

  const handleNodeClick = useCallback(node => {
    setSelectedNode(node);
  }, []);

  // Convert to hierarchical JSON
  const getHierarchicalJSON = useCallback(() => {
    return convertToHierarchicalJSON(treeData);
  }, [treeData]);

  return {
    treeData,
    selectedNode,
    setSelectedNode,
    addRootNode,
    addChildNode,
    deleteNode,
    handleNodeClick,
    getHierarchicalJSON,
  };
};
