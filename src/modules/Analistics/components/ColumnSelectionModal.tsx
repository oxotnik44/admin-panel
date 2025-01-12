// src/modules/Analytics/components/ColumnSelectionModal.tsx

import React from "react";

type ColumnSelectionModalProps = {
  visibleColumns: string[];
  toggleColumnVisibility: (columnId: string) => void;
  onClose: () => void;
};

export const ColumnSelectionModal: React.FC<ColumnSelectionModalProps> = ({
  visibleColumns,
  toggleColumnVisibility,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Выберите столбцы</h3>
        <div className="space-y-2">
          {["name", "sold", "price", "total", "timestamp"].map((colId) => (
            <div key={colId} className="flex items-center">
              <input
                type="checkbox"
                id={colId}
                checked={visibleColumns.includes(colId)}
                onChange={() => toggleColumnVisibility(colId)}
                className="mr-2"
              />
              <label htmlFor={colId} className="text-sm text-black">
                {colId}
              </label>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Закрыть
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};
