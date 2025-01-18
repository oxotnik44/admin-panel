import { useMemo } from "react";
import { ProductData, UseProductDataProps } from "../types/TableDataTypes";

// Функция для фильтрации продаж по выбранной дате
const getSalesForDate = (sales: any[], date: Date) =>
  sales.filter(
    (sale) => new Date(sale.timestamp).toDateString() === date.toDateString()
  );

// Функция для подсчета общего количества проданных товаров
const calculateTotalSales = (sales: any[]) =>
  sales.reduce((sum, sale) => sum + sale.sold, 0);

// Функция для подсчета общей суммы выручки
const calculateTotalAmount = (sales: any[]) =>
  sales.reduce((sum, sale) => sum + sale.total, 0);

export const useProductData = ({
  initialData,
  productName,
  dateRange,
  isSingleDaySelected,
  filterNoSales,
  isDayAnalitics,
}: UseProductDataProps) => {
  return useMemo(() => {
    // Проверка наличия диапазона дат, если его нет - возвращаем пустой массив
    if (!dateRange[0] || !dateRange[1]) return [];

    // Фильтруем данные по выбранному товару, если это необходимо
    const productSales = isDayAnalitics
      ? initialData
      : initialData.filter((item) => item.name === productName);

    // Сортируем продажи по времени для выбранного дня (например, 25 декабря)
    const sortedSales = productSales
      .filter((sale) => sale.timestamp.includes("2024-12-25"))
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

    // Инициализируем остаток товара на основе первой продажи
    let remainingStock = sortedSales.length
      ? isDayAnalitics
        ? calculateTotalSales(
            getSalesForDate(productSales, new Date(dateRange[0]))
          ) // Остаток для выбранного дня
        : sortedSales[0].residue || 0 // Остаток для первого проданного товара
      : 0;

    // Если выбран один день, показываем данные по часам
    if (isSingleDaySelected) {
      const hourlyData = Array.from({ length: 24 }, (_, hour) => {
        const hourStart = new Date(dateRange[0]);
        hourStart.setHours(hour, 0, 0, 0);

        const hourEnd = new Date(dateRange[0]);
        hourEnd.setHours(hour, 59, 59, 999);

        // Фильтруем продажи, которые происходят в этот час
        const salesInHour = productSales.filter(
          (sale) =>
            new Date(sale.timestamp) >= hourStart &&
            new Date(sale.timestamp) <= hourEnd
        );

        // Считаем общее количество продаж и сумму для этого часа
        const totalSales = calculateTotalSales(salesInHour);
        const totalAmount = calculateTotalAmount(salesInHour);

        // Уменьшаем остаток по количеству проданных товаров
        remainingStock -= totalSales;

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
          residue: remainingStock,
        };
      });

      // Если filterNoSales активен, фильтруем данные, показывая только те часы, где были продажи
      return filterNoSales
        ? hourlyData.filter((item) => item.sales > 0)
        : hourlyData;
    }

    // Если isDayAnalitics не активен, обрабатываем данные по всем дням
    const dailyData: ProductData[] = [];
    let currentDate = new Date(dateRange[0]);

    while (currentDate <= dateRange[1]) {
      // Фильтруем продажи для текущего дня
      const salesInDay = getSalesForDate(productSales, currentDate);

      // Для всех товаров за этот день собираем данные
      let totalSales = 0;
      let totalAmount = 0;
      let dayStock = 0;

      salesInDay.forEach((sale) => {
        const initialResidue = sale.residue || 0;

        const dailySales = calculateTotalSales([sale]);
        const dailyAmount = calculateTotalAmount([sale]);

        totalSales += dailySales;
        totalAmount += dailyAmount;
        dayStock += initialResidue - dailySales;
      });

      dailyData.push({
        date: currentDate.toLocaleDateString("ru-RU"),
        sales: totalSales,
        amount: totalAmount,
        residue: dayStock,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Если filterNoSales активен, фильтруем данные, показывая только те дни, где были продажи
    return filterNoSales
      ? dailyData.filter((item) => item.sales > 0)
      : dailyData;
  }, [
    productName,
    dateRange,
    filterNoSales,
    isSingleDaySelected,
    isDayAnalitics,
    initialData,
  ]);
};
