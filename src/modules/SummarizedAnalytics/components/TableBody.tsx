// modules/analytics/components/TableBody.tsx
import { Row, Cell, flexRender } from "@tanstack/react-table";

interface TableBodyProps<TData> {
  rows: Row<TData>[];
}

export const TableBody = <TData,>({ rows }: TableBodyProps<TData>) => {
  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.id} className="hover:bg-gray-200">
          {row.getVisibleCells().map((cell: Cell<TData, any>) => (
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
  );
};
