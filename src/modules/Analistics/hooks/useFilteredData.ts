import { useState, useMemo } from "react";
import { initialData } from "../utils/initialData";

export const useFilteredData = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const filteredData = useMemo(() => {
    const [startDate, endDate] = dateRange;
    return initialData.filter((product) => {
      if (startDate && endDate) {
        const productDate = new Date(product.timestamp).setHours(0, 0, 0, 0);
        const start = startDate.setHours(0, 0, 0, 0);
        const end = endDate.setHours(0, 0, 0, 0);
        return productDate >= start && productDate <= end;
      }
      return true;
    });
  }, [dateRange]);

  return { filteredData, setDateRange, dateRange };
};
