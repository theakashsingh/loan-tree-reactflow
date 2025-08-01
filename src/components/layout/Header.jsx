import { Eye, Download } from "lucide-react";

const Header = ({ onViewJSON, onExport }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Loan Management Tree
          </h1>
          <p className="text-gray-600">
            Visualize hierarchical loan relationships with React Flow
          </p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={onViewJSON}
            className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            View JSON
          </button>
          <button
            onClick={onExport}
            className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
