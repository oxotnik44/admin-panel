import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductData } from "./hooks/useProductData";
import { getProductsForHour } from "./hooks/useProductsForDay";
import CheckboxFilter from "./components/CheckboxFilter";
import DateRange from "./ui/DateRange";
import ButtonBack from "./ui/ButtonBack";
import SalesTable from "./components/SalesTable";
import ViewSelector from "./components/ViewSelector";
import { SummarizedData } from "../SummarizedAnalytics/components/SummarizedData";
import { ProductData } from "./types/TableDataTypes";
import { initialData } from "../SummarizedAnalytics/utils/initialData";
import { Product } from "../SummarizedAnalytics/types/productTypes";

type HourlyAnalyticsModuleProps = {
  initialData: {
    name: string;
    timestamp: string;
    sold: number;
    price: number;
    total: number;
  }[];
  productName: string;
  dateRange: [Date | null, Date | null];
  isSingleDaySelected: boolean | null;
};

export const HourlyAnalyticsModule: React.FC<HourlyAnalyticsModuleProps> = ({
  initialData,
  productName,
  dateRange,
  isSingleDaySelected,
}) => {
  const navigate = useNavigate();
  const onBackClick = () => {
    navigate("/summarizedAnalytics"); // Возвращает на предыдущую страницу в истории
  };

  const [filterNoSales, setFilterNoSales] = useState(false);
  const [openHours, setOpenHours] = useState<Set<string | undefined>>(
    new Set()
  ); // Используем Set для хранения открытых часов или дат
  const [selectedView, setSelectedView] = useState("product"); // Состояние для выбора "товар" или "день"
  const isDayAnalitics = selectedView === "day";

  let productData = useProductData({
    initialData,
    productName,
    dateRange,
    isSingleDaySelected,
    filterNoSales,
    isDayAnalitics,
  });

  // Функция для вычисления общей суммы продаж
  const totalSales = calculateAverageSales(productData);

  // Функция для обработки клика по часу или дате
  const handleHourClick = (hour: string | undefined) => {
    setOpenHours((prevOpenHours) => {
      const newOpenHours = new Set(prevOpenHours);
      if (newOpenHours.has(hour)) {
        newOpenHours.delete(hour); // Если элемент уже открыт, закрываем его
      } else {
        newOpenHours.add(hour); // Если элемент закрыт, открываем его
      }

      return newOpenHours;
    });
  };
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
  const calculateTotalLostRevenue = (
    productData: Product[],
    start: Date | null,
    end: Date | null
  ): number => {
    // Инициализация переменной для хранения общей суммы
    let totalRevenue = 0;

    // Если start или end равны null, то вернем 0 или можно выбросить ошибку в зависимости от вашего подхода
    if (!start || !end) {
      throw new Error("Invalid date range, start or end is null");
    }

    // Преобразуем start и end в формат UTC, чтобы избежать проблем с часовыми поясами
    const startUTC = new Date(start.toISOString());
    const endUTC = new Date(end.toISOString());

    // Перебор всех элементов данных
    productData.forEach((item) => {
      const itemDate = new Date(item.timestamp); // Преобразуем timestamp в объект Date
      // Преобразуем itemDate в формат UTC для корректного сравнения
      const itemDateUTC = new Date(itemDate.toISOString());

      // Проверяем, попадает ли текущий элемент в заданный промежуток времени
      if (itemDateUTC >= startUTC && itemDateUTC <= endUTC) {
        // Суммируем цену каждого элемента в пределах интервала

        totalRevenue += item.price;
      }
    });

    // Делим на 24, чтобы распределить выручку по часам
    return totalRevenue / 24;
  };

  const [start, end] = dateRange;

  // Если start или end равны null, заменяем их на текущую дату
  const validStart = start ?? new Date();
  const validEnd = end ?? new Date();

  // Если даты не совпадают, можно просто использовать диапазон дат
  const totalLostRevenue = calculateTotalLostRevenue(
    initialData,
    validStart,
    validEnd
  );

  const totalRevenue = calculateTotalRevenue(productData);
  return (
    <div>
      <ButtonBack onClick={onBackClick} />
      <DateRange dateRange={dateRange} productName={productName} />
      <ViewSelector
        selectedView={selectedView}
        onChange={(value) => setSelectedView(value)}
      />

      {/* Фильтрация по дням/часам */}
      <CheckboxFilter
        isSingleDaySelected={isSingleDaySelected}
        filterNoSales={filterNoSales}
        setFilterNoSales={setFilterNoSales}
      />

      {/* Отображение таблицы в зависимости от выбранного типа */}
      <SalesTable
        isSingleDaySelected={isSingleDaySelected}
        productData={productData}
        openHours={openHours}
        handleHourClick={handleHourClick}
        getProductsForHour={getProductsForHour}
        dateRange={dateRange}
      />
      <SummarizedData
        totalSales={totalSales}
        totalRevenue={totalRevenue}
        isHourlySummarized={true}
        totalLostRevenue={totalLostRevenue}
      />
    </div>
  );
};

// Функция для подсчета суммы всех продаж
const calculateAverageSales = (productData: ProductData[]): number => {
  // Если массив пуст, возвращаем 0, чтобы избежать деления на ноль

  // Суммируем все продажи
  const totalSales = productData.reduce((total, item) => total + item.sales, 0);

  // Вычисляем среднее количество продаж и округляем до целого числа
  return totalSales; // Округление до ближайшего целого числа
};

const calculateTotalRevenue = (productData: ProductData[]): number => {
  return productData.reduce((total, item) => total + item.amount, 0);
};

export default HourlyAnalyticsModule;
