import { useMemo, useState } from "react";
import { Product } from "../types/productTypes";
import { initialData } from "../utils/initialData";

export const useSummarizedData = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

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

  return {
    dateRange,
    setDateRange,
    summarizedData,
    totalSummary,
    startDate,
    endDate,
  };
};
