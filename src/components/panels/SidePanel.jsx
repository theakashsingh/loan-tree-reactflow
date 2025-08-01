import { Plus, Trash2, X } from "lucide-react";
import {
  NODE_COLORS,
  NODE_ICONS,
  NODE_TYPES,
} from "../../constant.js/nodeTypes";
import { getAllowedChildren, countChildren } from "../../utils/treeUtils";

const SidePanel = ({ node, treeData, onAddChild, onDeleteNode, onClose }) => {
  if (!node) return null;

  const allowedChildren = getAllowedChildren(node.type);
  const Icon = NODE_ICONS[node.type];
  const childCount = countChildren(node.id, treeData);

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Node Details</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Node Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <div
              className={`w-10 h-10 rounded-full ${
                NODE_COLORS[node.type]
              } flex items-center justify-center mr-3`}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">{node.type}</div>
              <div className="text-sm text-gray-500 font-mono">{node.id}</div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {node.type === NODE_TYPES.ACCOUNT &&
              "Represents a customer's account"}
            {node.type === NODE_TYPES.LOAN && "A loan issued to an account"}
            {node.type === NODE_TYPES.COLLATERAL &&
              "Asset pledged against a loan"}
          </div>

          <div className="mt-3 text-sm text-gray-600">
            <strong>Children:</strong> {childCount}
          </div>
        </div>

        {/* Add Children */}
        {allowedChildren.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Add Child Node</h3>
            <div className="space-y-2">
              {allowedChildren.map(childType => {
                const ChildIcon = NODE_ICONS[childType];
                return (
                  <button
                    key={childType}
                    onClick={() => onAddChild(node.id, childType)}
                    className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${NODE_COLORS[childType]} flex items-center justify-center mr-3`}
                    >
                      <ChildIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">
                      Add {childType}
                    </span>
                    <Plus className="w-4 h-4 text-gray-400 ml-auto" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Delete Node */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Actions</h3>
          <button
            onClick={() => onDeleteNode(node.id)}
            className="w-full flex items-center justify-center p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all text-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Node
          </button>
          <p className="text-xs text-gray-500 mt-2">
            This will delete the node and all its descendants
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
