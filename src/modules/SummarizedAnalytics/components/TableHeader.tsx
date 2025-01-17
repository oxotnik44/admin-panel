// modules/analytics/components/TableHeader.tsx
import React from "react";
import { HeaderGroup, flexRender } from "@tanstack/react-table";

interface TableHeaderProps<TData> {
  headerGroups: HeaderGroup<TData>[];
  onSortChange: (columnId: string) => void;
}

export const TableHeader = <TData,>({
  headerGroups,
  onSortChange,
}: TableHeaderProps<TData>) => {
  return (
    <thead className="bg-gray-100 text-black">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="border border-gray-300 p-4 text-left text-sm font-medium text-black cursor-pointer"
              onClick={() => onSortChange(header.id)}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getIsSorted() &&
                (header.column.getIsSorted() === "asc" ? " 🔼" : " 🔽")}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
