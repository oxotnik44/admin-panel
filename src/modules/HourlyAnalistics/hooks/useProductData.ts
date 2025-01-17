// modules/analytics/hooks/useProductData.ts
import { useMemo } from "react";
import { ProductData, UseProductDataProps } from "../types/TableDataTypes";

export const useProductData = ({
  initialData,
  productName,
  dateRange,
  isSingleDaySelected,
  filterNoSales,
  isDayAnalitics,
}: UseProductDataProps) => {
  return useMemo(() => {
    if (!dateRange[0] || !dateRange[1]) return [];
    // Фильтруем данные по выбранному товару
    const productSales = isDayAnalitics
      ? initialData
      : initialData.filter((item) => item.name === productName);

    // Если выбран один день, то показываем данные по часам
    if (isSingleDaySelected) {
      const hourlyData = Array.from({ length: 24 }, (_, hour) => {
        const hourStart = new Date(dateRange[0] as Date);
        hourStart.setHours(hour, 0, 0, 0);

        const hourEnd = new Date(dateRange[0] as Date);
        hourEnd.setHours(hour, 59, 59, 999);

        const salesInHour = productSales.filter((sale) => {
          const saleDate = new Date(sale.timestamp);
          return saleDate >= hourStart && saleDate <= hourEnd;
        });

        const totalSales = salesInHour.reduce(
          (sum, sale) => sum + sale.sold,
          0
        );
        const totalAmount = salesInHour.reduce(
          (sum, sale) => sum + sale.total,
          0
        );

        return {
          hour: `${hourStart.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}-${hourEnd.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}`,
          sales: totalSales,
          amount: totalAmount,
        };
      });

      if (filterNoSales) {
        return hourlyData.filter((item) => item.sales > 0);
      }

      return hourlyData;
    }

    // Если выбран диапазон дат, показываем данные по дням
    const dailyData: ProductData[] = [];
    let currentDate = new Date(dateRange[0]);
    while (currentDate <= dateRange[1]) {
      const salesInDay = productSales.filter((sale) => {
        const saleDate = new Date(sale.timestamp);
        return saleDate.toDateString() === currentDate.toDateString();
      });

      const totalSales = salesInDay.reduce((sum, sale) => sum + sale.sold, 0);
      const totalAmount = salesInDay.reduce((sum, sale) => sum + sale.total, 0);

      dailyData.push({
        date: currentDate.toLocaleDateString("ru-RU"),
        sales: totalSales,
        amount: totalAmount,
      });

      currentDate.setDate(currentDate.getDate() + 1); // Переходим к следующему дню
    }

    if (filterNoSales) {
      return dailyData.filter((item) => item.sales > 0);
    }

    return dailyData;
  }, [
    productName,
    dateRange,
    filterNoSales,
    isSingleDaySelected,
    isDayAnalitics,
  ]);
};
