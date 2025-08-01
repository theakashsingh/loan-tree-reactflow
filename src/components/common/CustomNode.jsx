import { NODE_COLORS, NODE_ICONS } from "../../constant.js/nodeTypes";

const CustomNode = ({ data, selected }) => {
  const { type, id, childCount, onNodeClick } = data;
  const Icon = NODE_ICONS[type];

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 cursor-pointer transition-all duration-200 min-w-[180px] ${
        selected
          ? "border-blue-400 shadow-lg bg-white transform scale-105"
          : "border-gray-300 shadow-md bg-white hover:shadow-lg hover:border-gray-400"
      }`}
      onClick={() => onNodeClick({ id, type })}
    >
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full ${NODE_COLORS[type]} flex items-center justify-center mr-3 flex-shrink-0`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-800 text-sm">{type}</div>
          <div className="text-xs text-gray-500 font-mono truncate">{id}</div>
        </div>

        {childCount > 0 && (
          <div className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600 ml-2 flex-shrink-0">
            {childCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomNode;
