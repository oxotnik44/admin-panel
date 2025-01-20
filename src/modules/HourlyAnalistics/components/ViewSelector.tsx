import React from "react";

type ViewSelectorProps = {
  selectedView: string;
  onChange: (value: string) => void;
};

const ViewSelector: React.FC<ViewSelectorProps> = ({
  selectedView,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="mr-2 text-base text-black">Выберите отображение:</label>
      <select
        value={selectedView}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white text-black p-2 border border-gray-400 rounded"
      >
        <option value="product">Товар</option>
        <option value="day">День</option>
      </select>
    </div>
  );
};

export default ViewSelector;
