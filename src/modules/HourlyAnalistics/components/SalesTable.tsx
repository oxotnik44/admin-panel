import React from "react";
import ProductDetailsTable from "./ProductDetailsTable";
import { ProductData } from "../types/TableDataTypes";

interface SalesTableProps {
  isSingleDaySelected: boolean | null;
  productData: ProductData[];
  openHours: Set<string | undefined>;
  handleHourClick: (hourOrDate: string) => void;
  getProductsForHour: (
    hour: string,
    dateRange: [Date | null, Date | null]
  ) => any[];
  dateRange: [Date | null, Date | null];
}

const SalesTable: React.FC<SalesTableProps> = ({
  isSingleDaySelected,
  productData,
  openHours,
  handleHourClick,
  getProductsForHour,
  dateRange,
}) => {
  // Функция для расчета упущенной выгоды
  const calculateLostRevenue = (
    item: ProductData,
    productData: ProductData[]
  ): number => {
    // Если и продажи, и остаток равны 0, то выводим среднюю выручку
    if (item.sales === 0 && item.residue === 0) {
      const totalSales = productData.reduce(
        (total, item) => total + item.sales,
        0
      );
      const averageRevenue = Math.round(totalSales / productData.length); // Средняя выручка
      return averageRevenue; // Возвращаем среднюю выручку
    }

    // Если остаток больше нуля, то упущенная выгода = остаток * цена товара
    if (item.residue === 0 && item.sales === 0) {
      const totalSales = productData.reduce(
        (total, item) => total + item.sales,
        0
      );
      return totalSales;
    }

    // В остальных случаях возвращаем 0
    return null;
  };

  return (
    <div>
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
              Остаток
            </th>
            <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
              Выручка
            </th>
            <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
              Упущенная выгода
            </th>
          </tr>
        </thead>
        <tbody>
          {productData.map((item, index) => (
            <React.Fragment key={index}>
              <tr
                className="hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  const hourOrDate = "date" in item ? item.date : item.hour;

                  if (hourOrDate) {
                    handleHourClick(hourOrDate); // Передаем только корректные значения
                  } else {
                    console.error("Invalid hour: undefined");
                  }
                }}
              >
                <td className="border border-gray-300 p-4 text-sm text-black">
                  {"date" in item ? item.date : item.hour}
                </td>
                <td className="border border-gray-300 p-4 text-sm text-black">
                  {item.sales}
                </td>
                <td className="border border-gray-300 p-4 text-sm text-black">
                  {item.residue}
                </td>
                <td className="border border-gray-300 p-4 text-sm text-black">
                  {item.amount}
                </td>
                <td className="border border-gray-300 p-4 text-sm text-black">
                  {calculateLostRevenue(item, productData)}
                  {/* Отображаем упущенную выгоду */}
                </td>
              </tr>

              {/* Дополнительная таблица для товара */}
              {openHours.has("date" in item ? item.date : item.hour) && (
                <tr>
                  <td colSpan={3}>
                    <ProductDetailsTable
                      products={getProductsForHour(
                        ("date" in item ? item.date : item.hour) as string,
                        dateRange
                      )}
                      isSingleDaySelected={isSingleDaySelected}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
