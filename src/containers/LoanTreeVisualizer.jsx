import React, { useState } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import { Building2, CreditCard, Plus } from "lucide-react";

import "reactflow/dist/style.css";
import CustomNode from "../components/common/CustomNode";
import SidePanel from "../components/panels/SidePanel";
import JSONModal from "../components/modals/JSONModal";
import { NODE_TYPES } from "../constant.js/nodeTypes";
import { useTreeData } from "../hooks/useTree";
import { useReactFlow } from "../hooks/useReactFlow";
import Header from "../components/layout/Header";

// Define custom node types for ReactFlow
const nodeTypes = {
  customNode: CustomNode,
};

// Main App Component
const LoanTreeVisualizer = () => {
  const [showJSON, setShowJSON] = useState(false);

  const {
    treeData,
    selectedNode,
    setSelectedNode,
    addRootNode,
    addChildNode,
    deleteNode,
    handleNodeClick,
    getHierarchicalJSON,
  } = useTreeData();

  const { nodes, edges, onNodesChange, onEdgesChange } = useReactFlow(
    treeData,
    handleNodeClick
  );

  const handleExportJSON = () => {
    handleExportJSON(treeData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          onViewJSON={() => setShowJSON(true)}
          onExport={handleExportJSON}
        />

        {/* ReactFlow Container */}
        <div className="flex-1 relative">
          {treeData.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No nodes yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start by adding an Account or Loan node
                </p>
                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={() => addRootNode(NODE_TYPES.ACCOUNT)}
                    className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-md"
                  >
                    <Building2 className="w-5 h-5 mr-2" />
                    Add Account
                  </button>
                  <button
                    onClick={() => addRootNode(NODE_TYPES.LOAN)}
                    className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-md"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Add Loan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                attributionPosition="bottom-left"
                minZoom={0.3}
                maxZoom={2}
                defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
                proOptions={{ hideAttribution: true }}
                elementsSelectable={true}
                nodesConnectable={false}
                nodesDraggable={false}
              >
                <Background color="#f1f5f9" />
                <Controls
                  showInteractive={false}
                  className="bg-white border border-gray-300 rounded-lg shadow-lg"
                />
              </ReactFlow>

              {/* Floating Add Buttons */}
              <div className="absolute top-4 left-4 flex space-x-2 z-20">
                <button
                  onClick={() => addRootNode(NODE_TYPES.ACCOUNT)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Account
                </button>
                <button
                  onClick={() => addRootNode(NODE_TYPES.LOAN)}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Loan
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Side Panel */}
      {selectedNode && (
        <SidePanel
          node={selectedNode}
          treeData={treeData}
          onAddChild={addChildNode}
          onDeleteNode={deleteNode}
          onClose={() => setSelectedNode(null)}
        />
      )}

      {/* JSON Modal */}
      <JSONModal
        isOpen={showJSON}
        onClose={() => setShowJSON(false)}
        data={getHierarchicalJSON()}
      />
    </div>
  );
};

export default LoanTreeVisualizer;
