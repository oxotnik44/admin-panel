import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { SortingState, ColumnDef } from "@tanstack/react-table";

export const useAnalyticsTable = (
  data: any[],
  columns: ColumnDef<any, any>[],
  sorting: SortingState,
  onSortingChange: (
    sorting: SortingState | ((prevSorting: SortingState) => SortingState)
  ) => void
) => {
  return useReactTable({
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
};
