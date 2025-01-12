import React, { useMemo, useState } from "react";
import { AnalyticsTable } from "./components/AnalyticsTable";
import { ColumnSelectionModal } from "./components/ColumnSelectionModal";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { SortingState } from "@tanstack/react-table";
import { allColumns, initialData } from "./utils/initialData";
import { Product } from "./types/productTypes";

// Регистрация русской локализации
registerLocale("ru", ru);

export const AnalyticsModule: React.FC = () => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    allColumns.map((col) => col.id!)
  );
  const [showModal, setShowModal] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [startDate, endDate] = dateRange;

  // Фильтрация и суммирование данных
  const summarizedData = useMemo(() => {
    return initialData
      .filter((product) => {
        if (startDate && endDate) {
          const productDate = new Date(product.timestamp).setHours(0, 0, 0, 0);
          const start = startDate.setHours(0, 0, 0, 0);
          const end = endDate.setHours(0, 0, 0, 0);
          return productDate >= start && productDate <= end;
        }
        return true;
      })
      .reduce((acc, product) => {
        acc[product.name] = acc[product.name]
          ? {
              ...acc[product.name],
              sold: acc[product.name].sold + product.sold,
              total: acc[product.name].total + product.total,
            }
          : { ...product };
        return acc;
      }, {} as { [key: string]: Product });
  }, [startDate, endDate]);

  // Вычисление общих значений
  const totalSummary = useMemo(() => {
    return Object.values(summarizedData).reduce(
      (acc, product) => {
        acc.totalSales += product.sold;
        acc.totalRevenue += product.total;
        return acc;
      },
      { totalSales: 0, totalRevenue: 0 }
    );
  }, [summarizedData]);

  const toggleColumnVisibility = (columnId: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId]
    );
  };

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

      {showModal && (
        <ColumnSelectionModal
          visibleColumns={visibleColumns}
          toggleColumnVisibility={toggleColumnVisibility}
          onClose={() => setShowModal(false)}
        />
      )}

      <AnalyticsTable
        data={Object.values(summarizedData)}
        columns={allColumns.filter((col) => visibleColumns.includes(col.id!))}
        sorting={sorting}
        onSortingChange={setSorting}
        dateRange={dateRange}
      />

      {/* Суммарный блок */}
      <div className="mt-4 p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Суммарные данные
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Общее количество продаж:</span>
          <span className="text-lg font-semibold text-black">
            {totalSummary.totalSales}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-600">Общая выручка:</span>
          <span className="text-lg font-semibold text-black">
            {totalSummary.totalRevenue.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
