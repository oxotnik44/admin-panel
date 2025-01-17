import React from "react";
import { TableHeader } from "./TableHeader"; // Импортируем компонент для заголовков
import { TableBody } from "./TableBody"; // Импортируем компонент для данных
import { useAnalyticsTable } from "../hooks/useAnalyticsTable";
import { ColumnDef, SortingState } from "@tanstack/react-table";

type AnalyticsTableProps = {
  data: any[];
  columns: ColumnDef<any, any>[];
  sorting: SortingState;
  onSortingChange: (
    sorting: SortingState | ((prevSorting: SortingState) => SortingState)
  ) => void;
  dateRange: [Date | null, Date | null];
};

export const AnalyticsTable: React.FC<AnalyticsTableProps> = ({
  data,
  columns,
  sorting,
  onSortingChange,
}) => {
  const table = useAnalyticsTable(data, columns, sorting, onSortingChange); // Используем хук

  // Функция для обработки сортировки
  const handleSortChange = (columnId: string) => {
    const isAscending = sorting.find(
      (sort) => sort.id === columnId && sort.desc === false
    );
    const newSorting = [
      {
        id: columnId,
        desc: !isAscending,
      },
    ];
    onSortingChange(newSorting); // Обновляем состояние сортировки
  };

  return (
    <div>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <TableHeader
          headerGroups={table.getHeaderGroups()}
          onSortChange={handleSortChange} // Передаем функцию сортировки
        />
        <TableBody rows={table.getRowModel().rows} />
      </table>
    </div>
  );
};
