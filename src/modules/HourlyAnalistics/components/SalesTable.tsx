import React from "react";
import ProductDetailsTable from "./ProductDetailsTable";
import { ProductData } from "../types/TableDataTypes";
import { initialData } from "src/modules/SummarizedAnalytics/utils/initialData";

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
  productName: string | null;
  selectedView: string;
}

const SalesTable: React.FC<SalesTableProps> = ({
  isSingleDaySelected,
  productData,
  openHours,
  handleHourClick,
  getProductsForHour,
  dateRange,
  productName,
  selectedView,
}) => {
  let sum = 0;

  const renderProductTable = (item: ProductData) => {
    // Обход всех продуктов
    const itemDateOrHour = "date" in item ? item.date : item.hour;

    // Получаем продукты для часа/даты
    const products = getProductsForHour(itemDateOrHour as string, dateRange);
    // Обход продуктов и вычисление суммы
    products.forEach((product) => {
      if (product.sold !== 0) {
        sum += product.price * product.sold;
      }
    });

    // Условие для проверки остатка и продаж
    if (item.residue === 0 && item.sales === 0) {
      return Math.round(sum / 24); // Возвращаем усреднённую сумму
    }

    // Если условие не выполнено, возвращаем 0 или null, в зависимости от логики
    return 0;
  };
  const a = (item: any) => {
    if (!item || !item.date) {
      console.error("Дата отсутствует в item");
      return []; // Возвращаем пустой массив, если дата отсутствует
    }
    // Разделяем строку на день, месяц и год и создаём объект Date
    const [day, month, year] = item.date.split(".");
    if (!day || !month || !year) {
      console.error("Некорректный формат даты", item.date);
      return []; // Возвращаем пустой массив в случае некорректного формата
    }

    const itemDate = new Date(`${year}-${month}-${day}T14:00:00`);

    // Фильтруем initialData по совпадению дат
    const filteredInitialData = initialData.filter((data) => {
      const dataDate = new Date(data.timestamp);
      return (
        dataDate.toISOString().slice(0, 10) ===
        itemDate.toISOString().slice(0, 10)
      );
    });
    // Формируем объект с данными для текущей даты
    return [
      {
        productDate: itemDate.toISOString().slice(0, 10), // Дата в формате YYYY-MM-DD
        items: filteredInitialData.map((data) => ({
          timestamp: new Date(data.timestamp).toLocaleTimeString("ru-RU"), // Время из initialData
          name: data.name, // Название товара
          sold: data.sold, // Количество проданного
          price: data.price, // Цена за единицу
          total: data.total, // Сумма
          productResidue: data.residue, // Остаток
        })),
      },
    ];
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
              Продажи (шт.)
            </th>
            <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
              Остаток (шт.)
            </th>
            <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
              Выручка <span className="ml-1">₽</span>
            </th>
            <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
              Упущенная выгода <span className="ml-1">₽</span>
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
                  {Number(item.amount.toFixed(2))}
                </td>
                <td className="border border-gray-300 p-4 text-sm text-black">
                  {renderProductTable(item)}
                  {/* Отображаем упущенную выгоду */}
                </td>
              </tr>

              {/* Дополнительная таблица для товара */}
              {openHours.has("date" in item ? item.date : item.hour) && (
                <tr>
                  <td colSpan={3}>
                    <ProductDetailsTable
                      products={
                        isSingleDaySelected
                          ? getProductsForHour(
                              ("date" in item
                                ? item.date
                                : item.hour) as string,
                              dateRange
                            )
                          : a(item)
                      }
                      isSingleDaySelected={isSingleDaySelected}
                      productName={productName}
                      selectedView={selectedView}
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
