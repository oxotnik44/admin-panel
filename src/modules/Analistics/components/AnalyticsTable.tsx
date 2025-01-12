import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import ProductDetails from "./ProductDetails";

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
  dateRange,
}) => {
  const [startDate, endDate] = dateRange;
  const isSingleDaySelected =
    startDate && endDate && startDate.getTime() === endDate.getTime();
  const [showTable, setShowTable] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updaterOrValue) => {
      if (typeof updaterOrValue === "function") {
        onSortingChange(updaterOrValue(sorting));
      } else {
        onSortingChange(updaterOrValue);
      }
    },
  });

  const handleDateClick = (rowData: any) => {
    setSelectedProduct(rowData);
    setShowTable(false);
  };

  return (
    <div>
      {showTable ? (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100 text-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 p-4 text-left text-sm font-medium text-black cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() &&
                      (header.column.getIsSorted() === "asc" ? " 🔼" : " 🔽")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-200"
                onClick={() => handleDateClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 p-4 text-sm text-black"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ProductDetails
          productName={selectedProduct?.name}
          selectedDate={dateRange[0]} // передаем начало диапазона
          onBackClick={() => setShowTable(true)}
          dateRange={dateRange} // передаем весь диапазон
          isSingleDaySelected={isSingleDaySelected}
        />
      )}
    </div>
  );
};
