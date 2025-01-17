import React from "react";
import ProductDetailsTable from "./ProductDetailsTable";

interface SalesTableProps {
  isSingleDaySelected: boolean | null;
  productData: any[];
  openHours: Set<string|undefined>;
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
}) => (
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
            Выручка
          </th>
        </tr>
      </thead>
      <tbody>
        {productData.map((item, index) => (
          <React.Fragment key={index}>
            <tr
              className="hover:bg-gray-200 cursor-pointer"
              onClick={() =>
                handleHourClick("date" in item ? item.date : item.hour)
              }
            >
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

            {/* Дополнительная таблица для товара */}
            {openHours.has("date" in item ? item.date : item.hour) && (
              <tr>
                <td colSpan={3}>
                  <ProductDetailsTable
                    products={getProductsForHour(
                      "date" in item ? item.date : item.hour,
                      dateRange
                    )}
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

export default SalesTable;
