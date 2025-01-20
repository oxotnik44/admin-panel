import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { HourlyAnalyticsModule } from "src/modules/HourlyAnalistics";
import ViewSelector from "src/modules/HourlyAnalistics/components/ViewSelector";
import { initialData } from "src/modules/SummarizedAnalytics/utils/initialData";

export const HourlyAnalisticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const isSingleDaySelected =
    startDate && endDate && startDate.getTime() === endDate.getTime();
  const [selectedView, setSelectedView] = useState("product"); // Состояние для выбора "товар" или "день"
  const [selectedProduct, setSelectedProduct] = useState<string>(""); // Для хранения выбранного товара

  // Получаем уникальные имена товаров из initialData
  const uniqueProductNames = Array.from(
    new Set(initialData.map((item) => item.name))
  );

  return (
    <div className="flex flex-col p-4 bg-gray-50">
      <div className="mb-4 flex items-center space-x-4">
        <DatePicker
          selectsRange
          startDate={startDate ?? undefined}
          endDate={endDate ?? undefined}
          onChange={setDateRange}
          isClearable
          placeholderText="Выберите диапазон"
          className="border border-gray-400 px-2 py-1 rounded bg-white text-black focus:border-blue-500 focus:ring focus:ring-blue-300 placeholder-black"
          locale="ru"
        />
      </div>
      {selectedView === "product" && (
        <div className="mb-4">
          <label className="block text-base font-medium text-gray-700 mb-2">
            {" "}
            {/* Уменьшили текст */}
            Выберите товар
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="border px-2 py-1 rounded bg-white text-black w-max"
          >
            <option value="">Выберите товар</option>
            {uniqueProductNames.map((productName, idx) => (
              <option
                key={idx}
                value={productName}
                className="truncate"
                style={{
                  maxWidth: "200px", // Задайте желаемую ширину
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {productName}
              </option>
            ))}
          </select>
        </div>
      )}

      <ViewSelector
        selectedView={selectedView}
        onChange={(value) => setSelectedView(value)}
      />

      <HourlyAnalyticsModule
        initialData={initialData}
        productName={selectedProduct}
        dateRange={dateRange}
        isSingleDaySelected={isSingleDaySelected}
        selectedView={selectedView}
      />
    </div>
  );
};
