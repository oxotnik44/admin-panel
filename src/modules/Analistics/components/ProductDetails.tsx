import React, { useMemo, useState } from "react";
import { initialData } from "../utils/initialData";

type ProductDetailsProps = {
  productName: string;
  selectedDate: Date | null;
  onBackClick: () => void;
  dateRange: [Date | null, Date | null];
  isSingleDaySelected: any;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  productName,
  onBackClick,
  dateRange,
  isSingleDaySelected,
}) => {
  const [filterNoSales, setFilterNoSales] = useState(false);

  // Фильтрация и группировка данных по часу для выбранного товара и даты
  const productData = useMemo(() => {
    if (!dateRange[0] || !dateRange[1]) return [];

    // Фильтруем данные по выбранному товару
    const productSales = initialData.filter(
      (item) => item.name === productName
    );

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
    const dailyData = [];
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
  }, [productName, dateRange, filterNoSales, isSingleDaySelected]);

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={onBackClick}
      >
        Назад
      </button>

      <h2 className="text-2xl font-semibold mb-4 text-black">
        Данные для товара: {productName}{" "}
        {dateRange[0]?.toLocaleDateString("ru-RU")} -{" "}
        {dateRange[1]?.toLocaleDateString("ru-RU")}
      </h2>

      {/* Чекбокс для фильтрации пустых дней */}
      {!isSingleDaySelected && (
        <div className="mb-4">
          <label className="flex items-center text-sm text-black">
            <input
              type="checkbox"
              checked={filterNoSales}
              onChange={() => setFilterNoSales(!filterNoSales)}
              className="mr-2"
            />
            Показать только дни с продажами
          </label>
        </div>
      )}
      {isSingleDaySelected && (
        <div className="mb-4">
          <label className="flex items-center text-sm text-black">
            <input
              type="checkbox"
              checked={filterNoSales}
              onChange={() => setFilterNoSales(!filterNoSales)}
              className="mr-2"
            />
            Показать только часы с продажами
          </label>
        </div>
      )}

      {/* Таблица по часам или дням */}
      <h3 className="text-xl font-semibold mb-4 text-black">
        Продажи {isSingleDaySelected ? "по часам" : "по дням"}
      </h3>
      <table className="table-auto w-full border-collapse border border-gray-200 mb-8">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
              {isSingleDaySelected ? "Час" : "Дата"}
            </th>
            <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
              Продажи
            </th>
            <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
              Выручка
            </th>
          </tr>
        </thead>
        <tbody>
          {productData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-200">
              <td className="border border-gray-300 p-4 text-sm text-black">
                {"date" in item ? item.date : item.hour}
              </td>
              <td className="border border-gray-300 p-4 text-sm text-black">
                {item.sales}
              </td>
              <td className="border border-gray-300 p-4 text-sm text-black">
                {item.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
