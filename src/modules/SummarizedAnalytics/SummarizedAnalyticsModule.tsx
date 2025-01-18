import React, { useState } from "react";
import { AnalyticsTable } from "./components/AnalyticsTable";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { SummarizedData } from "./components/SummarizedData";
import { useSummarizedData } from "./hooks/useSummarizedData";
import { SortingState } from "@tanstack/react-table";
import { allColumns } from "./utils/initialData";

registerLocale("ru", ru);

export const SummarizedAnalyticsModule: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const {
    dateRange,
    setDateRange,
    summarizedData,
    totalSummary,
    startDate,
    endDate,
  } = useSummarizedData();

  return (
    <div className="w-full h-full p-4 bg-gray-50">
      <div className="mb-4 flex items-center space-x-4">
        <DatePicker
          selectsRange
          startDate={startDate ?? undefined}
          endDate={endDate ?? undefined}
          onChange={setDateRange}
          isClearable
          placeholderText="Выберите диапазон"
          className="border px-2 py-1 rounded"
          locale="ru"
        />
      </div>

      <AnalyticsTable
        data={Object.values(summarizedData)}
        columns={allColumns} // Передаем колонки
        sorting={sorting}
        onSortingChange={setSorting}
        dateRange={dateRange}
      />

      <SummarizedData
        totalSales={totalSummary.totalSales}
        totalRevenue={totalSummary.totalRevenue}
        isHourlySummarized={false}
      />
    </div>
  );
};
